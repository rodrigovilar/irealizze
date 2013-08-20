class App.FormEdicaoProjeto extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div data-role="fieldcontain">')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">')
                
    divNome.append labelNome
    divNome.append @inputNome

    divCliente = $('<div data-role="fieldcontain">')
    @form.append divCliente    
    labelCliente = $('<label for="cliente">Cliente</label>')        
    @inputCliente = $('<input name="cliente" id="cliente" placeholder="" value="' + jsonObj.cliente + '" type="text">')
                
    divNome.append labelCliente
    divNome.append @inputCliente

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'cliente': '#{@inputCliente.val()}', 'id': #{@idItem}, 'version': #{@versionItem} }"                

class App.FormCriacaoProjeto extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    divNome = $('<div data-role="fieldcontain">')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">')
                
    divNome.append labelNome
    divNome.append @inputNome

    divCliente = $('<div data-role="fieldcontain">')
    @form.append divCliente    
    labelCliente = $('<label for="cliente">Cliente</label>')        
    @inputCliente = $('<input name="cliente" id="cliente" placeholder="" value="" type="text">')
                
    divNome.append labelCliente
    divNome.append @inputCliente

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'cliente': '#{@inputCliente.val()}' }"                


class App.PaginaDetalhesProjeto extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
    
    botaoPeriodos = $('<a data-role="button" data-inline="true" href="#' + @modulo.moduloPeriodo.paginaListagem.getId() + '" data-icon="create" data-iconpos="left">Per�odos</a>')
    @content.append botaoPeriodos
    botaoPeriodos.click =>
      @modulo.moduloPeriodo.abrir(registro.id)
    
    
  montarJSON: ->
    "{ 'periodo do projeto', 'periodos': '#{@inputPeriodos.val()}' }"

class App.ModuloProjetos extends App.Modulo
  constructor: () ->
    super('Projetos', '/projetos', 'nome')
    @moduloPeriodo = new App.ModuloPeriodos(this)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoProjeto(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoProjeto(this)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesProjeto(this)