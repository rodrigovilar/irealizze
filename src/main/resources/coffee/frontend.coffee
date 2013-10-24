window.App={}

App.enviarPut = (link, json, callback) ->
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
    
App.enviarPost = (link, json, callback) ->
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
  
App.dataJson2Gui = (formatoAAAAMMDD) ->
  formatoDDMMAAAA = formatoAAAAMMDD.split('-').reverse().join('/')
  formatoDDMMAAAA

App.novaPagina = ->
  body  = $("body")
  body.empty()  
  pagina = $('<div>')
  body.append pagina
  pagina
  
App.desenharBotao = (elemento, texto, callback) ->
  botao = $('<button type="button">' + texto + '</button>')
  elemento.append botao
  botao.click =>
    callback()

App.inputCriacao = (formEl, id, label, type) ->
  div = $('<div>')
  formEl.append div    
  labelEl = $('<label for="' + id + '">' + label + '</label>')        
  inputEl = $('<input name="' + id + '" id="' + id + '" type="' + type + '">')
  div.append labelEl
  div.append inputEl
  inputEl

App.inputEdicao = (formEl, id, label, type, value) ->
  div = $('<div>')
  formEl.append div    
  labelEl = $('<label for="' + id + '">' + label + '</label>')        
  inputEl = $('<input name="' + id + '" id="' + id + '" value="' + value + '" type="' + type + '">')
  div.append labelEl
  div.append inputEl
  inputEl


class App.Pagina

  constructor: (@modulo) ->
    
  configurar: (@dados) ->  
  
  abrir: ->
    @mudarPagina()
    @desenharBotaoVoltar()
        
  mudarPagina: ->
    @pagina = App.novaPagina()
    
  desenharBotaoVoltar: ->
    App.desenharBotao @pagina, 'Voltar', =>
      @dados.paginaMae.abrir()

  
class App.PaginaListagem extends App.Pagina

  constructor: (@modulo) ->
    super(@modulo)

  abrir: =>
    @mudarPagina()

    @pagina.append $('<p>' + @modulo.nome + '</p>')
    @desenharBotaoNovo()

    @lista = $('<table>')
    @pagina.append @lista
    
    @desenharBotaoVoltar()

    $.getJSON @dados.url, (jsonObj) =>
      $.each jsonObj, (i, registro) =>
        @listar(registro)
    
  listar: (registro) ->
    tr = $('<tr>')
    @lista.append tr
    
    texto = @modulo.prepararLinhaListagem(registro)
    ver = $("<td>#{texto}</td>")
    tr.append ver

    editar = $("<td>Editar</td>")
    tr.append editar

    ver.click =>
      @modulo.abrirItem(registro.id)

    editar.click =>
      @modulo.editarItem(registro.id, registro.version)

  desenharBotaoNovo: ->
    App.desenharBotao @pagina, 'Criar', =>
      @modulo.novoItem()


class App.PaginaDetalhes extends App.Pagina

  constructor: (@modulo) ->
    super(@modulo)

  abrir: ->
    @mudarPagina()

    @titulo = $("<div>#{@modulo.nome} </div>")
    @pagina.append @titulo
    
    @desenharBotaoVoltar()
    $.getJSON @modulo.url + "/" + @dados.idItem, (jsonObj) =>
      @carregar(jsonObj)

  carregar: (registro) ->
    @titulo.html "#{@modulo.nome} #{registro[@modulo.propriedade]}"


class App.PaginaCriacao extends App.Pagina

  constructor: (@modulo) ->
    super(@modulo)
    
  abrir: ->
    @mudarPagina()
    @form = $('<form>')
    @pagina.append @form
    @desenharBotaoVoltar()
    @desenharConteudoForm()
    @desenharBotaoSalvar()      

  desenharConteudoForm: ->

  desenharBotaoSalvar: ->
    App.desenharBotao @form, 'Salvar', =>
      @salvar()
    
  salvar: =>
    json = this.montarJSON()        
    App.enviarPost @modulo.url, json, =>
      @modulo.abrir()
        
  montarJSON: ->
    "{}"   


class App.PaginaEdicao extends App.Pagina
  constructor: (@modulo) ->
    super(@modulo)
    
  abrir:  ->
    @mudarPagina()
    @form = $('<form>')
    @pagina.append @form
    @desenharBotaoVoltar()
    $.getJSON @modulo.url + "/" + @dados.idItem, (jsonObj) =>
      @desenharConteudoForm(jsonObj)
      @desenharBotaoSalvar()      

  desenharConteudoForm: (jsonObj) ->

  desenharBotaoSalvar: ->
    App.desenharBotao @form, 'Salvar', =>
      @salvar()
    
  salvar: =>
    json = @montarJSON()        
    App.enviarPut @modulo.url, json, =>
      @modulo.abrir()
        
  montarJSON: ->
    "{}"   


class App.Modulo

  constructor: (@paginaMae, @nome, @url, @propriedade) ->
    @paginaListagem = @criarPaginaListagem()
    @configurarPaginaListagem()
    
    dados = 
      paginaMae: @paginaListagem

    @paginaCriacao = @criarPaginaCriacao()
    @paginaCriacao.configurar dados

    @paginaEdicao = @criarPaginaEdicao()
    @paginaEdicao.configurar dados

    @paginaDetalhes = @criarPaginaDetalhes()
    @paginaDetalhes.configurar dados
  
  criarPaginaListagem: ->
    new App.PaginaListagem(this)
    
  configurarPaginaListagem: ->
    dados = 
      paginaMae: @paginaMae
      url:       @url
    @paginaListagem.configurar dados
  
  criarPaginaCriacao: ->
    new App.PaginaCriacao(this)

  criarPaginaEdicao: ->
    new App.PaginaEdicao(this)

  criarPaginaDetalhes: ->
    new App.PaginaDetalhes(this, @paginaListagem)
    
  abrir: ->
    @paginaListagem.abrir()
  
  novoItem: () ->
    @paginaCriacao.abrir()
      
  abrirItem: (idItem) ->
    dados = 
      paginaMae: @paginaListagem
      idItem:         idItem

    @paginaDetalhes.configurar dados
    @paginaDetalhes.abrir()
  
  editarItem: (idItem, versionItem) ->
    dados = 
      paginaMae: @paginaListagem
      idItem:         idItem
      versionItem:    versionItem

    @paginaEdicao.configurar dados
    @paginaEdicao.abrir()
    
  prepararLinhaListagem: (registro) ->
    registro[@propriedade]

class App.SubModulo extends App.Modulo
  constructor: (@nome, @urlFilho, @propriedade, @moduloPai) ->
    super(@moduloPai.paginaDetalhes, @nome, @urlFilho, @propriedade)
    
  configurarPaginaListagem: ->
    dados = 
      paginaMae: @moduloPai.paginaDetalhes
      url:       @url
    @paginaListagem.configurar dados

  abrir: (idPai) ->
    if (idPai)
      @idObjetoPai = idPai
    
    link = @moduloPai.url + '/' + @idObjetoPai + '/' + @urlFilho
    if (@moduloPai.urlFilho)
      link = @moduloPai.urlFilho + '/' + @idObjetoPai + '/' + @urlFilho

    dados = 
      paginaMae: @moduloPai.paginaDetalhes
      url:       link
      
    @paginaListagem.configurar dados
    @paginaListagem.abrir()
  