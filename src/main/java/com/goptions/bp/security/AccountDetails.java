package com.goptions.bp.security;

import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.account.AccountType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by matvei on 2/9/15.
 */
public class AccountDetails implements UserDetails {

    private Account account;

    public AccountDetails(Account account) {
        this.account = account;
    }

    public Account getAccount() {
        return this.account;
    }

    @Override
    public String getPassword() {
        if (account == null) {
            return null;
        }
        return account.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> list = new ArrayList<>();
        if (account.getAuthority() != null) {
            list.add(new SimpleGrantedAuthority(account.getAuthority()));
        }
        return list;
    }

    @Override
    public String getUsername() {
        return account.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {

        //for real
        if(account.getAccountType() == AccountType.REAL){
            return (account.isConfirmed() && !account.isCanceled() && !account.isBlocked());

        //for demo
        }else {
            return (!account.isBlocked() && !account.isCanceled());
        }
    }
}
