package com.nanuvem.irealizze;

import java.util.Set;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nanuvem.irealizze.modelo.Elemento;
import com.nanuvem.irealizze.modelo.Periodo;
import com.nanuvem.irealizze.modelo.Projeto;

@RooWebJson(jsonObject = Projeto.class)
@Controller
@RequestMapping("/projetos")
public class ProjetoController {

	@RequestMapping(value = "/{id}/periodos", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> periodosDeProjeto(@PathVariable("id") Long id) {
        Projeto projeto = Projeto.findProjeto(id);
        Set<Periodo> periodos = projeto.getPeriodos();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Periodo.toJsonArray(periodos), headers, HttpStatus.OK);
    }

	@RequestMapping(value = "/{id}/elementos", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> elementosDeProjeto(@PathVariable("id") Long id) {
        Projeto projeto = Projeto.findProjeto(id);
        Set<Elemento> elementos = projeto.getElementosRaiz();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Elemento.toJsonArray(elementos), headers, HttpStatus.OK);
    }

}
