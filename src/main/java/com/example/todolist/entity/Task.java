package com.example.todolist.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "task_t")
public class Task implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @Column()
    private Long userid;

    @Column(nullable = false)
    private String description;


    @Column
    private boolean EnabledTask;

    @Column
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Task() {
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getId() {
        return id;
    }



    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isEnabledTask() {
        return EnabledTask;
    }

    public void setEnabledTask(boolean enabledTask) {
        EnabledTask = enabledTask;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", userid=" + userid +
                ", description='" + description + '\'' +
                ", isEnabledTask=" + isEnabledTask() +
                ", date=" + date +
                ", user=" + user +
                '}';
    }
}

