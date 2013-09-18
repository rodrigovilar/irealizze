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
  
App.desenharBotao = (elemento, texto, callback) ->
    botao = $('<button type="button">' + texto + '</button>')
    elemento.append botao
    botao.click =>
      callback()
  

class App.Pagina

  constructor: (@modulo, @paginaMae) ->
    
  getId: ->
    "pagina" + @modulo.url

  desenharConteudo: ->
    @mudarPagina()
    @desenharBotaoVoltar()
        
  mudarPagina: ->
    body  = $("body")
    body.empty()
    
    @pagina = $('<div id="' + @getId() + '">"')
    body.append @pagina
    
  desenharBotaoVoltar: ->
    App.desenharBotao @pagina, 'Voltar', =>
      @paginaMae.desenharConteudo()

  
class App.PaginaListagem extends App.Pagina

  constructor: (@modulo, @idMae, @linkGet) ->
    super(@modulo, @idMae)

  desenharConteudo: =>
    @mudarPagina()

    @pagina.append $('<p>' + @modulo.nome + '</p>')
    @desenharBotaoNovo()

    @lista = $('<table>')
    @pagina.append @lista
    
    @desenharBotaoVoltar()

    $.getJSON @linkGet, (jsonObj) =>
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

  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)

  getId: ->
    "detalhes" + @modulo.url

  abrir: (@idItem) ->
    @desenharConteudo()    
    $.getJSON @modulo.url + "/" + @idItem, (jsonObj) =>
      this.carregar(jsonObj)

  desenharConteudo: ->
    @mudarPagina()

    @titulo = $("<div>#{@modulo.nome} </div>")
    @pagina.append @titulo
    
    @desenharBotaoVoltar()

  carregar: (registro) ->
    @titulo.html "#{@modulo.nome} #{registro[@modulo.propriedade]}"


class App.PaginaEdicao extends App.Pagina
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  getId: ->
    "edicao" + @modulo.url

  desenharConteudo: ->
    @mudarPagina()
    @form = $('<form>')
    @pagina.append @form
    @desenharBotaoVoltar()
    
  abrir: (@idItem, @versionItem) ->
    @desenharConteudo()    
    $.getJSON @modulo.url + "/" + @idItem, (jsonObj) =>
      this.desenharConteudoForm(jsonObj)
      this.desenharBotaoSalvar()      

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


class App.PaginaCriacao extends App.Pagina

  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  getId: ->
    "criacao" + @modulo.url

  desenharConteudo: ->
    @mudarPagina()
    @form = $('<form>')
    @pagina.append @form
    @desenharBotaoVoltar()
    
  abrir: () ->
    @desenharConteudo()    
    @desenharConteudoForm()
    @desenharBotaoSalvar()      

  desenharConteudoForm: () ->

  desenharBotaoSalvar: ->
    App.desenharBotao @form, 'Salvar', =>
      @salvar()
    
  salvar: =>
    json = this.montarJSON()        
    App.enviarPost @modulo.url, json, =>
      @modulo.abrir()
        
  montarJSON: ->
    "{}"   


class App.Modulo

  constructor: (@paginaMae, @nome, @url, @propriedade) ->
    @paginaListagem = @criarPaginaListagem()
    @paginaEdicao = @criarPaginaEdicao()
    @paginaCriacao = @criarPaginaCriacao()
    @paginaDetalhes = @criarPaginaDetalhes()
  
  criarPaginaListagem: ->
    new App.PaginaListagem(this, @paginaMae, @url)
   
  criarPaginaEdicao: ->
    new App.PaginaEdicao(this, @paginaListagem)

  criarPaginaCriacao: ->
    new App.PaginaCriacao(this, @paginaListagem)

  criarPaginaDetalhes: ->
    new App.PaginaDetalhes(this, @paginaListagem)
    
  abrir: ->
    @paginaListagem.desenharConteudo()
  
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
    super(@moduloPai.paginaDetalhes, @nome, @urlFilho, @propriedade)
    
  criarPaginaListagem: ->
    new App.PaginaListagem(this, @moduloPai.paginaDetalhes)
  
  abrir: (idPai) ->
    if (idPai)
      @idObjetoPai = idPai
    
    link = @moduloPai.url + '/' + @idObjetoPai + '/' + @urlFilho
    @paginaListagem = new App.PaginaListagem(this, @paginaMae, link)
    @paginaListagem.desenharConteudo()
  