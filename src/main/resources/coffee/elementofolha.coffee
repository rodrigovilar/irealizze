class App.FormCriacaoElementoFolha extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    @inputQuantidade = App.inputCriacao(@form, "quantidade", "Quantidade", "text")
    @inputStatus = App.inputCriacao(@form, "status", "Status", "text")

  montarJSON: ->
    '{ "quantidade": ' + @inputQuantidade.val() + ', "status": "' + @inputStatus.val() + '" }' 


class App.FormEdicaoElementoFolha extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    @inputQuantidade = App.inputEdicao(@form, "quantidade", "Quantidade", "text", jsonObj.quantidade)
    @inputStatus = App.inputEdicao(@form, "status", "Status", "text", jsonObj.status)

  montarJSON: ->
    '{ "quantidade": "' + @inputQuantidade.val() + '", "status": "' + @inputStatus.val() + 
      '", "id": ' + @dados.idItem + ', "version": ' + @dados.versionItem + ' }'              


class App.PaginaDetalhesElementoFolha extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"

        
class App.ModuloElementoFolha extends App.SubModulo
  constructor: (@moduloPai) ->
    super('ElementosFolhas', 'elementosfolhas', 'status', @moduloPai)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoElementoFolha(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoElementoFolha(this)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesElementoFolha(this)  
  
  abrirItem: (idItem) ->
    alert "ver elementofolha " + idItem
