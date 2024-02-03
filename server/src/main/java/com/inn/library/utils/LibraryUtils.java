package com.inn.library.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class LibraryUtils {
    private LibraryUtils(){

    }
    public static ResponseEntity<String> getResponseEntity(String responseMessage, HttpStatus httpStatus){
        return new ResponseEntity<String>("{\"message\":\""+responseMessage+"\"}", httpStatus);
    }
}
