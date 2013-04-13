package com.nanuvem.irealizze;

import com.nanuvem.irealizze.modelo.perene.Item;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Item.class)
@Controller
@RequestMapping("/itens")
public class ItemController {
}
