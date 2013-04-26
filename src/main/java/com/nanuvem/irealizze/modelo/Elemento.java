package com.nanuvem.irealizze.modelo;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;
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
public class Elemento {

    @NotNull
    private String nome;

    @NotNull
    @ManyToOne
    private Projeto projeto;

    @ManyToOne
    private Elemento pai;
    
    @NotNull
    private int sequencia;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pai")
    private Set<Elemento> filhos = new HashSet<Elemento>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pai")
    private Set<ElementoFolha> folhas = new HashSet<ElementoFolha>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "elemento")
    private Set<Alocacao> alocacoes = new HashSet<Alocacao>();
}
