class App.FormEdicaoPeriodo extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divDataLimite = $('<div>')
    @form.append divDataLimite    
    labelDataLimite = $('<label for="dataLimite">DataLimite</label>')        
    @inputDataLimite = $('<input name="dataLimite" id="dataLimite" placeholder="" value="' + jsonObj.dataLimite + '" type="text">')
    divDataLimite.append labelDataLimite
    divDataLimite.append @inputDataLimite

    divProjeto = $('<div>')
    @form.append divProjeto    
    labelProjeto = $('<label for="projeto">Projeto</label>')        
    @inputProjeto = $('<input name="projeto" id="projeto" placeholder="" value="' + jsonObj.cliente + '" type="text">')
    divProjeto.append labelProjeto
    divProjeto.append @inputProjeto

  montarJSON: ->
    '{ "dataLimite": "' + @inputDataLimite.val() + '", "projeto": ' + @inputProjeto.val() + 
      ', "id": ' + @idItem + ', "version": ' + @versionItem + ' }'                

class App.FormCriacaoPeriodo extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    divDataLimite = $('<div>')
    @form.append divDataLimite    
    labelDataLimite = $('<label for="dataLimite">DataLimite</label>')        
    @inputDataLimite = $('<input name="dataLimite" id="dataLimite" placeholder="" value="" type="date">')
    divDataLimite.append labelDataLimite
    divDataLimite.append @inputDataLimite

  montarJSON: ->
    '{ "dataLimite": "' + @inputDataLimite.val() + '", "projeto": ' + @modulo.idObjetoPai + ' }'                

class App.PaginaDetalhesPeriodo extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
        
class App.ModuloPeriodos extends App.SubModulo
  constructor: (@moduloPai) ->
    super('Periodos', 'periodos', 'dataLimite', @moduloPai)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoPeriodo(this, @paginaListagem)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoPeriodo(this, @paginaListagem)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesPeriodo(this, @paginaListagem)  
  
  abrirItem: (idItem) ->
    alert "ver periodo " + idItem

  prepararLinhaListagem: (registro) ->
    formatoAAAAMMDD = registro[@propriedade]
    formatoDDMMAAAA = formatoAAAAMMDD.split('-').reverse().join('/')
    return formatoDDMMAAAA
