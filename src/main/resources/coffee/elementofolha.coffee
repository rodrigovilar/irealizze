class App.FormEdicaoElementoFolha extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divQuantidade = $('<div>')
    @form.append divQuantidade    
    labelQuantidade = $('<label for="quantidade">Quantidade</label>')        
    @inputQuantidade = $('<input name="quantidade" id="quantidade" placeholder="" value="' + jsonObj.quantidade + '" type="text">')
    divQuantidade.append labelQuantidade
    divQuantidade.append @inputQuantidade
    
    divStatus = $('<div>')
    @form.append divStatus    
    labelStatus = $('<label for="status">Status</label>')        
    @inputStatus = $('<input name="status" id="status" placeholder="" value="' + jsonObj.status + '" type="text">')
    divStatus.append labelStatus
    divStatus.append @inputStatus

  montarJSON: ->
    '{ "quantidade": "' + @inputQuantidade.val() + '", "status": "' + @inputStatus.val() + '", "id": ' + @idItem + ', "version": ' + @versionItem + ' }'              

class App.FormCriacaoElementoFolha extends App.PaginaCriacao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divQuantidade = $('<div>')
    @form.append divQuantidade    
    labelQuantidade = $('<label for="quantidade">Quantidade</label>')        
    @inputQuantidade = $('<input name="quantidade" id="quantidade" placeholder="" value="' + jsonObj.quantidade + '" type="text">')
    divQuantidade.append labelQuantidade
    divQuantidade.append @inputQuantidade
    
    divStatus = $('<div>')
    @form.append divStatus    
    labelStatus = $('<label for="status">Status</label>')        
    @inputStatus = $('<input name="status" id="status" placeholder="" value="' + jsonObj.status + '" type="text">')
    divStatus.append labelStatus
    divStatus.append @inputStatus

  montarJSON: ->
    '{ "quantidade": "' + @inputQuantidade.val() + '", "status": "' + @inputStatus.val() + '", "id": ' + @idItem + ', "version": ' + @versionItem + ' }'              

class App.PaginaDetalhesElementoFolha extends App.PaginaDetalhes
  constructor:(@modulo, @paginaMae)->
    super(@modulo, @paginaMae)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
        
class App.ModuloElementoFolha extends App.SubModulo
  constructor: (@moduloPai) ->
    super('ElementosFolhas', 'elementosfolhas', 'quantidade', 'status', @moduloPai)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoElementoFolha(this, @paginaListagem)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoElementoFolha(this, @paginaListagem)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesElementoFolha(this, @paginaListagem)  
  
  abrirItem: (idItem) ->
    alert "ver elementofolha " + idItem
