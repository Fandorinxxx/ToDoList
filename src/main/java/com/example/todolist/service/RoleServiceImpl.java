package com.example.todolist.service;

import com.example.todolist.entity.Role;
import com.example.todolist.repository.RoleRepository;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public Collection<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {

        return roleRepository.findById(id);
    }

    @Override
    public Role saveOrUpdate(Role role) {

        return roleRepository.saveAndFlush(role);
    }

    @Override
    public String deleteById(Long id) {

        JSONObject jsonObject = new JSONObject();
        try {
            roleRepository.deleteById(id);
            jsonObject.put("message","Role deleted successfully");
        } catch (JSONException e )
        {e.printStackTrace();}

        return jsonObject.toString();
    }
}
