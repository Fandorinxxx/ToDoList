package com.example.todolist.controller;



import com.example.todolist.config.JwtTokenProvider;
import com.example.todolist.entity.User;
import com.example.todolist.repository.RoleRepository;
import com.example.todolist.repository.UserRepository;
import com.example.todolist.service.UserService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.awt.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/register",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody User user) {
        JSONObject jsonObject = new JSONObject();
        try {
            if (userRepository.findByEmail(user.getEmail())==null) {

            } else {
                jsonObject.put("message", user.getEmail() + " : this email is busy");
                return new ResponseEntity<String>(jsonObject.toString(),HttpStatus.UNAUTHORIZED);
            }
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setRole(roleRepository.findByName("USER"));
            User savedUser = userRepository.saveAndFlush(user);
            jsonObject.put("message", savedUser.getEmail() + " saved succesfully");
            return  new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);

        } catch (JSONException e ) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(),HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/authenticate",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody User user){
        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
            if (authentication.isAuthenticated()){
                String email = user.getEmail();
                jsonObject.put("name",authentication.getName());
                jsonObject.put("id",userService.getUserByEmail(authentication.getName()).getId());
                jsonObject.put("authorities",authentication.getAuthorities());
                jsonObject.put("token",jwtTokenProvider.createToken(email,userRepository.findByEmail(email).getRole()));
                return  new ResponseEntity<String>(jsonObject.toString(),HttpStatus.OK);
            }

        } catch (JSONException e){
            try {
                jsonObject.put("exception", e.getMessage());
            } catch ( JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(),HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

}
