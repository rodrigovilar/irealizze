package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.perene.Responsavel;
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
public class Alocacao {

    private int prioridade;

    @NotNull
    @ManyToOne
    private Elemento elemento;

    @ManyToOne
    private Responsavel responsavel;

    @NotNull
    @ManyToOne
    private Periodo periodo;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "alocacao")
    private Set<Medicao> medicoes = new HashSet<Medicao>();
}
