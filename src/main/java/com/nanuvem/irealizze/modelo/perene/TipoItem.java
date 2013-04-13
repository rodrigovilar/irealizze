package com.nanuvem.irealizze.modelo.perene;

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
public class TipoItem {

    @NotNull
    private String nome;

    @ManyToOne
    private TipoItem pai;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pai")
    private Set<TipoItem> filhos = new HashSet<TipoItem>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tipo")
    private Set<Item> itens = new HashSet<Item>();
}
