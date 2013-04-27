package com.nanuvem.irealizze;

import javax.servlet.http.HttpServletRequest;

import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nanuvem.irealizze.modelo.Projeto;
import javax.servlet.http.HttpServletRequest;

@RooWebJson(jsonObject = Projeto.class)
@Controller
@RequestMapping("/projetos")
public class ProjetoController {

    public ResponseEntity<String> showJson(Long id) {
        Projeto projeto = Projeto.findProjeto(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (projeto == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(projeto.toJson(), headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", headers = "Accept=application/json")
    public ResponseEntity<String> updateFromJson(@PathVariable("id") Long id, 
    		@RequestBody String json, HttpServletRequest servletRequest) {
    	
    	if (servletRequest.getMethod().equals("PUT")) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json");
            
            Projeto salvo = Projeto.findProjeto(id);
            if (salvo == null) {
            	return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
            }
            
            Projeto novo = Projeto.fromJsonToProjeto(json);
            salvo.setNome(novo.getNome());
            salvo.setCliente(novo.getCliente());
            
            salvo.flush();
            
            return new ResponseEntity<String>(headers, HttpStatus.OK);    		
    	}
    	
    	return showJson(id);
    }

}
