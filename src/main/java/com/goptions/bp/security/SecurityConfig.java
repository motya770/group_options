package com.goptions.bp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;

/**
 * Created by matvei on 2/9/15.
 */
@Configuration
@EnableWebMvcSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public Md5PasswordEncoder passwordEncoder() throws Exception {
        return new Md5PasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //TODO csrf enable
        String platformUrl = "/platform";
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/positions/get-all-positions").permitAll()
                .antMatchers("/accounts/**").permitAll()
                .antMatchers("/positions/**").authenticated()
                .antMatchers("/customer/**").authenticated()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .defaultSuccessUrl(platformUrl)
                .loginPage("/registration").loginProcessingUrl("/login").permitAll()
                .and()
                .logout().permitAll().logoutSuccessUrl(platformUrl);

    }

    @Autowired
    public void configureGlobal(AccountDetailsService accountDetailsService, AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountDetailsService).passwordEncoder(passwordEncoder());
    }
}