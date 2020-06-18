package com.goptions.bp.controller.admin;


import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.account.Account;
import com.goptions.bp.model.account.AccountType;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by matvei on 12/24/14.
 */
@Controller
@RequestMapping(value = "/admin/account")
public class AdAccountController {

    @Autowired
    private IAccountService accountService;

    @RequestMapping(value = "/find-by-name-or-login")
    public @ResponseBody List<Account> findAccountByNameOrLogin(@RequestParam(required = true) String nameLogin) {
       return accountService.findAccountByNameLogin(nameLogin);
    }


    //TODO hidden for security reasons
    //@RequestMapping(value = "/create")
    public String create(@RequestParam(value = "firstName", required = true) String firstName,
                         @RequestParam(value = "lastName", required = true) String lastName,
                         @RequestParam(value = "type", required = true) String type,
                         @RequestParam(value = "balance", required = true) BigDecimal balance,
                         @RequestParam Currency currency,
                         Model model) throws GOptionsException {

        //TODO write another implementation
        checkAccountFields(firstName, lastName, type, currency);

        Account account = new Account();
        account.setFistName(firstName);
        account.setLastName(lastName);
        account.setBalance(balance);
        AccountType accountType = AccountType.valueOf(type);
        if (accountType == null) {
            throw new GOptionsException("Can't parse type.");
        }
        account.setAccountType(accountType);
        accountService.create(account);

        model.addAttribute(account);
        return "admin/account/show";
    }


    @RequestMapping(value = "/new-entity")
    public String newEntity() {
        return "admin/account/new-entity";
    }


    @RequestMapping(value = "/edit")
    public String edit(@RequestParam(required = true) Long id, Model model) {
        Account account = accountService.read(id);
        model.addAttribute(account);
        return "admin/account/edit";
    }

    @RequestMapping(value = "/list")
    public String list(@RequestParam(required = false) Integer pageNumber,
                       HttpServletRequest request,
                       Model model) throws GOptionsException{
        if (pageNumber == null) {
            pageNumber = 1;
        }
        Map<String, String[]> params = request.getParameterMap();
        List<Account> accounts = accountService.listAll(pageNumber, params);
        model.addAttribute(accounts);
        return "admin/account/list";
    }

    @RequestMapping(value = "/show")
    public String show(@RequestParam(required = true) Long id, Model model) {
        Account account = accountService.read(id);
        model.addAttribute(account);
        return "admin/account/show";
    }

    @RequestMapping(value = "/update")
    public String update(@RequestParam(value = "id", required = true) Long id, @RequestParam(value = "firstName", required = true) String firstName,
                         @RequestParam(value = "lastName", required = true) String lastName,
                         @RequestParam(value = "type", required = true) String type,
                         @RequestParam Currency currency,
                         Model model) throws GOptionsException {

        checkAccountFields(firstName, lastName, type, currency);

        Account account = accountService.read(id);
        AccountType accountType = AccountType.valueOf(type);
        if (accountType == null) {
            throw new GOptionsException("Can't parse type.");
        }
        account.setFistName(firstName);
        account.setLastName(lastName);
        account.setAccountType(accountType);
        account.setCurrency(currency);

        accountService.update(account);
        model.addAttribute(account);

        return "admin/account/show";
    }

    private void checkAccountFields(String firstName, String lastName, String type, Currency currency) throws GOptionsException {
        if (StringUtils.isEmpty(firstName)) {
            throw new GOptionsException("Fist name can't be empty");
        }

        if (StringUtils.isEmpty(lastName)) {
            throw new GOptionsException("Last name can't be empty");
        }

        if (StringUtils.isEmpty(type)) {
            throw new GOptionsException("Type can't be empty");
        }

        if (currency == null) {
            throw new GOptionsException("Currency can't be null");
        }
    }

    @RequestMapping(value = "/delete")
    public String delete(@RequestParam(required = true) Long id) {
        Account account = accountService.read(id);
        if (account != null) {
            accountService.delete(account);
        }
        return "redirect:/admin/account/list";
    }
}
