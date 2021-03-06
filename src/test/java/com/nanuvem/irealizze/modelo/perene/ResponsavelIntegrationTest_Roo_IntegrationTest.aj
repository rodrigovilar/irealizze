// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo.perene;

import com.nanuvem.irealizze.modelo.perene.Responsavel;
import com.nanuvem.irealizze.modelo.perene.ResponsavelDataOnDemand;
import com.nanuvem.irealizze.modelo.perene.ResponsavelIntegrationTest;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect ResponsavelIntegrationTest_Roo_IntegrationTest {
    
    declare @type: ResponsavelIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: ResponsavelIntegrationTest: @ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml");
    
    declare @type: ResponsavelIntegrationTest: @Transactional;
    
    @Autowired
    private ResponsavelDataOnDemand ResponsavelIntegrationTest.dod;
    
    @Test
    public void ResponsavelIntegrationTest.testCountResponsavels() {
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", dod.getRandomResponsavel());
        long count = Responsavel.countResponsavels();
        Assert.assertTrue("Counter for 'Responsavel' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void ResponsavelIntegrationTest.testFindResponsavel() {
        Responsavel obj = dod.getRandomResponsavel();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to provide an identifier", id);
        obj = Responsavel.findResponsavel(id);
        Assert.assertNotNull("Find method for 'Responsavel' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Responsavel' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void ResponsavelIntegrationTest.testFindAllResponsavels() {
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", dod.getRandomResponsavel());
        long count = Responsavel.countResponsavels();
        Assert.assertTrue("Too expensive to perform a find all test for 'Responsavel', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Responsavel> result = Responsavel.findAllResponsavels();
        Assert.assertNotNull("Find all method for 'Responsavel' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Responsavel' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void ResponsavelIntegrationTest.testFindResponsavelEntries() {
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", dod.getRandomResponsavel());
        long count = Responsavel.countResponsavels();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Responsavel> result = Responsavel.findResponsavelEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Responsavel' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Responsavel' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void ResponsavelIntegrationTest.testFlush() {
        Responsavel obj = dod.getRandomResponsavel();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to provide an identifier", id);
        obj = Responsavel.findResponsavel(id);
        Assert.assertNotNull("Find method for 'Responsavel' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyResponsavel(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'Responsavel' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void ResponsavelIntegrationTest.testMergeUpdate() {
        Responsavel obj = dod.getRandomResponsavel();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to provide an identifier", id);
        obj = Responsavel.findResponsavel(id);
        boolean modified =  dod.modifyResponsavel(obj);
        Integer currentVersion = obj.getVersion();
        Responsavel merged = obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'Responsavel' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void ResponsavelIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", dod.getRandomResponsavel());
        Responsavel obj = dod.getNewTransientResponsavel(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Responsavel' identifier to be null", obj.getId());
        obj.persist();
        obj.flush();
        Assert.assertNotNull("Expected 'Responsavel' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void ResponsavelIntegrationTest.testRemove() {
        Responsavel obj = dod.getRandomResponsavel();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Responsavel' failed to provide an identifier", id);
        obj = Responsavel.findResponsavel(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'Responsavel' with identifier '" + id + "'", Responsavel.findResponsavel(id));
    }
    
}
