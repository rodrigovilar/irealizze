package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.perene.Responsavel;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Responsavel.class)
@Controller
@RequestMapping("/responsaveis")
public class ResponsavelController {
}
