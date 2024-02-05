package com.inn.library.controller;

import com.inn.library.dto.CategoryDto;
import com.inn.library.services.admin.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    //ModelAttribute se usa para recibir datos de un formulario
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    //como sabe que adminsService es de tipo AdminServiceImpl? porque en AdminServiceImpl tiene la anotacion @Service

    @PostMapping("/category")
    public ResponseEntity<CategoryDto> postCategory(@ModelAttribute CategoryDto categoryDto) throws IOException {
        CategoryDto createdCatDto = adminService.postCategory(categoryDto);
        if (createdCatDto != null) {
            return ResponseEntity.ok(createdCatDto);
        }
        return ResponseEntity.badRequest().build();
    }
    @PostMapping("/access")
    public ResponseEntity<String> hellCheck(){
        return ResponseEntity.ok("Tienes acceso de admin");
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getCategories(){
        List<CategoryDto> categoryDtoList = adminService.getAllCategories();
        if (categoryDtoList != null) {
            return ResponseEntity.ok(categoryDtoList);
        }
        return ResponseEntity.badRequest().build();
    }

}