// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo.perene;

import com.nanuvem.irealizze.modelo.perene.Item;
import flexjson.JSONDeserializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Item_Roo_Json {
       
    public static Collection<Item> Item.fromJsonArrayToItems(String json) {
        return new JSONDeserializer<List<Item>>().use(null, ArrayList.class).use("values", Item.class).deserialize(json);
    }
    
}
