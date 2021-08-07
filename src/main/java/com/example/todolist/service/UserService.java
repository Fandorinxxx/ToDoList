package com.example.todolist.service;

import com.example.todolist.entity.User;

import java.util.Collection;
import java.util.Optional;

public interface UserService {

    Collection<User> findAll();

    Optional<User> findById(Long id);

    User saveOrUpdate(User user);

    String deleteById(Long id);

   // User getUserById(Long id);

    User getUserByEmail(String email);
}
