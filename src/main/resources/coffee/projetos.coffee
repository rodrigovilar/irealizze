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
    "{ 'nome': '#{@inputNome.val()}', 'cliente': '#{@inputCliente.val()}' }"                

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




class App.ModuloProjetos extends App.Modulo
  constructor: (@lista) ->
    super(@lista, 'Projetos', 'projetos', 'nome')
    
  criarPaginaEdicao: ->
    new App.FormEdicaoProjeto(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoProjeto(this)
  
  abrirItem: (idItem) ->
      alert "ver projeto " + idItem
