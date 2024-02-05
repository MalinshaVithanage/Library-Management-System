package com.inn.library.services.admin;



import com.inn.library.dto.CategoryDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    CategoryDto postCategory(CategoryDto category) throws IOException;

    List<CategoryDto> getAllCategories();
}