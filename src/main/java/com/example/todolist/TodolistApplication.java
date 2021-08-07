package com.example.todolist;

import com.example.todolist.entity.Role;
import com.example.todolist.entity.User;
import com.example.todolist.service.RoleService;
import com.example.todolist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class TodolistApplication  implements  CommandLineRunner{
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;


    public static void main(String[] args) {
        SpringApplication.run(TodolistApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleService.findAll().isEmpty()) {
            roleService.saveOrUpdate(new Role("ADMIN"));
            roleService.saveOrUpdate(new Role("USER"));
        }

        if (userService.findAll().isEmpty()) {
            User user1 = new User();
            user1.setEmail("test@user.com");
            user1.setRole(roleService.findByName("USER"));
            user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
            userService.saveOrUpdate(user1);


        }

    }
}
