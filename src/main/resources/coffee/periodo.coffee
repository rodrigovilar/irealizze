class App.FormCriacaoPeriodo extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    @inputDataLimite = App.inputCriacao(@form, "dataLimite", "Data Final", "date")

  montarJSON: ->
    '{ "dataLimite": "' + @inputDataLimite.val() + '", "projeto": ' + @modulo.idObjetoPai + ' }'                


class App.FormEdicaoPeriodo extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    @inputDataLimite = App.inputEdicao(@form, "dataLimite", "Data Final", "date", jsonObj.dataLimite)

  montarJSON: ->
    '{ "dataLimite": "' + @inputDataLimite.val() + '", "projeto": ' + @modulo.idObjetoPai + 
      ', "id": ' + @dados.idItem + ', "version": ' + @dados.versionItem + ' }'                


class App.PaginaDetalhesPeriodo extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
        
        
class App.ModuloPeriodos extends App.SubModulo
  constructor: (@moduloPai) ->
    super('Períodos', 'periodos', 'dataLimite', @moduloPai)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoPeriodo(this)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoPeriodo(this)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesPeriodo(this)  
  
  abrirItem: (idItem) ->
    alert "ver periodo " + idItem

  prepararLinhaListagem: (registro) ->
    App.dataJson2Gui registro[@propriedade]
