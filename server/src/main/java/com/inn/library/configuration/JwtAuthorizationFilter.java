package com.inn.library.configuration;


import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inn.library.dto.AuthenticationRequest;
import com.inn.library.services.auth.jwt.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthorizationFilter extends UsernamePasswordAuthenticationFilter {


    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    //UsernamePasswordAuthenticationFilter es una clase que extiende de AbstractAuthenticationProcessingFilter, que es una clase que se ejecuta una vez por cada peticion que se hace al servidor y que extiende de GenericFilterBean que es una clase que implementa Filter, que es una interfaz que se encarga de filtrar las peticiones que llegan al servidor y añadir los headers necesarios para que el navegador no bloquee las peticiones
    //UsernamePasswordAuthenticationFilter se usa para validar el usuario y contraseña que se envia en el body de la peticion y si es valido se autentica al usuario en el servidor y se le da acceso a los recursos que solicito
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/auth/login", "POST"));

        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        String username = obtainUsername(request);
        String password = obtainPassword(request);

        if(username != null && password !=null) {
            //cuando se envia el username y password por form-data
            logger.info("Username desde request parameter (form-data): " + username);
            logger.info("Password desde request parameter (form-data): " + password);

        } else {
            //cuando se envia el username y password por raw (json)
            AuthenticationRequest userRequest = null;
            try {

                userRequest = new ObjectMapper().readValue(request.getInputStream(), AuthenticationRequest.class);

                username = userRequest.getUsername();
                password = userRequest.getPassword();

                logger.info("Username desde request InputStream (raw): " + username);
                logger.info("Password desde request InputStream (raw): " + password);

            } catch (JsonParseException e) {
                e.printStackTrace();
            } catch (JsonMappingException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        username = username.trim();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        String token = jwtUtil.createToken(authResult);
        //agregar Access-Control-Expose-Headers, para que el navegador pueda acceder a la cabecera Authorization
        response.addHeader(JwtUtil.HEADER_STRING, JwtUtil.TOKEN_PREFIX + token);
        //response.addHeader("Access-Control-Expose-Headers", jwtUtil.HEADER_STRING); usar esto para que el cliente pueda ver los datos del encabezado

//se añade el token en la cabecera de la respuesta para que el navegador lo guarde en el local storage y lo envie en la cabecera de las peticiones que haga al servidor
        Map<String, Object> body = new HashMap<String, Object>();
        body.put("token", token);

        body.put("user", (User) authResult.getPrincipal());
        body.put("mensaje", String.format("Hola %s, has iniciado sesión con éxito!", ((User)authResult.getPrincipal()).getUsername()) );

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(200);
        response.setContentType("application/json");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {

        Map<String, Object> body = new HashMap<String, Object>();
        body.put("mensaje", "Error de autenticación: username o password incorrecto!");
        body.put("error", failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(401);
        response.setContentType("application/json");
    }
}
