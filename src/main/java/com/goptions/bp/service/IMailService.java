package com.goptions.bp.service;

import com.goptions.bp.model.account.Account;

/**
 * Created by matvei on 6/7/15.
 */
public interface IMailService {
    public void sendRegistrationMail(Account account);
}
