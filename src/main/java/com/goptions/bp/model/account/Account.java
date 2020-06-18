package com.goptions.bp.model.account;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.goptions.bp.model.currency.Currency;
import com.goptions.bp.model.entity.BaseEntity;
import com.goptions.bp.model.position.Position;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Entity(name = "account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Account extends BaseEntity implements Serializable {

    public static final String F_LOGIN = "login";
    public static final String F_CONFIRMED = "confirmed";
    public static final String F_GUID = "guid";
    public static final String F_AUTHORITY = "authority";
    public static final String F_FULLNAME = "fullName";
    public static final String F_ACCOUNT_TYPE = "accountType";


    private String login;
    private String fistName;
    private String lastName;
    //just for search patterns
    private String fullName;
    private BigDecimal balance;

    //TODO change (remove?) ambigious with demo property
    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private String authority;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean demo;

    private String mail;

    private String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Currency currency;

    @JsonIgnore
    private String password;

    //TODO think about changing this to LAZY
    @JsonIgnore
    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
    private List<Position> positions;

    private String guid;

    private boolean confirmed;

    private boolean canceled;

    private boolean blocked;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public boolean isCanceled() {
        return canceled;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    /*
    @Version
    @Column(name="OPTLOCK")
    private Integer version;

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }*/

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean getDemo() {
        return demo;
    }

    public void setDemo(Boolean demo) {
        this.demo = demo;
    }

    public String getFistName() {
        return fistName;
    }

    public void setFistName(String fistName) {
        this.fistName = fistName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Deprecated
    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
