package com.nanuvem.irealizze.modelo;

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
public class Periodo {

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "S-")
    private Calendar dataLimite;

    @NotNull
    @ManyToOne
    private Projeto projeto;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "periodo")
    private Set<Alocacao> alocacoes = new HashSet<Alocacao>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "periodo")
    private Set<Medicao> medicoes = new HashSet<Medicao>();
    
    public static Periodo fromJsonToPeriodo(String json) {
    	ObjectMapper objectMapper = new ObjectMapper();
		JsonFactory factory = objectMapper.getJsonFactory();
		
    	try {
			JsonNode periodoJSON = objectMapper.readTree(factory.createJsonParser(json));
			Periodo periodo = new Periodo();
			
			if (periodoJSON.has("id")) {
				periodo.setId(periodoJSON.get("id").asLong());
			}

			if (periodoJSON.has("version")) {
				periodo.setVersion(periodoJSON.get("version").asInt());
			}

			periodo.setDataLimite(JSON.extractCalendar(periodoJSON, "dataLimite"));

			if (periodoJSON.has("projeto")) {
				Projeto projeto = Projeto.findProjeto(periodoJSON.get("projeto").asLong());
				periodo.setProjeto(projeto);
			}
			
			return periodo;
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
    }
    
    public String toJson() {
		ObjectNode noPeriodo = periodo2json(this);
		return noPeriodo.toString();
    }
    
    private static ObjectNode periodo2json(Periodo periodo) {
		ObjectNode noPeriodo = JsonNodeFactory.instance.objectNode();
		
		noPeriodo.put("id", periodo.getId());
		noPeriodo.put("dataLimite", JSON.generateString(periodo.getDataLimite()));			
		noPeriodo.put("projeto", periodo.getProjeto().getId());
		noPeriodo.put("version", periodo.getVersion());
		
		return noPeriodo;
	}

    
    public static String toJsonArray(Collection<Periodo> collection) {
    	ArrayNode arrayDePeriodos = JsonNodeFactory.instance.arrayNode();

		for (Periodo periodo : collection) {
			ObjectNode noPeriodo = periodo2json(periodo);
			arrayDePeriodos.add(noPeriodo);
		}

    	return arrayDePeriodos.toString();
    }
    

}
