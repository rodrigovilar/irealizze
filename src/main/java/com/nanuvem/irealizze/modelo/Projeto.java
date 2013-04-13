package com.nanuvem.irealizze.modelo;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Projeto {

    @NotNull
    private String nome;

    private String cliente;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "projeto")
    private Set<Elemento> elementosRaiz = new HashSet<Elemento>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "projeto")
    private Set<Periodo> periodos = new HashSet<Periodo>();
}
