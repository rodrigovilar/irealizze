// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.Medicao;
import com.nanuvem.irealizze.modelo.MedicaoDataOnDemand;
import com.nanuvem.irealizze.modelo.MedicaoIntegrationTest;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect MedicaoIntegrationTest_Roo_IntegrationTest {
    
    declare @type: MedicaoIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: MedicaoIntegrationTest: @ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml");
    
    declare @type: MedicaoIntegrationTest: @Transactional;
    
    @Autowired
    private MedicaoDataOnDemand MedicaoIntegrationTest.dod;
    
    @Test
    public void MedicaoIntegrationTest.testCountMedicaos() {
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", dod.getRandomMedicao());
        long count = Medicao.countMedicaos();
        Assert.assertTrue("Counter for 'Medicao' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void MedicaoIntegrationTest.testFindMedicao() {
        Medicao obj = dod.getRandomMedicao();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to provide an identifier", id);
        obj = Medicao.findMedicao(id);
        Assert.assertNotNull("Find method for 'Medicao' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Medicao' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void MedicaoIntegrationTest.testFindAllMedicaos() {
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", dod.getRandomMedicao());
        long count = Medicao.countMedicaos();
        Assert.assertTrue("Too expensive to perform a find all test for 'Medicao', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Medicao> result = Medicao.findAllMedicaos();
        Assert.assertNotNull("Find all method for 'Medicao' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Medicao' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void MedicaoIntegrationTest.testFindMedicaoEntries() {
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", dod.getRandomMedicao());
        long count = Medicao.countMedicaos();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Medicao> result = Medicao.findMedicaoEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Medicao' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Medicao' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void MedicaoIntegrationTest.testFlush() {
        Medicao obj = dod.getRandomMedicao();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to provide an identifier", id);
        obj = Medicao.findMedicao(id);
        Assert.assertNotNull("Find method for 'Medicao' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyMedicao(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'Medicao' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void MedicaoIntegrationTest.testMergeUpdate() {
        Medicao obj = dod.getRandomMedicao();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to provide an identifier", id);
        obj = Medicao.findMedicao(id);
        boolean modified =  dod.modifyMedicao(obj);
        Integer currentVersion = obj.getVersion();
        Medicao merged = obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'Medicao' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void MedicaoIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", dod.getRandomMedicao());
        Medicao obj = dod.getNewTransientMedicao(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Medicao' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Medicao' identifier to be null", obj.getId());
        obj.persist();
        obj.flush();
        Assert.assertNotNull("Expected 'Medicao' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void MedicaoIntegrationTest.testRemove() {
        Medicao obj = dod.getRandomMedicao();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Medicao' failed to provide an identifier", id);
        obj = Medicao.findMedicao(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'Medicao' with identifier '" + id + "'", Medicao.findMedicao(id));
    }
    
}