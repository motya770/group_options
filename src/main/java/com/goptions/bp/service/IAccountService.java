package com.goptions.bp.service;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.security.AccountDetails;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 12/15/14.
 */
public interface IAccountService {

    List<Account> findAccountByNameLogin(String nameLogin);

    Account confirmRegistration(String guid) throws GOptionsException;

    Account cancelRegistration(String guid) throws GOptionsException;

    Account createRealAccount(String login, String pwd, String phone, String currency) throws GOptionsException;

    Account createDemoAccount(String login, String pwd, String phone, String currency) throws GOptionsException;

    void loginDemoAccount(Account account) throws GOptionsException;

    Account read(Long id);

    void create(Account account);

    List<Account> listAll(Integer pageNumber, Map<String, String[]> params) throws GOptionsException;

    void update(Account account);

    void delete(Account account);

    void updateBalance(Account account, BigDecimal addedValue);

    AccountDetails getCurrentAccount();

    Account findAccountByLogin(String login);

    Account getBankAccount();
}
