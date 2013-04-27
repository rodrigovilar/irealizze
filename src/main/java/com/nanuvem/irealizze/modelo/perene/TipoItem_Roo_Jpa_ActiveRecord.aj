// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo.perene;

import com.nanuvem.irealizze.modelo.perene.TipoItem;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

privileged aspect TipoItem_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager TipoItem.entityManager;
    
    public static final EntityManager TipoItem.entityManager() {
        EntityManager em = new TipoItem().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long TipoItem.countTipoItems() {
        return entityManager().createQuery("SELECT COUNT(o) FROM TipoItem o", Long.class).getSingleResult();
    }
    
    public static List<TipoItem> TipoItem.findAllTipoItems() {
        return entityManager().createQuery("SELECT o FROM TipoItem o", TipoItem.class).getResultList();
    }
    
    public static TipoItem TipoItem.findTipoItem(Long id) {
        if (id == null) return null;
        return entityManager().find(TipoItem.class, id);
    }
    
    public static List<TipoItem> TipoItem.findTipoItemEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM TipoItem o", TipoItem.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void TipoItem.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void TipoItem.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            TipoItem attached = TipoItem.findTipoItem(this.id);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void TipoItem.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void TipoItem.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public TipoItem TipoItem.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        TipoItem merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}