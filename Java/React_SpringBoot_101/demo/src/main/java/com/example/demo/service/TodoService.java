package com.example.demo.service;

import com.example.demo.model.TodoEntity;
import com.example.demo.persistence.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todo")
@Service
@Slf4j
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository repository;
    public String testService() {
        // TodoEntity 생성
        TodoEntity entity = TodoEntity
                .builder()
                .title("My first todo Item")
                .build();
        // TodoEntity 저장
        repository.save(entity);
        // TodoEntity 조회
        TodoEntity savedEntity = repository.findById(entity.getId()).get();
        return savedEntity.getTitle();
    }

    public List<TodoEntity> create(final TodoEntity entity) {
        // Validations
        validate(entity);

        repository.save(entity);

        log.info("TodoEntity created: {}", entity.getId());

        return repository.findByUserId(entity.getUserId());
    }

    private void validate(final TodoEntity entity) {
        if (entity == null) {
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null");
        }

        if (entity.getUserId() == null) {
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }

    public List<TodoEntity> retrieve(final String userId) {
        log.debug("Retrieving all todos for user: {}", userId);
        return repository.findByUserId(userId);
    }

    public List<TodoEntity> update(final TodoEntity entity) {

        // 1. 저장할 엔티티가 유효한지 확인한다.
        validate(entity);

        // 2. 넘겨받은 엔티티 id를 통해 TodoEntity 를 조회한다.
        // 존재하지 않는 엔티티는 업데이트 할 수 없다.
        final Optional<TodoEntity> original = repository.findById(entity.getId());

        original.ifPresent(todo -> {
            // 3. 반환된 TodoEntity가 존재하면 값을 새 entity 값으로 덮어 씌운다.
            todo.setTitle(entity.getTitle());
            todo.setDone(entity.isDone());
            log.info("TodoEntity updated: {}", todo.getId());
            // 4. DB에 새 값을 저장한다.
            repository.save(todo);
        });

        // Retrieve Todo에서 만든 메서드를 이용해 유저의 모든 Todo 리스트를 반환한다.
        return retrieve(entity.getUserId());
    }

    public List<TodoEntity> delete(final TodoEntity entity) {
        // 1. 저장할 엔티티가 유효한지 확인한다.
        validate(entity);
        try {
            // 2. 엔티티를 삭제한다.
            repository.delete(entity);
        }catch (Exception e) {
            // 3. exception이 발생하면 로그를 남기고 예외를 던진다.
            log.warn("Failed to delete entity: {}", entity.getId());
            // 4. 컨트롤러로 exception을 날린다.
            // 데이터베이스 내부 로직을 캡슐화하기 위해
            // e를 리턴하지 않고 새 exception을 던진다.
            throw new RuntimeException("Failed to delete entity" + entity.getId());
        }

        // 5. 새 Todo 리스트를 가져와 리턴한다.
        return retrieve(entity.getUserId());
    }
}
