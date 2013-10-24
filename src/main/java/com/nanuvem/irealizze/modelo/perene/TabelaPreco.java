package com.nanuvem.irealizze.modelo.perene;

import java.util.Calendar;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.transaction.annotation.Transactional;

import com.nanuvem.irealizze.modelo.Periodo;
import com.nanuvem.irealizze.modelo.Projeto;
import com.nanuvem.irealizze.util.JSON;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson
public class TabelaPreco {

	@NotNull
	private String nome;

	@Value("false")
	private Boolean vigente;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
	private Calendar inicioVigencia;

	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
	private Calendar fimVigencia;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "tabela")
	private Set<Preco> precos = new HashSet<Preco>();

	@Transactional
	public void persist() {
		if (this.entityManager == null)
			this.entityManager = entityManager();
		this.entityManager.persist(this);

		List<Item> items = Item.findAllItems();// zerando o preço de todos os
												// itens
		for (Item item : items) {
			Preco preco = new Preco();
			preco.setItem(item);
			preco.setTabela(this);
			preco.setValorUnitario(0.0);
			preco.persist();
		}
	}

	public String toJson() {
		ObjectNode noTabela = tabela2json(this, true);
		return noTabela.toString();
	}

	public static ObjectNode tabela2json(TabelaPreco tabela, boolean comPreco) {
		ObjectNode noTabela = JsonNodeFactory.instance.objectNode();

		noTabela.put("id", tabela.getId());
		noTabela.put("nome", tabela.getNome());
		noTabela.put("version", tabela.getVersion());

		if (tabela.getInicioVigencia() != null) {
			noTabela.put("inicioVigencia",
					JSON.generateString(tabela.getInicioVigencia()));
		}

		if (tabela.getFimVigencia() != null) {
			noTabela.put("fimVigencia",
					JSON.generateString(tabela.getFimVigencia()));
		}
		
		if (comPreco) {
			noTabela.put("precos", Preco.toJson(tabela.getPrecos()));
		}

		return noTabela;
	}

	public static TabelaPreco fromJsonToTabelaPreco(String json) {
		ObjectMapper objectMapper = new ObjectMapper();
		JsonFactory factory = objectMapper.getJsonFactory();

		try {
			JsonNode tabelaJSON = objectMapper.readTree(factory
					.createJsonParser(json));
			TabelaPreco tabela = new TabelaPreco();

			if (tabelaJSON.has("id")) {
				tabela.setId(tabelaJSON.get("id").asLong());
			}

			if (tabelaJSON.has("version")) {
				tabela.setVersion(tabelaJSON.get("version").asInt());
			}

			if (tabelaJSON.has("nome")) {
				tabela.setNome(tabelaJSON.get("nome").asText());
			}

			tabela.setInicioVigencia(
					JSON.extractCalendar(tabelaJSON, "inicioVigencia"));
			tabela.setFimVigencia(
					JSON.extractCalendar(tabelaJSON, "fimVigencia"));

			return tabela;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static String toJsonArray(Collection<TabelaPreco> collection) {
		ArrayNode arrayDeTabelas = JsonNodeFactory.instance.arrayNode();

		for (TabelaPreco tabela : collection) {
			ObjectNode noPeriodo = tabela2json(tabela, false);
			arrayDeTabelas.add(noPeriodo);
		}

		return arrayDeTabelas.toString();
	}

}
