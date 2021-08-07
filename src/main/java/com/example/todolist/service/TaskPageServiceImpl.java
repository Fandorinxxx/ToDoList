package com.example.todolist.service;

import com.example.todolist.entity.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskPageServiceImpl implements TaskPageService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Page<Task> findAll(Pageable pageable, String searchText ,Long id) {
        return taskRepository.findAllTasks(pageable, searchText,id);
    }

    @Override
    public Page<Task> findAll(Pageable pageable,Long id) {
        return taskRepository.findAllTaskss(pageable,id);
    }


}
