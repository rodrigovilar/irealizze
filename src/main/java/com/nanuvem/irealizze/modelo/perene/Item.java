package com.nanuvem.irealizze.modelo.perene;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class Item {

	@NotNull
	@Column(unique = true)
	private String nome;

	private String unidade;

	@NotNull
	@ManyToOne
	private TipoItem tipo;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "item")
	private Set<Preco> precos = new HashSet<Preco>();

	@Transactional
	public void persist() {
		if (this.entityManager == null)
			this.entityManager = entityManager();
		this.entityManager.persist(this);

		List<TabelaPreco> tabelas = TabelaPreco.findAllTabelaPrecoes();
		for (TabelaPreco tabelaPreco : tabelas) {
			Preco preco = new Preco();
			preco.setItem(this);
			preco.setTabela(tabelaPreco);
			preco.setValorUnitario(0.0);
			preco.persist();
		}

	}

	public static Item fromJsonToItem(String json) {
		ObjectMapper objectMapper = new ObjectMapper();
		JsonFactory factory = objectMapper.getJsonFactory();

		try {
			JsonNode itemJSON = objectMapper.readTree(factory
					.createJsonParser(json));
			Item item = new Item();

			if (itemJSON.has("id")) {
				item.setId(itemJSON.get("id").asLong());
			}

			if (itemJSON.has("version")) {
				item.setVersion(itemJSON.get("version").asInt());
			}

			if (itemJSON.has("nome")) {
				item.setNome(itemJSON.get("nome").asText());
			}

			if (itemJSON.has("unidade")) {
				item.setUnidade(itemJSON.get("unidade").asText());
			}

			if (itemJSON.has("tipoitem")) {
				TipoItem tipoitem = TipoItem.findTipoItem(itemJSON.get(
						"tipoitem").asLong());
				item.setTipo(tipoitem);
			}

			return item;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public String toJson() {
		ObjectNode noItem = item2json(this);
		return noItem.toString();
	}

	public static ObjectNode item2json(Item item) {
		ObjectNode noItem = JsonNodeFactory.instance.objectNode();

		noItem.put("id", item.getId());
		noItem.put("nome", item.getNome());
		noItem.put("unidade", item.getUnidade());
		noItem.put("tipoitem", item.getTipo().getId());
		noItem.put("version", item.getVersion());

		return noItem;
	}

	public static String toJsonArray(Collection<Item> collection) {
		ArrayNode arrayDeItens = JsonNodeFactory.instance.arrayNode();

		for (Item item : collection) {
			ObjectNode noItem = item2json(item);
			arrayDeItens.add(noItem);
		}

		return arrayDeItens.toString();
	}

}
