class App.FormCriacaoProjeto extends App.PaginaCriacao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: () ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">')
    divNome.append labelNome
    divNome.append @inputNome

    divCliente = $('<div>')
    @form.append divCliente    
    labelCliente = $('<label for="cliente">Cliente</label>')        
    @inputCliente = $('<input name="cliente" id="cliente" placeholder="" value="" type="text">')
    divNome.append labelCliente
    divNome.append @inputCliente

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'cliente': '#{@inputCliente.val()}' }"                


class App.FormEdicaoProjeto extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">')
    divNome.append labelNome
    divNome.append @inputNome

    divCliente = $('<div>')
    @form.append divCliente    
    labelCliente = $('<label for="cliente">Cliente</label>')        
    @inputCliente = $('<input name="cliente" id="cliente" placeholder="" value="' + jsonObj.cliente + '" type="text">')
    divNome.append labelCliente
    divNome.append @inputCliente

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'cliente': '#{@inputCliente.val()}', 'id': #{@idItem}, 'version': #{@versionItem} }"                


class App.PaginaDetalhesProjeto extends App.PaginaDetalhes
  constructor:(@modulo, @paginaMae)->
    super(@modulo, @paginaMae)
  
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
    
  criarPaginaEdicao: ->
    new App.FormEdicaoProjeto(this, @paginaListagem)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoProjeto(this, @paginaListagem)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesProjeto(this, @paginaListagem)