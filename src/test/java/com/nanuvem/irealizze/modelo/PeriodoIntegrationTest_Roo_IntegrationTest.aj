// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.Periodo;
import com.nanuvem.irealizze.modelo.PeriodoDataOnDemand;
import com.nanuvem.irealizze.modelo.PeriodoIntegrationTest;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect PeriodoIntegrationTest_Roo_IntegrationTest {
    
    declare @type: PeriodoIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: PeriodoIntegrationTest: @ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml");
    
    declare @type: PeriodoIntegrationTest: @Transactional;
    
    @Autowired
    PeriodoDataOnDemand PeriodoIntegrationTest.dod;
    
    @Test
    public void PeriodoIntegrationTest.testCountPeriodoes() {
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", dod.getRandomPeriodo());
        long count = Periodo.countPeriodoes();
        Assert.assertTrue("Counter for 'Periodo' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void PeriodoIntegrationTest.testFindPeriodo() {
        Periodo obj = dod.getRandomPeriodo();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to provide an identifier", id);
        obj = Periodo.findPeriodo(id);
        Assert.assertNotNull("Find method for 'Periodo' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Periodo' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void PeriodoIntegrationTest.testFindAllPeriodoes() {
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", dod.getRandomPeriodo());
        long count = Periodo.countPeriodoes();
        Assert.assertTrue("Too expensive to perform a find all test for 'Periodo', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Periodo> result = Periodo.findAllPeriodoes();
        Assert.assertNotNull("Find all method for 'Periodo' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Periodo' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void PeriodoIntegrationTest.testFindPeriodoEntries() {
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", dod.getRandomPeriodo());
        long count = Periodo.countPeriodoes();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Periodo> result = Periodo.findPeriodoEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Periodo' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Periodo' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void PeriodoIntegrationTest.testFlush() {
        Periodo obj = dod.getRandomPeriodo();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to provide an identifier", id);
        obj = Periodo.findPeriodo(id);
        Assert.assertNotNull("Find method for 'Periodo' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyPeriodo(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'Periodo' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void PeriodoIntegrationTest.testMergeUpdate() {
        Periodo obj = dod.getRandomPeriodo();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to provide an identifier", id);
        obj = Periodo.findPeriodo(id);
        boolean modified =  dod.modifyPeriodo(obj);
        Integer currentVersion = obj.getVersion();
        Periodo merged = obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'Periodo' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void PeriodoIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", dod.getRandomPeriodo());
        Periodo obj = dod.getNewTransientPeriodo(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Periodo' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Periodo' identifier to be null", obj.getId());
        obj.persist();
        obj.flush();
        Assert.assertNotNull("Expected 'Periodo' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void PeriodoIntegrationTest.testRemove() {
        Periodo obj = dod.getRandomPeriodo();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Periodo' failed to provide an identifier", id);
        obj = Periodo.findPeriodo(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'Periodo' with identifier '" + id + "'", Periodo.findPeriodo(id));
    }
    
}
