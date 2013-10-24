class App.FormCriacaoTipoItem extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    @inputNome = App.inputCriacao(@form, "nome", "Nome", "text")

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}' }"                


class App.FormEdicaoTipoItem extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    @inputNome = App.inputEdicao(@form, "nome", "Nome", "text", jsonObj.nome)

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'id': #{@dados.idItem}, 'version': #{@dados.versionItem} }"         

    
class App.PaginaDetalhesTipoItem extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
    
    App.desenharBotao @pagina, 'Itens', =>
      @modulo.moduloItem.abrir(registro.id)


class App.ModuloTipoItem extends App.Modulo
  constructor: (@paginaMae) ->
    super(@paginaMae, 'TipoItem', 'tipositens', 'nome')
    @moduloItem = new App.ModuloItem(this)
        
  criarPaginaEdicao: ->
    new App.FormEdicaoTipoItem(this)

  criarPaginaCriacao: ->
    new App.FormCriacaoTipoItem(this)   
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesTipoItem(this)
