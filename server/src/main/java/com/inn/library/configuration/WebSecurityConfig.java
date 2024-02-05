package com.inn.library.configuration;

import com.inn.library.enums.UserRole;
import com.inn.library.services.auth.jwt.JwtUtil;
import com.inn.library.services.auth.jwt.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity//habilita la seguridad a nivel de metodo
public class WebSecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;




    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf( csrfConfig->csrfConfig.disable())
                .sessionManagement( managementConfig->managementConfig.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .authorizeHttpRequests(authConfig->{
                    authConfig.requestMatchers("/api/auth/**").permitAll();
                    authConfig.requestMatchers("/api/admin/**").hasAnyAuthority(UserRole.ADMIN.name());
                    //authConfig.requestMatchers(HttpMethod.GET,"/api/auth/login").permitAll();
                    authConfig.anyRequest().authenticated();
                }).addFilterBefore(customFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(customFilter2(), UsernamePasswordAuthenticationFilter.class);
        /*http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
                        .authenticated())
                .httpBasic(withDefaults())//con esto se puede hacer la autenticacion basica
                .formLogin(withDefaults())
                .csrf(AbstractHttpConfigurer::disable);*/
        return http.build();



        //sessionManagement indica que no se va a usar sesiones, sino que se va a usar un token
        //sessionCreationPolicy indica que no se va a crear una sesion
        //STATELESS indica que no se va a guardar el estado de la sesion


    }
    /*@Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }*/

    public JwtAuthorizationFilter customFilter() throws Exception {
        JwtAuthorizationFilter authFilter = new JwtAuthorizationFilter(authenticationConfiguration.getAuthenticationManager(), jwtUtil);
        return authFilter;
    }
    public JwtAuthenticationFilter customFilter2() throws Exception {
        JwtAuthenticationFilter authFilter = new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager(),jwtUtil);
        return authFilter;
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*@Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user = User.withUsername("piero")
                .password(passwordEncoder().encode("piero"))
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user);
    }*/

//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//
//        return configuration.getAuthenticationManager();
//    }

}