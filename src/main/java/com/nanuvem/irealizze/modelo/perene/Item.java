package com.nanuvem.irealizze.modelo.perene;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
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
public class Item {

    @NotNull
    @Column(unique = true)
    private String nome;

    private String unidade;

    @NotNull
    @ManyToOne
    private TipoItem tipo;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item")
    private Set<Preco> precos = new HashSet<Preco>();
}
