package com.nanuvem.irealizze.modelo.perene;

import java.util.Calendar;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

import com.nanuvem.irealizze.util.JSON;


@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Preco {

    @NotNull
    private double valorUnitario;

    @NotNull
    @ManyToOne
    private Item item;

    @NotNull
    @ManyToOne
    private TabelaPreco tabela;
    
    public static Preco fromJsonToPreco(String json) {
    	ObjectMapper objectMapper = new ObjectMapper();
		JsonFactory factory = objectMapper.getJsonFactory();
		
    	try {
			JsonNode precoJSON = objectMapper.readTree(factory.createJsonParser(json));
			Preco preco = new Preco();
			
			if (precoJSON.has("id")) {
				preco.setId(precoJSON.get("id").asLong());
			}

			if (precoJSON.has("version")) {
				preco.setVersion(precoJSON.get("version").asInt());
			}

			if (precoJSON.has("valorUnitario")) {
				preco.setValorUnitario(precoJSON.get("valorUnitario").asDouble());
			}

			if (precoJSON.has("tabela")) {
				TabelaPreco tabela = TabelaPreco.findTabelaPreco(precoJSON.get("tabela").asLong());
				preco.setTabela(tabela);
			}
			
			if (precoJSON.has("item")) {
				Item item = Item.findItem(precoJSON.get("item").asLong());
				preco.setItem(item);
			}
			
			
			return preco;
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
    }
    
    
    
    public String toJson() {
    	ObjectNode noPreco = preco2json(this);
		return noPreco.toString();

    }
    
    private static ObjectNode preco2json(Preco preco) {
		ObjectNode noPreco = JsonNodeFactory.instance.objectNode();
		
		noPreco.put("id", preco.getId());
		noPreco.put("valorUnitario", preco.getValorUnitario());			
		noPreco.put("item", preco.getItem().toJson());
		noPreco.put("version", preco.getVersion());
		noPreco.put("tabela", preco.getTabela().toJson());
		
		return noPreco;
	}
    
    public static String toJsonArray(Collection<Preco> collection) {
    	ArrayNode arrayDePrecos = JsonNodeFactory.instance.arrayNode();

		for (Preco preco : collection) {
			ObjectNode noPreco = preco2json(preco);
			arrayDePrecos.add(noPreco);
		}

    	return arrayDePrecos.toString();

    }

}
