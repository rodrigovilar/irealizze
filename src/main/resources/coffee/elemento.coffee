class App.FormEdicaoElemento extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div data-role="fieldcontain">')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">')
                
    divNome.append labelNome
    divNome.append @inputNome

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "projeto": ' + @modulo.idObjetoPai + 
      ', "id": ' + @idItem + ', "version": ' + @versionItem + ' }'              


class App.FormCriacaoElemento extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    divNome = $('<div data-role="fieldcontain">')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">')
                
    divNome.append labelNome
    divNome.append @inputNome

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "projeto": ' + @modulo.idObjetoPai + ' }'              


class App.PaginaDetalhesElemento extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
        

class App.ModuloElementos extends App.SubModulo
  constructor: (@moduloPai) ->
    super('Elementos', 'elementos', 'nome', @moduloPai)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoElemento(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoElemento(this)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesElemento(this)  
  
  abrirItem: (idItem) ->
    alert "ver elemento " + idItem
