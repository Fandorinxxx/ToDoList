package com.example.todolist.service;

import com.example.todolist.entity.User;
import com.example.todolist.repository.UserRepository;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveOrUpdate(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

 /*   @Override
    public User getUserById(Long id) {
        return userRepository.getById(id);
    }*/

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try{
            userRepository.deleteById(id);
            jsonObject.put("message","User deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
