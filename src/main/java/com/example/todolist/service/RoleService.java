package com.example.todolist.service;

import com.example.todolist.entity.Role;
import com.example.todolist.entity.User;

import java.util.Collection;
import java.util.Optional;

public interface RoleService {
    Role findByName(String name);

    Collection<Role> findAll();

    Optional<Role> findById(Long id);

    Role saveOrUpdate(Role user);

    String deleteById(Long id);


}
