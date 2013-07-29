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
    
class App.PaginaDetalhesResponsavel extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
     
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
        
    botaoResponsavel = $('<a data-role="button" data-inline="true" href="#' + @modulo.moduloResponsavel.paginaListagem.getId() + '" data-icon="create" data-iconpos="left">Responsavel</a>')
    @content.append botaoResponsavel
    botaoResponsavel.click =>
      @modulo.moduloResponsavel.abrir(registro.id)
    
    
  montarJSON: ->
    "{ 'periodo do projeto', 'periodos': '#{@inputPeriodos.val()}' }"
 

class App.ModuloResponsaveis extends App.Modulo
  constructor: () ->
    super('Responsavel', 'responsaveis', 'login')
    
  criarPaginaEdicao: ->
    new App.FormEdicaoResponsavel(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoResponsavel(this)  