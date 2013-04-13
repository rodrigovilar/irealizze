package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.perene.TipoItem;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = TipoItem.class)
@Controller
@RequestMapping("/tipositens")
public class TipoItemController {
}
