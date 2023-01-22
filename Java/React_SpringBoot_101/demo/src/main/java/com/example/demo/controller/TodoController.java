package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.TodoDTO;
import com.example.demo.model.TodoEntity;
import com.example.demo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor

public class TodoController {

    // final 한 번 초기화되면 변경 불가
    private final TodoService service;

    @GetMapping("/test")
    public ResponseEntity<?> testTodo() {
        String str = service.testService();
        List<String> list = new ArrayList<>();
        list.add(str);
        ResponseDTO<String> response = ResponseDTO.<String>builder()
                .data(list)
                .build();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody TodoDTO dto) {
        try {
            String temporaryUserId = "temporary-user";

            // 1. TodoEntity로 변환
            TodoEntity entity = TodoDTO.toEntity(dto);

            // 2. id를 null로 초기화
            // 생성 당시에는 id가 없어야 함
            entity.setId(null);

            System.out.println(entity);



            // 3. 임시 유저 아이디를 설정함
            // 4장의 인증과 인가에서 이를 수정할 예정
            // 인가 기능이 없으므로 한 유저만 로그인 없이 사용할 수 있도록 함
            entity.setUserId(temporaryUserId);

            // 4. 서비스를 이용해 Todo 엔티티를 생성
            List<TodoEntity> entities = service.create(entity);

            // 5. 자바 스트림을 이용해 리턴된 엔티티 리스트를
            // TodoDTO 리스트로 변환
            List<TodoDTO> dtos = entities.stream()
                    .map(TodoDTO::new)
                    .collect(Collectors.toList());

            // 6. 변환된 TodoDTO 리스트를 이용해 ResponseDTO 초기화
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .data(dtos)
                    .build();

            // 7. ResponseDTO를 리턴
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            // 8. 혹시 예외가 나는 경우 dto 대신 error 메시지를 넣어 리턴한다.
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .error(e.getMessage())
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
    @GetMapping
    public ResponseEntity<?> retrieveTodoList() {
        String TemporaryUserId = "temporary-user";

        // 1. 서비스 메서드의 retrieve 메서드를 호출해 Todo 엔티티 리스트를 가져온다.
        List<TodoEntity> entities = service.retrieve(TemporaryUserId);

        // 2. 자바 스트림을 이용해 리턴된 엔티티 리스트를 TodoTDO 리스트로 변환한다.
        List<TodoDTO> dtos = entities.stream()
                .map(TodoDTO::new)
                .collect(Collectors.toList());

        // 3. 변환된 TodoDTO 리스트를 이용해 ResponseDTO 를 초기화한다.
        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                .data(dtos)
                .build();
        // 4. ResponseDTO 를 리턴한다.
        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody TodoDTO dto) {
        String temporaryUserId = "temporary-user";

        // 1. dto를 entity로 변환한다.
        TodoEntity entity = TodoDTO.toEntity(dto);

        // 2. id를 temporaryUserId로 초기화한다.
        entity.setUserId(temporaryUserId);

        // 3. 서비스를 이용해 Todo 엔티티를 업데이트한다.
        List<TodoEntity> entities = service.update(entity);

        // 4. 자바 스트림을 이용해 리턴된 엔티티 리스트를 TodoDTO 리스트로 변환한다.
        List<TodoDTO> dtos = entities.stream()
                .map(TodoDTO::new)
                .collect(Collectors.toList());

        // 5. 변환된 TodoDTO 리스트를 이용해 ResponseDTO를 초기화한다.
        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                .data(dtos)
                .build();

        // 6. ResponseDTO를 리턴한다.
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody TodoDTO dto) {
        try {
            String temporaryUserId = "temporary-user";

            // 1. TodoEntity로 변환한다.
            TodoEntity entity = TodoDTO.toEntity(dto);

            // 2. 임시 유저 아이디를 설정해 준다.
            entity.setUserId(temporaryUserId);

            // 3. 서비스를 이용해 Todo 엔티티를 삭제한다.
            List<TodoEntity> entities = service.delete(entity);

            // 4. 자바 스트림을 이용해 리턴된 엔티티 리스트를 TodoDTO 리스트로 변환한다.
            List<TodoDTO> dtos = entities.stream()
                    .map(TodoDTO::new)
                    .collect(Collectors.toList());

            // 5. 변환된 TodoDTO 리스트를 이용해 ResponseDTO를 초기화한다.
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .data(dtos)
                    .build();

            // 6. ResponseDTO를 리턴한다.
            return ResponseEntity.ok().body(response);
        }catch (Exception e) {
            // 7. 예외가 발생하면 에러 메시지를 리턴한다.
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
