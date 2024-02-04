package com.inn.library.services.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class SimpleGrantedAuthorityMixin { //esto es para que el token tenga el rol del usuario
    @JsonCreator
    public SimpleGrantedAuthorityMixin(@JsonProperty("authority") String role) {}
}