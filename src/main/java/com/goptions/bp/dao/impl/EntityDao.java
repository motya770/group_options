package com.goptions.bp.dao.impl;

import com.goptions.bp.dao.IEntityDao;
import com.goptions.bp.model.entity.BaseEntity;
import com.goptions.bp.model.entity.IEntity;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class EntityDao<T extends IEntity> implements IEntityDao<T> {

    private static final int MAX_PAGE_SIZE = 500;


    private static final Logger logger = LoggerFactory.getLogger(EntityDao.class);

    @Autowired
    protected SessionFactory sessionFactory;

    private Class<T> clazz;

    public EntityDao(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    public void flush() {
        sessionFactory.getCurrentSession().flush();
    }

    @Override
    public T read(Long id) {
        T entity = (T) sessionFactory.getCurrentSession().get(clazz, id);
        return entity;
    }

    @Override
    public void save(T entity) {
        BaseEntity e = (BaseEntity) entity;
        if (e.getId() == null) {
            e.setDateCreated(System.currentTimeMillis());
        }
        sessionFactory.getCurrentSession().save(e);
    }

    @Override
    public List<T> list(DetachedCriteria criteria) {
        return list(criteria, 0, 0);
    }

    @Override
    public T findOne(DetachedCriteria criteria) {
        //TODO looks like bug

        Criteria executableCriteria = criteria.getExecutableCriteria(sessionFactory.getCurrentSession());
        executableCriteria.setFirstResult(0);
        executableCriteria.setMaxResults(1);

        List<T> list = executableCriteria.list();

        //logger.error("find one size: " + list.size());

        if(list != null && list.size() > 0){
            return list.get(0);
        }

        return null;
    }

    @Override
    public List<T> list(DetachedCriteria criteria, int pageNumber) {
        return list(criteria, DEFAULT_PAGE_SIZE, pageNumber);
    }

    @Override
    @Deprecated
    public List<T> getAll(DetachedCriteria criteria){
        //TODO Change this
        Criteria executableCriteria = criteria.getExecutableCriteria(sessionFactory.getCurrentSession());
        return executableCriteria.list();
    }

    @Override
    public List<T> list(DetachedCriteria criteria, int pageSize, int pageNumber) {
        Criteria executableCriteria = criteria.getExecutableCriteria(sessionFactory.getCurrentSession());
        if (pageSize <= 0) {
            pageSize = MAX_PAGE_SIZE;
        }
        executableCriteria.setMaxResults(pageSize);
        if (pageNumber > 1) {
            executableCriteria.setFirstResult((pageNumber - 1) * pageSize);
        }
        return executableCriteria.list();
    }

    @Override
    public void update(List<T> entities) {
        int counter = 0;
        for (T entity : entities) {
            update(entity);
            counter++;
            if (counter % 1000 == 0) {
                sessionFactory.getCurrentSession().flush();
            }
        }
    }

    @Override
    public void update(T entity) {
        sessionFactory.getCurrentSession().update(entity);
    }

    @Override
    public boolean delete(T entity) {
        sessionFactory.getCurrentSession().delete(entity);
        return true;
    }
}
