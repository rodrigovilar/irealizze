class App.FormCriacaoProjeto extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    @inputNome = App.inputCriacao(@form, "nome", "Nome", "text")
    @inputCliente = App.inputCriacao(@form, "cliente", "Cliente", "text")

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'cliente': '#{@inputCliente.val()}' }"                


class App.FormEdicaoProjeto extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    @inputNome = App.inputEdicao(@form, "nome", "Nome", "text", jsonObj.nome)
    @inputCliente = App.inputEdicao(@form, "cliente", "Cliente", "text", jsonObj.cliente)

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'cliente': '#{@inputCliente.val()}', 'id': #{@dados.idItem}, 'version': #{@dados.versionItem} }"                


class App.PaginaDetalhesProjeto extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
    
    App.desenharBotao @pagina, 'Períodos', =>
      @modulo.moduloPeriodo.abrir(registro.id)

    App.desenharBotao @pagina, 'Elementos', =>
      @modulo.moduloElemento.abrir(registro.id)
    
    
class App.ModuloProjetos extends App.Modulo
  constructor: (@paginaMae) ->
    super(@paginaMae, 'Projetos', 'projetos', 'nome')
    @moduloPeriodo = new App.ModuloPeriodos(this)
    @moduloElemento = new App.ModuloElementos(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoProjeto(this)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoProjeto(this)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesProjeto(this)
