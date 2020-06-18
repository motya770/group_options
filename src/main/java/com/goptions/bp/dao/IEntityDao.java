package com.goptions.bp.dao;

import com.goptions.bp.model.entity.IEntity;
import org.hibernate.criterion.DetachedCriteria;

import java.util.List;

public interface IEntityDao<T extends IEntity> {

    static final int DEFAULT_PAGE_SIZE = 100;

    void flush();

    T read(Long id);

    void save(T entity);

    boolean delete(T entity);

    void update(T entity);

    void update(List<T> entities);

    List<T> list(DetachedCriteria criteria);

    T findOne(DetachedCriteria criteria);

    List<T> list(DetachedCriteria criteria, int pageSize, int pageNumber);

    List<T> list(DetachedCriteria criteria, int pageNumber);

    List<T> getAll(DetachedCriteria criteria);
}
