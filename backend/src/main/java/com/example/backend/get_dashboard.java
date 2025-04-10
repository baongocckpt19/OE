package com.example.backend;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("api/Dashboard")
public class get_dashboard {
  @GetMapping
  public ResponseEntity<String> getAllInforDashboard(){
    return  ResponseEntity.ok( "Heloo");
  }

}
