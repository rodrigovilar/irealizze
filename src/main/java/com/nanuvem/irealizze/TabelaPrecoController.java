package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.perene.TabelaPreco;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = TabelaPreco.class)
@Controller
@RequestMapping("/tabelasprecos")
public class TabelaPrecoController {
}
