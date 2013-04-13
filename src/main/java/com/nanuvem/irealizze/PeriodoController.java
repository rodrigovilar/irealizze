package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.Periodo;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Periodo.class)
@Controller
@RequestMapping("/periodos")
public class PeriodoController {
}
