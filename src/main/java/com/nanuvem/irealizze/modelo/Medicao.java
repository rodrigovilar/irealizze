package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.perene.Preco;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Medicao {

    private double quantidade;

    @NotNull
    @Enumerated
    private TipoMedicao tipo;

    @NotNull
    @ManyToOne
    private ElementoFolha elementoFolha;

    @NotNull
    @ManyToOne
    private Preco preco;

    @NotNull
    @ManyToOne
    private Periodo periodo;

    @NotNull
    @ManyToOne
    private Alocacao alocacao;
}
