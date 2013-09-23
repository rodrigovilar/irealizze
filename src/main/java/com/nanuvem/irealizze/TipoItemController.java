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

import com.nanuvem.irealizze.modelo.perene.Item;
import com.nanuvem.irealizze.modelo.perene.TipoItem;

@RooWebJson(jsonObject = TipoItem.class)
@Controller
@RequestMapping("/tipositens")
public class TipoItemController {
	
	@RequestMapping(value = "/{id}/itens", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> itensDeTipoItem(@PathVariable("id") Long id) {
        TipoItem tipoitem = TipoItem.findTipoItem(id);
        Set<Item> itens = tipoitem.getItens();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Item.toJsonArray(itens), headers, HttpStatus.OK);
}
}
