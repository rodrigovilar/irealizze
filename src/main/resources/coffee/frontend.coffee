atualizarGUI = ->
  $('#pagina').trigger('create')

class Modulo
  constructor: (@lista, @nome, @url, @propriedade) ->
  
  abrir: ->
    @lista.empty()
    $.getJSON @url, (jsonObj) =>
      $.each jsonObj, (i, registro) =>
        this.listar(registro)
      @lista.listview('refresh')
      atualizarGUI()
  
  listar: (registro) ->
    ver = $("<a href='#'>#{registro[@propriedade]}</a>")
    editar = $("<a href='#'>Editar</a>")
    li = $("<li data-icon='edit'></li>")
    li.append ver
    li.append editar
    @lista.append li
    ver.click ->
      alert "ver " + registro.id
    editar.click ->
      alert "editar " + registro.id

addMenu = (menu, modulo) ->
  item = $("<li><a href='#'>#{modulo.nome}</a></li>")
  menu.append item
  item.click -> 
    modulo.abrir()

iniciar = ->
  navbar = $('<div data-role="navbar">') 
  $("div[data-role='header']").append navbar
  menu = $('<ul>')
  navbar.append menu

  lista = $('<ul data-role="listview">')
  $("div[data-role='content']").append lista

  addMenu(menu, new Modulo lista, 'Projetos', 'projetos', 'nome')
  addMenu(menu, new Modulo lista, 'Responsáveis', 'responsaveis', 'login')
  addMenu(menu, new Modulo lista, 'Itens', 'tipositens', 'nome')
  addMenu(menu, new Modulo lista, 'Preço', 'tabelasprecos', 'nome')
  
$ -> 
  iniciar()
  atualizarGUI()