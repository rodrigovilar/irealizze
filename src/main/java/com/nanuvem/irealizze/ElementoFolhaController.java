package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.ElementoFolha;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = ElementoFolha.class)
@Controller
@RequestMapping("/elementosfolhas")
public class ElementoFolhaController {
	
}
