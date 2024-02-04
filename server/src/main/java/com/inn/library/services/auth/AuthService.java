package com.inn.library.services.auth;

import com.inn.library.dto.SignupRequest;
import com.inn.library.dto.UserDto;

public interface AuthService {
    UserDto createUser(SignupRequest signupRequest);
//    boolean hasCustomerWithEmail(String email);
}
