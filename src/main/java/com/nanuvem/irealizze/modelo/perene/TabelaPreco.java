package com.nanuvem.irealizze.modelo.perene;

import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.transaction.annotation.Transactional;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class TabelaPreco {

    @NotNull
    private String nome;

    @Value("false")
    private Boolean vigente;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "S-")
    private Calendar inicioVigencia;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "S-")
    private Calendar fimVigencia;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tabela")
    private Set<Preco> precos = new HashSet<Preco>();
    
    @Transactional
    public void persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
        
        List<Item> items = Item.findAllItems();//zerando o preço de todos os itens
        for (Item item : items) {
			Preco preco = new Preco();
			preco.setItem(item);
			preco.setTabela(this);
			preco.setValorUnitario(0.0);
			preco.persist();			
		}
    }

}
