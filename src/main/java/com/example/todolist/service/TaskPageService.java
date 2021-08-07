package com.example.todolist.service;


import com.example.todolist.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskPageService {
    Page<Task> findAll(Pageable pageable, String searchText,Long id);
    Page<Task> findAll(Pageable pageable,Long id);
}
