// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.Medicao;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

privileged aspect Medicao_Roo_Jpa_Entity {
    
    declare @type: Medicao: @Entity;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long Medicao.id;
    
    @Version
    @Column(name = "version")
    private Integer Medicao.version;
    
    public Long Medicao.getId() {
        return this.id;
    }
    
    public void Medicao.setId(Long id) {
        this.id = id;
    }
    
    public Integer Medicao.getVersion() {
        return this.version;
    }
    
    public void Medicao.setVersion(Integer version) {
        this.version = version;
    }
    
}