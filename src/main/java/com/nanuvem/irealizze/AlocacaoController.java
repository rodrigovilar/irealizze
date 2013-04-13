package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.Alocacao;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Alocacao.class)
@Controller
@RequestMapping("/alocacoes")
public class AlocacaoController {
}
