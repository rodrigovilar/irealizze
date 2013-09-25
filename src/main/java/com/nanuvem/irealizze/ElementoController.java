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
import com.nanuvem.irealizze.modelo.ElementoFolha;

@RooWebJson(jsonObject = Elemento.class)
@Controller
@RequestMapping("/elementos")
public class ElementoController {
	
	@RequestMapping(value = "/{id}/elementosfolhas", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> folhasDeElemento(@PathVariable("id") Long id) {
        Elemento elemento = Elemento.findElemento(id);
        Set<ElementoFolha> elementosfolhas = elemento.getFolhas();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(ElementoFolha.toJsonArray(elementosfolhas), headers, HttpStatus.OK);
    }

}
