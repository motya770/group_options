package com.goptions.bp.service.impl;

import com.goptions.bp.core.manager.IEventManager;
import com.goptions.bp.dao.IAccountDao;
import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.account.AccountType;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.security.AccountDetails;
import com.goptions.bp.service.IAccountService;
import com.goptions.bp.service.IMailService;
import com.goptions.bp.utils.DateUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional(value = "transactionManager", rollbackFor = Exception.class)
public class AccountService implements IAccountService {

    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    private IAccountDao accountDao;

    @Autowired
    private Md5PasswordEncoder passwordEncoder;

    @Autowired
    private IEventManager eventManager;

    @Autowired
    private IMailService mailService;

    private Account bankAccount;

    private TransactionTemplate transactionTemplate;

    private HibernateTransactionManager transactionManager;

    @Autowired
    @Qualifier(value = "transactionManager")
    public void setTransactionManager(HibernateTransactionManager transactionManager){
        this.transactionManager = transactionManager;
        transactionTemplate = new TransactionTemplate(transactionManager);
       // transactionTemplate.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    }

    @Override
    public List<Account> findAccountByNameLogin(String nameLogin) {
        if(nameLogin.length() <= 2){
            return null;
        }

        List<Account> result = new ArrayList<>();

        DetachedCriteria fullNameCriteria = DetachedCriteria.forClass(Account.class);
        fullNameCriteria.add(Restrictions.ilike(Account.F_FULLNAME, "%" + nameLogin + "%"));
        List<Account> nameAccounts = accountDao.list(fullNameCriteria);
        result.addAll(nameAccounts);

        DetachedCriteria loginCriteria = DetachedCriteria.forClass(Account.class);
        loginCriteria.add(Restrictions.ilike(Account.F_LOGIN, "%" + nameLogin + "%"));
        List<Account> loginAccounts = accountDao.list(loginCriteria);
        result.addAll(loginAccounts);

        return result;
    }

    @Override
    public Account confirmRegistration(String guid) throws GOptionsException{

        Account account = findAccountByGuid(guid);

        if(account==null){
            throw new GOptionsException("Account with this guid " + guid + " not found (or already confirmed)!");
        }

        account.setConfirmed(true);

        accountDao.update(account);
        return account;
    }

    private Account findAccountByGuid(String guid){
        DetachedCriteria criteria = DetachedCriteria.forClass(Account.class);
        criteria.add(Restrictions.eq(Account.F_CONFIRMED, false));
        criteria.add(Restrictions.eq(Account.F_GUID, guid));
        Account account = accountDao.findOne(criteria);
        return account;
    }


    @Override
    public Account cancelRegistration(String guid) throws GOptionsException {
        Account account = findAccountByGuid(guid);

        if(account==null){
            throw new GOptionsException("Account with this guid " + guid + " not found (or already confirmed)!");
        }

        account.setCanceled(true);

        accountDao.update(account);
        return account;
    }

    @Override
    public Account createRealAccount(String login, String pwd, String phone, String currency) throws GOptionsException {
        Account account = buildAccount(login, pwd, phone, currency);
        accountDao.save(account);

        mailService.sendRegistrationMail(account);

        return account;
    }

    private Account buildAccount(String login, String pwd, String phone, String curr) throws GOptionsException {
        Account anotherAccount = findAccountByLogin(login);
        if (anotherAccount != null) {
            throw new GOptionsException("Can't create account with this login!");
        }

        Account account = new Account();
        account.setLogin(login);
        account.setPassword(passwordEncoder.encodePassword(pwd, null));
        account.setBalance(new BigDecimal(0));
        account.setMail(login);// mail and login are the same
        account.setPhone(phone);
        account.setDemo(Boolean.FALSE);//default account is real
        account.setGuid(UUID.randomUUID().toString());

        Currency currency = Currency.valueOf(curr);
        account.setCurrency(currency);

        return account;
    }

    @Override
    public void loginDemoAccount(Account account) throws GOptionsException {
        if (account == null) {
            throw new GOptionsException("Account can't be null");
        }

        if (!account.getDemo()) {
            throw new GOptionsException("Programming login is just for demo accounts .");
        }

        AccountDetails accountDetails = new AccountDetails(account);
        Authentication auth =
                new UsernamePasswordAuthenticationToken(accountDetails, null, accountDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

    }

    @Override
    public Account createDemoAccount(String login, String pwd, String phone, String currency) throws GOptionsException {
        Account account = buildAccount(login, pwd, phone, currency);
        account.setBalance(BigDecimal.valueOf(10_000.00));
        account.setDemo(Boolean.TRUE);
        accountDao.save(account);


        mailService.sendRegistrationMail(account);

        //making login because we don't want to user to spend time
        loginDemoAccount(account);

        return account;
    }

    @Override
    public List<Account> listAll(Integer pageNumber, Map<String, String[]> params)
        throws GOptionsException
    {
        DetachedCriteria criteria = DetachedCriteria.forClass(Account.class);
        buildAdminAccountCriteria(criteria, params);
        List<Account> accounts = accountDao.list(criteria, pageNumber);
        return accounts;
    }

    private void buildAdminAccountCriteria(DetachedCriteria criteria, Map<String, String[]> params)
            throws GOptionsException{

        if(params == null){
            return;
        }

        try {
            String[] createdFromArr = params.get(Account.F_DATE_CREATED + "From");
            if (createdFromArr != null && !StringUtils.isEmpty(createdFromArr[0])) {
                long createdDate = DateUtils.parse(createdFromArr[0]).getTime();
                criteria.add(Restrictions.ge(Account.F_DATE_CREATED, createdDate));
            }

            String[] createdToArr = params.get(Account.F_DATE_CREATED + "To");
            if (createdToArr != null && !StringUtils.isEmpty(createdToArr[0])) {
                long createdDate = DateUtils.parse(createdToArr[0]).getTime();
                criteria.add(Restrictions.le(Account.F_DATE_CREATED, createdDate));
            }

            String[] accountTypeArr = params.get(Account.F_ACCOUNT_TYPE);
            if (accountTypeArr != null && !StringUtils.isEmpty(accountTypeArr[0])) {
                criteria.add(Restrictions.eq(Account.F_ACCOUNT_TYPE, AccountType.valueOf(accountTypeArr[0])));
            }

            //TODO change this because it's too much for DB
            String[] fullNameArr = params.get(Account.F_FULLNAME);
            if (fullNameArr != null && !StringUtils.isEmpty(fullNameArr[0])) {
                criteria.add(Restrictions.eq(Account.F_FULLNAME, "%" + fullNameArr[0] + "%" ));
            }

        }catch (Exception e){
            logger.error("Parsing error", e);
            throw  new GOptionsException("parsing error");
        }
    }

    @Override
    public void update(Account account) {
        accountDao.update(account);
    }

    @Override
    public void create(Account account) {
        accountDao.save(account);
    }

    @Override
    public Account read(Long id) {
        return accountDao.read(id);
    }

    @Override
    public void delete(Account account) {
        accountDao.delete(account);
    }


    @Override
    public void updateBalance(Account account, BigDecimal addedValue) {

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {

            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try{
                    Account rereadAccount = read(account.getId());

                    if (addedValue != null) {
                        // Hibernate.initialize(account);
                        BigDecimal balance = rereadAccount.getBalance().add(addedValue);
                        balance  = balance.setScale(2, BigDecimal.ROUND_HALF_UP);
                        rereadAccount.setBalance(balance);

                        accountDao.update(rereadAccount);
                        eventManager.sendAccountUpdate(rereadAccount);

                    } else {
                        logger.warn("Can't update balance of account {} because addedValue is null", account.getId());
                    }
                }catch (Exception e){
                    logger.error("{}", e);
                    status.setRollbackOnly();
                }
            }
        });
    }

    @Override
    public Account findAccountByLogin(String login) {
        DetachedCriteria criteria = DetachedCriteria.forClass(Account.class);
        criteria.add(Restrictions.eq(Account.F_LOGIN, login));
        return accountDao.findOne(criteria);
    }

    @Override
    public AccountDetails getCurrentAccount() {
        if (SecurityContextHolder.getContext().getAuthentication() != null && SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof AccountDetails) {
            return (AccountDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } else {
            return null;
        }
    }

    @Override
    public Account getBankAccount() {
        //TODO add role ROLE_BANK
        if(bankAccount == null) {
            DetachedCriteria criteria = DetachedCriteria.forClass(Account.class);
            criteria.add(Restrictions.eq(Account.F_LOGIN, "test1"));
            bankAccount = accountDao.findOne(criteria);
        }
        return bankAccount;
    }
}
