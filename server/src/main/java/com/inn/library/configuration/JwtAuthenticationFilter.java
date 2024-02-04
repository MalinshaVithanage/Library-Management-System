package com.inn.library.configuration;


import com.inn.library.services.auth.jwt.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private JwtUtil jwtUtil;
    //BasicAuthenticationFilter es una clase que extiende de OncePerRequestFilter, que es una clase que se ejecuta una vez por cada peticion que se hace al servidor y que extiende de GenericFilterBean que es una clase que implementa Filter, que es una interfaz que se encarga de filtrar las peticiones que llegan al servidor y añadir los headers necesarios para que el navegador no bloquee las peticiones
    //BasicAuthenticationFilter se ejecuta despues de la autenticacion por formulario y antes de la autenticacion por token
    //BasicAuthenticationFilter se usa para validar el token que se envia en el header de la peticion y si es valido se autentica al usuario en el servidor y se le da acceso a los recursos que solicito
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(JwtUtil.HEADER_STRING);

        if (!requiresAuthentication(header)) {
            logger.info("No requiere autenticacion");
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = null;

        if(jwtUtil.validate(header)) {
            logger.info("Token del header de la request: " + header);
            logger.info("Token valido");
            authentication = new UsernamePasswordAuthenticationToken(jwtUtil.extractUsername(header), null, jwtUtil.getRoles(header));
        }else {
            logger.info("Token invalido");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }

    protected boolean requiresAuthentication(String header) {

        if (header == null || !header.startsWith(JwtUtil.TOKEN_PREFIX)) {
            return false;
        }
        return true;
    }
}
