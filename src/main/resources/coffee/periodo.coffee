class App.FormCriacaoPeriodo extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    divDataLimite = $('<div>')
    @form.append divDataLimite    
    labelDataLimite = $('<label for="dataLimite">Data Final</label>')        
    @inputDataLimite = $('<input name="dataLimite" id="dataLimite" value="" type="date">')
    divDataLimite.append labelDataLimite
    divDataLimite.append @inputDataLimite

  montarJSON: ->
    '{ "dataLimite": "' + @inputDataLimite.val() + '", "projeto": ' + @modulo.idObjetoPai + ' }'                


class App.FormEdicaoPeriodo extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divDataLimite = $('<div>')
    @form.append divDataLimite    
    labelDataLimite = $('<label for="dataLimite">Data Final</label>')        
    @inputDataLimite = $('<input name="dataLimite" id="dataLimite" value="' + jsonObj.dataLimite + '" type="date">')
    divDataLimite.append labelDataLimite
    divDataLimite.append @inputDataLimite

  montarJSON: ->
    '{ "dataLimite": "' + @inputDataLimite.val() + '", "projeto": ' + @modulo.idObjetoPai + 
      ', "id": ' + @idItem + ', "version": ' + @versionItem + ' }'                


class App.PaginaDetalhesPeriodo extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
        
        
class App.ModuloPeriodos extends App.SubModulo
  constructor: (@moduloPai) ->
    super('Períodos', 'periodos', 'dataLimite', @moduloPai)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoPeriodo(this, @paginaListagem)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoPeriodo(this, @paginaListagem)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesPeriodo(this, @paginaListagem)  
  
  abrirItem: (idItem) ->
    alert "ver periodo " + idItem

  prepararLinhaListagem: (registro) ->
    return App.dataJson2Gui registro[@propriedade]
