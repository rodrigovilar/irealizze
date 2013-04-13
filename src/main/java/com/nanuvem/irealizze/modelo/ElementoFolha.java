package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.perene.Item;
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
public class ElementoFolha {

    @NotNull
    @ManyToOne
    private Elemento pai;

    @ManyToOne
    private Item item;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "elementoFolha")
    private Set<Medicao> medicoes = new HashSet<Medicao>();
}
