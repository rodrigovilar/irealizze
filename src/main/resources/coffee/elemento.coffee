class App.FormCriacaoElemento extends App.PaginaCriacao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: () ->
    @inputNome = App.inputCriacao(@form, "nome", "Nome", "text")

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "projeto": ' + @modulo.idObjetoPai + ' }'              


class App.FormEdicaoElemento extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    @inputNome = App.inputEdicao(@form, "nome", "Nome", "text", jsonObj.nome)

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "projeto": ' + @modulo.idObjetoPai + 
      ', "id": ' + @dados.idItem + ', "version": ' + @dados.versionItem + ' }'              


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
    new App.FormEdicaoElemento(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoElemento(this)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesElemento(this)
