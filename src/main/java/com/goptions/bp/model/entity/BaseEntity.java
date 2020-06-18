package com.goptions.bp.model.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;

@MappedSuperclass
public class BaseEntity implements IEntity {

    public static final String F_DATE_CREATED = "dateCreated";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private Long dateCreated;

    public Long getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Long dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    //TODO brainfuck
    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 31). // two randomly chosen prime numbers
                // if deriving: appendSuper(super.hashCode()).
                append(id).
                toHashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof BaseEntity))
            return false;
        if (obj == this)
            return true;

        if (!this.getClass().equals(obj.getClass())) {
            return false;
        }

        BaseEntity rhs = (BaseEntity) obj;
        return new EqualsBuilder().
                // if deriving: appendSuper(super.equals(obj)).
                        append(id, rhs.getId()).
                isEquals();
    }

}
