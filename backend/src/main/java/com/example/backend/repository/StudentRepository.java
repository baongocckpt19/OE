package com.example.backend.repository;

import com.example.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Sửa tên trường className → studentClass (phù hợp với entity)
    @Query("SELECT s FROM Student s WHERE s.studentClass = :className")
    List<Student> findByClass(@Param("className") String className);

    // Native query sửa tên bảng students → dbcusers
    @Query(value = "SELECT * FROM dbcusers WHERE email LIKE %:domain", nativeQuery = true)
    List<Student> findByEmailDomain(@Param("domain") String domain);

    // Derived query mới phù hợp với trường dữ liệu
    List<Student> findByRole(String role);

    List<Student> findByStudentClass(String studentClass);
}