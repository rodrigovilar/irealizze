class App.FormCriacaoResponsavel extends App.PaginaCriacao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: () ->
    divLogin = $('<div>')
    @form.append divLogin    
    labelLogin = $('<label for="login">Login</label>')        
    @inputLogin = $('<input name="login" id="login" placeholder="" value="" type="text">')
    divLogin.append labelLogin
    divLogin.append @inputLogin

  montarJSON: ->
    "{ 'login': '#{@inputLogin.val()}' }"
    
class App.FormEdicaoResponsavel extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divLogin = $('<div>')
    @form.append divLogin    
    labelLogin = $('<label for="login">Login</label>')        
    @inputLogin = $('<input name="login" id="login" placeholder="" value="' + jsonObj.login + '" type="text">')
    divLogin.append labelLogin
    divLogin.append @inputLogin

  montarJSON: ->
    "{ 'login': '#{@inputLogin.val()}', 'id': #{@idItem}, 'version': #{@versionItem} }"
    
class App.PaginaDetalhesResponsavel extends App.PaginaDetalhes
  constructor:(@modulo, @paginaMae)->
    super(@modulo, @paginaMae)
     
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
 

class App.ModuloResponsaveis extends App.Modulo
  constructor: () ->
    super('Responsavel', 'responsaveis', 'login')
    
  criarPaginaEdicao: ->
    new App.FormEdicaoResponsavel(this, @paginaListagem)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoResponsavel(this, @paginaListagem)  