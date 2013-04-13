package com.nanuvem.irealizze.modelo.perene;

import com.nanuvem.irealizze.modelo.Alocacao;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
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
public class Responsavel {

    @NotNull
    @Column(unique = true)
    private String login;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "responsavel")
    private Set<Alocacao> alocacoes = new HashSet<Alocacao>();
}
