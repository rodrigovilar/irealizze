// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo.perene;

import com.nanuvem.irealizze.modelo.perene.Preco;
import com.nanuvem.irealizze.modelo.perene.TabelaPreco;
import java.util.Calendar;
import java.util.Set;

privileged aspect TabelaPreco_Roo_JavaBean {
    
    public String TabelaPreco.getNome() {
        return this.nome;
    }
    
    public void TabelaPreco.setNome(String nome) {
        this.nome = nome;
    }
    
    public Boolean TabelaPreco.getVigente() {
        return this.vigente;
    }
    
    public void TabelaPreco.setVigente(Boolean vigente) {
        this.vigente = vigente;
    }
    
    public Calendar TabelaPreco.getInicioVigencia() {
        return this.inicioVigencia;
    }
    
    public void TabelaPreco.setInicioVigencia(Calendar inicioVigencia) {
        this.inicioVigencia = inicioVigencia;
    }
    
    public Calendar TabelaPreco.getFimVigencia() {
        return this.fimVigencia;
    }
    
    public void TabelaPreco.setFimVigencia(Calendar fimVigencia) {
        this.fimVigencia = fimVigencia;
    }
    
    public Set<Preco> TabelaPreco.getPrecos() {
        return this.precos;
    }
    
    public void TabelaPreco.setPrecos(Set<Preco> precos) {
        this.precos = precos;
    }
    
}