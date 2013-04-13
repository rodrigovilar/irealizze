package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.perene.Preco;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Preco.class)
@Controller
@RequestMapping("/precos")
public class PrecoController {
}
