package com.nanuvem.irealizze.modelo;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Periodo {

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "S-")
    private Calendar dataLimite;

    @NotNull
    @ManyToOne
    private Projeto projeto;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "periodo")
    private Set<Alocacao> alocacoes = new HashSet<Alocacao>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "periodo")
    private Set<Medicao> medicoes = new HashSet<Medicao>();
}
