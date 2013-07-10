class App.FormCriacaoResponsavel extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    divLogin = $('<div data-role="fieldcontain">')
    @form.append divLogin    
    labelLogin = $('<label for="login">Login</label>')        
    @inputLogin = $('<input name="login" id="login" placeholder="" value="" type="text">')
                
    divLogin.append labelLogin
    divLogin.append @inputLogin

  montarJSON: ->
    "{ 'login': '#{@inputLogin.val()}' }"
    
class App.FormEdicaoResponsavel extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    divLogin = $('<div data-role="fieldcontain">')
    @form.append divLogin    
    labelLogin = $('<label for="login">Login</label>')        
    @inputLogin = $('<input name="login" id="login" placeholder="" value="' + jsonObj.login + '" type="text">')
                
    divLogin.append labelLogin
    divLogin.append @inputLogin

  montarJSON: ->
    "{ 'login': '#{@inputLogin.val()}', 'id': #{@idItem}, 'version': #{@versionItem} }"
    
class App.ModuloResponsaveis extends App.Modulo
  constructor: (@lista) ->
    super(@lista, 'Responsavel', 'responsaveis', 'login')
    
  criarPaginaEdicao: ->
    new App.FormEdicaoResponsavel(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoResponsavel(this)
