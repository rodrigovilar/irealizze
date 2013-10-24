class App.FormCriacaoResponsavel extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    @inputLogin = App.inputCriacao(@form, "login", "Login", "text")

  montarJSON: ->
    "{ 'login': '#{@inputLogin.val()}' }"

    
class App.FormEdicaoResponsavel extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    @inputLogin = App.inputEdicao(@form, "login", "Login", "text", jsonObj.login)

  montarJSON: ->
    "{ 'login': '#{@inputLogin.val()}', 'id': #{@dados.idItem}, 'version': #{@dados.versionItem} }"
    
    
class App.PaginaDetalhesResponsavel extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
     
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
 

class App.ModuloResponsaveis extends App.Modulo
  constructor: (@paginaMae) ->
    super(@paginaMae, 'Responsavel', 'responsaveis', 'login')
    
  criarPaginaEdicao: ->
    new App.FormEdicaoResponsavel(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoResponsavel(this)

  criarPaginaDetalhes: ->
    new App.PaginaDetalhesResponsavel(this)

      