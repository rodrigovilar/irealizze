class App.FormEdicaoElemento extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">')
    divNome.append labelNome
    divNome.append @inputNome

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "projeto": ' + @modulo.idObjetoPai + 
      ', "id": ' + @idItem + ', "version": ' + @versionItem + ' }'              


class App.FormCriacaoElemento extends App.PaginaCriacao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: () ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">')
    divNome.append labelNome
    divNome.append @inputNome

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "projeto": ' + @modulo.idObjetoPai + ' }'              


class App.PaginaDetalhesElemento extends App.PaginaDetalhes
  constructor:(@modulo, @paginaMae)->
    super(@modulo, @paginaMae)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
    
    App.desenharBotao @pagina, 'ElementosFolhas', =>
      @modulo.moduloElementoFolha.abrir(registro.id)
        

class App.ModuloElementos extends App.SubModulo
  constructor: (@moduloPai) ->
    super('Elementos', 'elementos', 'nome', @moduloPai)
    @moduloElementoFolha = new App.ModuloElementoFolha(this)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoElemento(this, @paginaListagem)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoElemento(this, @paginaListagem)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesElemento(this, @paginaListagem)