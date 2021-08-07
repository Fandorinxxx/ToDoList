package com.example.todolist.controller;

import com.example.todolist.entity.Task;
import com.example.todolist.entity.User;
import com.example.todolist.repository.TaskRepository;
import com.example.todolist.service.TaskPageService;
import com.example.todolist.service.TaskService;
import com.example.todolist.service.UserService;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @Autowired
    private TaskPageService taskPageService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Task> save(@RequestBody Task task, Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        User user = userService.getUserByEmail(name);
        System.out.println(user.toString());
        task.setUserid(user.getId());
        task.setDate(new Date());
        return new ResponseEntity<>(taskService.saveOrUpdate(task), HttpStatus.CREATED);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Task> update(@RequestBody Task task) {
        return new ResponseEntity<>(taskService.saveOrUpdate(task), HttpStatus.OK);
    }

    @GetMapping("/search/{searchText}")
    public ResponseEntity<Page<Task>> findAll(Pageable pageable, @PathVariable String searchText, Long id) {
        return new ResponseEntity<>(taskPageService.findAll(pageable, searchText,id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Task>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir, Long id) {
        return new ResponseEntity<>(taskPageService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ,id), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Task> findById(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.findById(id).get(), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.deleteById(id), HttpStatus.OK);
    }


}
