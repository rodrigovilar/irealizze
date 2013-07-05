package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.perene.Responsavel;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RooWebJson(jsonObject = Responsavel.class)
@Controller
@RequestMapping("/responsaveis")
public class ResponsavelController {
	
	 @RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
	    public ResponseEntity<String> updateFromJson(@RequestBody String json) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", "application/json");
	        Responsavel responsavel = Responsavel.fromJsonToResponsavel(json);
	        if (responsavel.merge() == null) {
	            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<String>(headers, HttpStatus.OK);
	    }
}
