package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.Medicao;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Medicao.class)
@Controller
@RequestMapping("/medicoes")
public class MedicaoController {
}
