package com.nanuvem.irealizze;

import java.util.Set;

import com.nanuvem.irealizze.modelo.Periodo;
import com.nanuvem.irealizze.modelo.Projeto;
import com.nanuvem.irealizze.modelo.perene.Preco;
import com.nanuvem.irealizze.modelo.perene.TabelaPreco;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RooWebJson(jsonObject = TabelaPreco.class)
@Controller
@RequestMapping("/tabelasprecos")
public class TabelaPrecoController {
	
	@RequestMapping(value = "/{id}/precos", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> precosDeTabela(@PathVariable("id") Long id) {
        TabelaPreco tabela = TabelaPreco.findTabelaPreco(id);
        Set<Preco> precos = tabela.getPrecos();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Preco.toJsonArray(precos), headers, HttpStatus.OK);
    }

}
