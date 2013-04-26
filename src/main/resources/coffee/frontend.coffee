atualizarGUI = (pagina) ->
  pagina.trigger('create')

class Modulo
  constructor: (@lista, @nome, @url, @propriedade) ->
  
  abrir: (content) ->
    content.empty()
    lista = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">')
    content.append lista
    
    lista.append $('<li data-role="list-divider" role="heading">' + @nome + '</li>')
    content.append $('<a data-role="button" data-inline="true" data-rel="back" href="#principal" data-icon="arrow-l" data-iconpos="left">Voltar</a>')
    atualizarGUI(content.parent())
    
    $.getJSON @url, (jsonObj) =>
      $.each jsonObj, (i, registro) =>
        this.listar(lista, registro)
      lista.listview('refresh')
    
  
  listar: (lista, registro) ->
    ver = $("<a href='#'>#{registro[@propriedade]}</a>")
    editar = $("<a href='#'>Editar</a>")
    li = $("<li data-theme='c' data-icon='edit'>")
    li.append ver
    li.append editar
    lista.append li
    ver.click =>
      this.abrirItem(registro.id)
    editar.click =>
      this.editarItem(registro.id)
  
  abrirItem: (idItem) ->
      alert "ver " + idItem
  
  editarItem: (idItem) ->
      alert "editar " + idItem 

class ModuloProjetos extends Modulo
  constructor: (@lista) ->
    super(@lista, 'Projetos', 'projetos', 'nome')
    
  abrirItem: (idItem) ->
      alert "ver projeto " + idItem
  
  editarItem: (idItem) ->
      alert "editar projeto" + idItem
  
addMenu = (menu, modulo) ->
  item = $('<li data-theme="c"><a href="#pagina' + modulo.url + '">' + modulo.nome + '</a></li>')
  menu.append item
  content = createPage(modulo.url)
  item.click -> 
    modulo.abrir(content)

createPage = (pageUrl) ->
  body  = $("body")
  page = $('<div data-role="page" data-theme="a" id="pagina' + pageUrl + '">"')
  header = $('<div data-role="header" data-theme="a"><h1>iRealizze</h1></div>')
  content = $('<div data-role="content" data-theme="a" id="pagina' + pageUrl + 'content">')
  footer = $('<div data-role="footer" data-theme="a"><h4>Realizzare Empreendimentos Imobiliários LTDA</h4></div>')  

  body.append page
  page.append header
  page.append content
  page.append footer
  
  page.page()
  return content

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