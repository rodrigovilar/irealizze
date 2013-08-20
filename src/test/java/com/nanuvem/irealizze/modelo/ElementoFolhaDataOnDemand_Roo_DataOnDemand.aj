// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.Elemento;
import com.nanuvem.irealizze.modelo.ElementoDataOnDemand;
import com.nanuvem.irealizze.modelo.ElementoFolha;
import com.nanuvem.irealizze.modelo.ElementoFolhaDataOnDemand;
import com.nanuvem.irealizze.modelo.perene.ItemDataOnDemand;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect ElementoFolhaDataOnDemand_Roo_DataOnDemand {
    
    declare @type: ElementoFolhaDataOnDemand: @Component;
    
    private Random ElementoFolhaDataOnDemand.rnd = new SecureRandom();
    
    private List<ElementoFolha> ElementoFolhaDataOnDemand.data;
    
    @Autowired
    ItemDataOnDemand ElementoFolhaDataOnDemand.itemDataOnDemand;
    
    @Autowired
    ElementoDataOnDemand ElementoFolhaDataOnDemand.elementoDataOnDemand;
    
    public ElementoFolha ElementoFolhaDataOnDemand.getNewTransientElementoFolha(int index) {
        ElementoFolha obj = new ElementoFolha();
        setPai(obj, index);
        return obj;
    }
    
    public void ElementoFolhaDataOnDemand.setPai(ElementoFolha obj, int index) {
        Elemento pai = elementoDataOnDemand.getRandomElemento();
        obj.setPai(pai);
    }
    
    public ElementoFolha ElementoFolhaDataOnDemand.getSpecificElementoFolha(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        ElementoFolha obj = data.get(index);
        Long id = obj.getId();
        return ElementoFolha.findElementoFolha(id);
    }
    
    public ElementoFolha ElementoFolhaDataOnDemand.getRandomElementoFolha() {
        init();
        ElementoFolha obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return ElementoFolha.findElementoFolha(id);
    }
    
    public boolean ElementoFolhaDataOnDemand.modifyElementoFolha(ElementoFolha obj) {
        return false;
    }
    
    public void ElementoFolhaDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = ElementoFolha.findElementoFolhaEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'ElementoFolha' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<ElementoFolha>();
        for (int i = 0; i < 10; i++) {
            ElementoFolha obj = getNewTransientElementoFolha(i);
            try {
                obj.persist();
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            obj.flush();
            data.add(obj);
        }
    }
    
}
