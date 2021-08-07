package com.example.todolist.service;

import com.example.todolist.entity.Task;

import java.security.Principal;
import java.util.Collection;
import java.util.Optional;

public interface TaskService {
   // Collection<Task> findAll(Principal principal);

   // Optional<Task> findByEmail(String email);

    Optional<Task> findById(Long id);

    String deleteById(Long id);

    Task saveOrUpdate(Task task);


}
