package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.TestRequestBodyDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("test")


public class TestController {
    @GetMapping
    public String testController() {
        return "Hello World";
    }
    @GetMapping("/testGetMapping")
    public String testGetMapping() {
        return "Hello World testGetMapping";
    }
    @GetMapping("/{id}")
    public  String testControllerPathVariable(@PathVariable(required = false) int id) {
        return "Hello World " + id;
    }
    @GetMapping("/testRequestBody")
    public String testControllerRequestBody(@RequestBody TestRequestBodyDTO testRequestBodyDTO) {
        return "Hello World testRequestBody"
                + testRequestBodyDTO.getId()
                + "Message : "
                + testRequestBodyDTO.getMessage();
    }
    @GetMapping("/testResponseBody")
    public ResponseDTO<String> testControllerResponseBody() {
        List<String> list = new ArrayList<>();
        list.add("Hello");
        ResponseDTO<String> response = ResponseDTO.<String>builder()
                .data(list)
                .build();
        return response;
    }

    @GetMapping("/testResponseEntity")
    public ResponseEntity<?> testControllerResponseEntity() {
        List<String> list = new ArrayList<>();
        list.add("Hello");
        ResponseDTO<String> response = ResponseDTO.<String>builder()
                .data(list)
                .build();
        return ResponseEntity.badRequest().body(response);
    }
}

