package com.goptions.bp.security;

import com.goptions.bp.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by matvei on 2/9/15.
 */
@Service
public class AccountDetailsService implements UserDetailsService {

    @Autowired
    private IAccountService accountService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return new AccountDetails(accountService.findAccountByLogin(login));
    }
}
