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

import com.nanuvem.irealizze.modelo.perene.Item;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class ElementoFolha {

	@NotNull
	@ManyToOne
	private Elemento pai;

	@ManyToOne
	private Item item;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "elementoFolha")
	private Set<Medicao> medicoes = new HashSet<Medicao>();

	public String toJson() {
		ObjectNode noElementoFolha = elementofolha2json(this);
		return noElementoFolha.toString();
	}

	public static ElementoFolha fromJsonToElementoFolha(String json) {
		ObjectMapper objectMapper = new ObjectMapper();
		JsonFactory factory = objectMapper.getJsonFactory();

		try {
			JsonNode elementofolhaJSON = objectMapper.readTree(factory
					.createJsonParser(json));
			ElementoFolha elementofolha = new ElementoFolha();

			if (elementofolhaJSON.has("id")) {
				elementofolha.setId(elementofolhaJSON.get("id").asLong());
			}

			if (elementofolhaJSON.has("version")) {
				elementofolha.setVersion(elementofolhaJSON.get("version").asInt());
			}

			if (elementofolhaJSON.has("pai")) {
				Elemento elemento = Elemento.findElemento(elementofolhaJSON
						.get("pai").asLong());
				elementofolha.setPai(elemento);
			}

			if (elementofolhaJSON.has("item")) {
				Item item = Item.findItem(elementofolhaJSON.get("item")
						.asLong());
				elementofolha.setItem(item);

			}

			return elementofolha;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static String toJsonArray(Collection<ElementoFolha> collection) {
		ArrayNode arrayDeElementosFolhas = JsonNodeFactory.instance.arrayNode();

		for (ElementoFolha elementofolha : collection) {
			ObjectNode noelementofolha = elementofolha2json(elementofolha);
			arrayDeElementosFolhas.add(noelementofolha);
		}

		return arrayDeElementosFolhas.toString();
	}

	private static ObjectNode elementofolha2json(ElementoFolha elementofolha) {
		ObjectNode noElementoFolha = JsonNodeFactory.instance.objectNode();

		noElementoFolha.put("id", elementofolha.getId());
		noElementoFolha.put("pai", elementofolha.getPai().getId());
		noElementoFolha.put("item", elementofolha.getItem().getId());
		noElementoFolha.put("version", elementofolha.getVersion());

		return noElementoFolha;
	}

}
