window.App={}


App.atualizarGUI = (page) ->
  page.trigger('create')


class App.Pagina

  constructor: (@modulo, @idMae) ->
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
    "pagina" + @modulo.url
    
  atualizar: ->
    App.atualizarGUI @page

  desenharConteudo: ->
    this.desenharBotaoVoltar()
        
  desenharBotaoVoltar: ->
    @content.append $('<a data-role="button" data-inline="true" href="#' + 
      @idMae + '" data-icon="arrow-l" data-iconpos="left">Voltar</a>')

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
    
  enviarPost: (link, json, callback)=>
    dadosAjax = 
      type: "POST"
      url: link
      data: json
      processData: true
      contentType: "application/json"
      headers: 
        Accept: "application/json"
    
    request = $.ajax(dadosAjax)
    request.always =>
        callback()
  

class App.PaginaListagem extends App.Pagina

  constructor: (@modulo, @idMae) ->
    super(@modulo, @idMae)

  desenharConteudo: (linkGet) ->
    @content.empty()
    @lista = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">')
    @content.append @lista
    
    @lista.append $('<li data-role="list-divider" role="heading">' + @modulo.nome + '</li>')
    @desenharBotaoNovo()
    @desenharBotaoVoltar()
    @atualizar()
    $.getJSON linkGet, (jsonObj) =>
      $.each jsonObj, (i, registro) =>
        @listar(registro)
      @lista.listview('refresh')
    
  listar: (registro) ->
    linha = @modulo.prepararLinhaListagem(registro)
    ver = $("<a href='#" + @modulo.paginaDetalhes.getId() + "' data-transition='slide'>#{linha}</a>")
    editar = $("<a href='#" + @modulo.paginaEdicao.getId() + "' data-transition='slide'>Editar</a>")
    li = $("<li data-theme='c' data-icon='edit'>")
    li.append ver
    li.append editar
    @lista.append li
    ver.click =>
      @modulo.abrirItem(registro.id)
    editar.click =>
      @modulo.editarItem(registro.id, registro.version)

  desenharBotaoNovo: ->
    criar = $('<a data-role="button" data-inline="true" href="#criacao' + @modulo.url + '" data-icon="create" data-iconpos="left">Criar</a>')
    @content.append criar
    criar.click =>
      @modulo.novoItem()


class App.PaginaDetalhes extends App.Pagina

  constructor: (@modulo) ->
    super(@modulo, @modulo.paginaListagem.getId())

  getId: ->
    "detalhes" + @modulo.url

  abrir: (@idItem) ->
    this.desenharConteudo()    
    $.getJSON @modulo.url + "/" + @idItem, (jsonObj) =>
      this.carregar(jsonObj)
      this.atualizar()

  desenharConteudo: ->
    @content.empty()
    @titulo = $("<div>#{@modulo.nome} </div>")
    @content.append @titulo
    
    @desenharBotaoVoltar()
    @atualizar()

  carregar: (registro) ->
    @titulo.html "#{@modulo.nome} #{registro[@modulo.propriedade]}"


class App.PaginaEdicao extends App.Pagina
  constructor: (@modulo) ->
    super(@modulo, @modulo.paginaListagem.getId())
    @form = $('<form>')
    @content.append @form
    @desenharBotaoVoltar()
    
  getId: ->
    "edicao" + @modulo.url

  desenharConteudo: ->
    @form.empty()    
    
  abrir: (@idItem, @versionItem) ->
    this.desenharConteudo()    
    $.getJSON @modulo.url + "/" + @idItem, (jsonObj) =>
      this.desenharConteudoForm(jsonObj)
      this.desenharBotaoSalvar()      
      this.atualizar()

  desenharConteudoForm: (jsonObj) ->

  desenharBotaoSalvar: ->
    submit = $('<a href="#' + @idMae +
      '" data-role="button" data-inline="true" data-icon="arrow-l" data-iconpos="left">Salvar</a>')       
    @form.append submit
    submit.click =>
      this.salvar()
    
  salvar: =>
    json = this.montarJSON()        
    this.enviarPut @modulo.url, json, =>
        @modulo.abrir()
        
  montarJSON: ->
    "{}"   


class App.PaginaCriacao extends App.Pagina

  constructor: (@modulo) ->
    super(@modulo, @modulo.paginaListagem.getId())
    @form = $('<form>')
    @content.append @form
    @desenharBotaoVoltar()
    
  getId: ->
    "criacao" + @modulo.url

  desenharConteudo: ->
    @form.empty()    
    
  abrir: () ->
    @desenharConteudo()    
    @desenharConteudoForm()
    @desenharBotaoSalvar()      
    @atualizar()

  desenharConteudoForm: () ->

  desenharBotaoSalvar: ->
    submit = $('<a href="#' + @idMae +
      '" data-role="button" data-inline="true" data-icon="arrow-l" data-iconpos="left">Criar</a>')       
    @form.append submit
    submit.click =>
      this.salvar()
    
  salvar: =>
    json = this.montarJSON()        
    this.enviarPost @modulo.url, json, =>
        @modulo.abrir()
        
  montarJSON: ->
    "{}"   


class App.Modulo

  constructor: (@nome, @url, @propriedade) ->
    @paginaListagem = @criarPaginaListagem()
    @paginaEdicao = @criarPaginaEdicao()
    @paginaCriacao = @criarPaginaCriacao()
    @paginaDetalhes = @criarPaginaDetalhes()
  
  criarPaginaListagem: ->
    new App.PaginaListagem(this, "principal")
   
  criarPaginaEdicao: ->
    new App.PaginaEdicao(this)

  criarPaginaCriacao: ->
    new App.PaginaCriacao(this)

  criarPaginaDetalhes: ->
    new App.PaginaDetalhes(this)
    
  abrir: ->
    @paginaListagem.desenharConteudo(@url)
  
  novoItem: () ->
    @paginaCriacao.abrir()
      
  abrirItem: (idItem) ->
    @paginaDetalhes.abrir(idItem)
  
  editarItem: (idItem, versionItem) ->
    @paginaEdicao.abrir(idItem, versionItem)
    
  prepararLinhaListagem: (registro) ->
    registro[@propriedade]

class App.SubModulo extends App.Modulo
  constructor: (@nome, @urlFilho, @propriedade, @moduloPai) ->
    super(@nome, @urlFilho, @propriedade)
    
  criarPaginaListagem: ->
    new App.PaginaListagem(this, @moduloPai.paginaDetalhes.getId())
  
  abrir: (idPai) ->
    if (idPai)
      @idObjetoPai = idPai
    
    link = @moduloPai.url + '/' + @idObjetoPai + '/' + @urlFilho
    @paginaListagem.desenharConteudo(link)
  