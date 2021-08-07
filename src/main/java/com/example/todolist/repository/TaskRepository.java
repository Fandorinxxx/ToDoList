package com.example.todolist.repository;

import com.example.todolist.entity.Task;
import com.example.todolist.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface TaskRepository extends PagingAndSortingRepository<Task,Long> {

    @Query("FROM Task b WHERE b.description LIKE %:searchText%  AND b.userid in :id  ORDER BY b.description ASC")
    Page<Task> findAllTasks(Pageable pageable, @Param("searchText") String searchText,@Param("id") Long id);

    @Query("FROM Task b WHERE b.userid in :id   ORDER BY b.description ASC")
    Page<Task> findAllTaskss(Pageable pageable, @Param("id") Long id);

}
