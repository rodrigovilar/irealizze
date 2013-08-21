package com.nanuvem.irealizze.modelo;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.JsonNodeFactory;
import org.codehaus.jackson.node.ObjectNode;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Elemento {

    @NotNull
    private String nome;

    @NotNull
    @ManyToOne
    private Projeto projeto;

    @ManyToOne
    private Elemento pai;
    
    @NotNull
    private int sequencia;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pai")
    private Set<Elemento> filhos = new HashSet<Elemento>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pai")
    private Set<ElementoFolha> folhas = new HashSet<ElementoFolha>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "elemento")
    private Set<Alocacao> alocacoes = new HashSet<Alocacao>();
    
    public String toJson() {
		ObjectNode noElemento = elemento2json(this);
		return noElemento.toString();
    }
    
    public static Elemento fromJsonToElemento(String json) {
    	ObjectMapper objectMapper = new ObjectMapper();
		JsonFactory factory = objectMapper.getJsonFactory();
		
    	try {
			JsonNode elementoJSON = objectMapper.readTree(factory.createJsonParser(json));
			Elemento elemento = new Elemento();
			
			if (elementoJSON.has("id")) {
				elemento.setId(elementoJSON.get("id").asLong());
			}

			if (elementoJSON.has("version")) {
				elemento.setVersion(elementoJSON.get("version").asInt());
			}

			elemento.setNome(elementoJSON.get("nome").asText());

			if (elementoJSON.has("projeto")) {
				Projeto projeto = Projeto.findProjeto(elementoJSON.get("projeto").asLong());
				elemento.setProjeto(projeto);

				if (elementoJSON.has("sequencia")) {
					elemento.setVersion(elementoJSON.get("sequencia").asInt());

				} else {
					//TODO implementacao temporaria
					elemento.setSequencia(projeto.getElementosRaiz().size() + 1);
				}

			}
			
			return elemento;
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
    }
    
    public static String toJsonArray(Collection<Elemento> collection) {
    	ArrayNode arrayDeElementos = JsonNodeFactory.instance.arrayNode();

		for (Elemento elemento : collection) {
			ObjectNode noelemento = elemento2json(elemento);
			arrayDeElementos.add(noelemento);
		}

    	return arrayDeElementos.toString();
    }
    
    private static ObjectNode elemento2json(Elemento elemento) {
		ObjectNode noElemento = JsonNodeFactory.instance.objectNode();
		
		noElemento.put("id", elemento.getId());
		noElemento.put("nome", elemento.getNome());			
		noElemento.put("projeto", elemento.getProjeto().getId());
		noElemento.put("version", elemento.getVersion());
		
		return noElemento;
	}


}
