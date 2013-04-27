atualizarGUI = (page) ->
  page.trigger('create')

class Pagina
  constructor: (@url, @urlMae) ->
    @myId = "pagina"
    body  = $("body")
    @page = $('<div data-role="page" data-theme="a" id="' + this.getId() + '">"')
    @header = $('<div data-role="header" data-theme="a"><h1>iRealizze</h1></div>')
    @content = $('<div data-role="content" data-theme="a" id="' + this.getId() + 'content">')
    @footer = $('<div data-role="footer" data-theme="a"><h4>Realizzare Empreendimentos Imobiliários LTDA</h4></div>')  
  
    body.append @page
    @page.append @header
    @page.append @content
    @page.append @footer
    
    @page.page()
    
  getId: ->
    "pagina" + @url
    
  atualizar: ->
    atualizarGUI @page

  desenharConteudo: ->
    this.desenharBotaoVoltar()
        
  desenharBotaoVoltar: ->
    @content.append $('<a data-role="button" data-inline="true" href="#' + 
      @urlMae + '" data-icon="arrow-l" data-iconpos="left">Voltar</a>')

  enviarPut: (link, json, callback)=>
    dadosAjax = 
      type: "PUT"
      url: link
      data: json
      processData: true
      contentType: "application/json"
      headers: 
        Accept: "application/json"
    
    request = $.ajax(dadosAjax)
    request.always =>
        callback()
    
  
class PaginaListagem extends Pagina
  constructor: (@url, @urlMae, @titulo) ->
    super(@url, @urlMae)

  desenharConteudo: ->
    @content.empty()
    @lista = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">')
    @content.append @lista
    
    @lista.append $('<li data-role="list-divider" role="heading">' + @titulo + '</li>')
    this.desenharBotaoVoltar()
    this.atualizar()

class PaginaEdicao extends Pagina
  constructor: (@url, @titulo, @modulo) ->
    super(@url, @modulo.paginaListagem.getId())
    @form = $('<form>')
    @content.append @form
    this.desenharBotaoVoltar()
    
  getId: ->
    "edicao" + @url

  desenharConteudo: ->
    @form.empty()    
    
  abrir: (@idItem) ->
    this.desenharConteudo()    
    $.getJSON @url + "/" + @idItem, (jsonObj) =>
      this.desenharConteudoForm(jsonObj)
      this.desenharBotaoSalvar()      
      this.atualizar()

  desenharConteudoForm: (jsonObj) ->

  desenharBotaoSalvar: ->
    submit = $('<a href="#' + @urlMae +
      '" data-role="button" data-inline="true" data-icon="arrow-l" data-iconpos="left">Salvar</a>')       
    @form.append submit
    submit.click =>
      this.salvar()
    
  salvar: =>
    json = this.montarJSON()        
    this.enviarPut @url + "/" + @idItem, json, =>
        @modulo.abrir()
        
  montarJSON: ->
    "{}"   


class FormEdicaoProjeto extends PaginaEdicao
  constructor: (@url, @titulo, @modulo) ->
    super(@url, @titulo, @modulo)
    
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

    
class Modulo
  constructor: (@lista, @nome, @url, @propriedade) ->
    @paginaListagem = new PaginaListagem(@url, "#principal", @nome)
    @paginaEdicao = new PaginaEdicao(@url, @nome, this)
  
  abrir: ->
    @paginaListagem.desenharConteudo()
    $.getJSON @url, (jsonObj) =>
      $.each jsonObj, (i, registro) =>
        this.listar(registro)
      @paginaListagem.lista.listview('refresh')
    
  listar: (registro) ->
    ver = $("<a href='#'>#{registro[@propriedade]}</a>")
    editar = $("<a href='#" + @paginaEdicao.getId() + "' data-transition='slide'>Editar</a>")
    li = $("<li data-theme='c' data-icon='edit'>")
    li.append ver
    li.append editar
    @paginaListagem.lista.append li
    ver.click =>
      this.abrirItem(registro.id)
    editar.click =>
      this.editarItem(registro.id)
  
  abrirItem: (idItem) ->
    alert "ver " + idItem
  
  editarItem: (idItem) ->
    @paginaEdicao.abrir(idItem)


class ModuloProjetos extends Modulo
  constructor: (@lista) ->
    super(@lista, 'Projetos', 'projetos', 'nome')
    @paginaEdicao = new FormEdicaoProjeto(@url, @nome, this)
    
  abrirItem: (idItem) ->
      alert "ver projeto " + idItem
  
  editarItem: (idItem) ->
    @paginaEdicao.abrir(idItem)
  
addMenu = (menu, modulo) ->
  item = $('<li data-theme="c"><a href="#pagina' + modulo.url + '" data-transition="slide">' + modulo.nome + '</a></li>')
  menu.append item
  item.click -> 
    modulo.abrir()

abrirTelaPrincipal = ->
  content  = $("div[data-role='content']")
  content.empty()
  
  menu = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">') 
  content.append menu
  menu.append('<li data-role="list-divider" role="heading">Módulos</li>')

  addMenu(menu, new ModuloProjetos content)
  addMenu(menu, new Modulo content, 'Responsáveis', 'responsaveis', 'login')
  addMenu(menu, new Modulo content, 'Itens', 'tipositens', 'nome')
  addMenu(menu, new Modulo content, 'Preço', 'tabelasprecos', 'nome')
  
iniciar = ->
  abrirTelaPrincipal()
  $("#principal").page()
  
$ -> 
  iniciar()
  atualizarGUI($('#principal'))