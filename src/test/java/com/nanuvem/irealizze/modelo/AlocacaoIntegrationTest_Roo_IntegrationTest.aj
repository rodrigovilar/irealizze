// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nanuvem.irealizze.modelo;

import com.nanuvem.irealizze.modelo.Alocacao;
import com.nanuvem.irealizze.modelo.AlocacaoDataOnDemand;
import com.nanuvem.irealizze.modelo.AlocacaoIntegrationTest;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect AlocacaoIntegrationTest_Roo_IntegrationTest {
    
    declare @type: AlocacaoIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: AlocacaoIntegrationTest: @ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml");
    
    declare @type: AlocacaoIntegrationTest: @Transactional;
    
    @Autowired
    AlocacaoDataOnDemand AlocacaoIntegrationTest.dod;
    
    @Test
    public void AlocacaoIntegrationTest.testCountAlocacaos() {
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", dod.getRandomAlocacao());
        long count = Alocacao.countAlocacaos();
        Assert.assertTrue("Counter for 'Alocacao' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void AlocacaoIntegrationTest.testFindAlocacao() {
        Alocacao obj = dod.getRandomAlocacao();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to provide an identifier", id);
        obj = Alocacao.findAlocacao(id);
        Assert.assertNotNull("Find method for 'Alocacao' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Alocacao' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void AlocacaoIntegrationTest.testFindAllAlocacaos() {
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", dod.getRandomAlocacao());
        long count = Alocacao.countAlocacaos();
        Assert.assertTrue("Too expensive to perform a find all test for 'Alocacao', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Alocacao> result = Alocacao.findAllAlocacaos();
        Assert.assertNotNull("Find all method for 'Alocacao' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Alocacao' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void AlocacaoIntegrationTest.testFindAlocacaoEntries() {
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", dod.getRandomAlocacao());
        long count = Alocacao.countAlocacaos();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Alocacao> result = Alocacao.findAlocacaoEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Alocacao' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Alocacao' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void AlocacaoIntegrationTest.testFlush() {
        Alocacao obj = dod.getRandomAlocacao();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to provide an identifier", id);
        obj = Alocacao.findAlocacao(id);
        Assert.assertNotNull("Find method for 'Alocacao' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyAlocacao(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'Alocacao' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void AlocacaoIntegrationTest.testMergeUpdate() {
        Alocacao obj = dod.getRandomAlocacao();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to provide an identifier", id);
        obj = Alocacao.findAlocacao(id);
        boolean modified =  dod.modifyAlocacao(obj);
        Integer currentVersion = obj.getVersion();
        Alocacao merged = obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'Alocacao' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void AlocacaoIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", dod.getRandomAlocacao());
        Alocacao obj = dod.getNewTransientAlocacao(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Alocacao' identifier to be null", obj.getId());
        obj.persist();
        obj.flush();
        Assert.assertNotNull("Expected 'Alocacao' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void AlocacaoIntegrationTest.testRemove() {
        Alocacao obj = dod.getRandomAlocacao();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Alocacao' failed to provide an identifier", id);
        obj = Alocacao.findAlocacao(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'Alocacao' with identifier '" + id + "'", Alocacao.findAlocacao(id));
    }
    
}
