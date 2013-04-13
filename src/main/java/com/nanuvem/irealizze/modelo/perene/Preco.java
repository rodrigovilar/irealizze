package com.nanuvem.irealizze.modelo.perene;

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
public class Preco {

    @NotNull
    private double valorUnitario;

    @NotNull
    @ManyToOne
    private Item item;

    @NotNull
    @ManyToOne
    private TabelaPreco tabela;
}
