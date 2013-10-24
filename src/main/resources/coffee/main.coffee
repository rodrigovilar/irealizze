class App.PaginaPrincipal extends App.Pagina

  constructor: ->
    super(null)

  abrir: ->
    @mudarPagina()
    @abrirTelaPrincipal()

  abrirTelaPrincipal: ->
    @pagina.append '<p>Módulos</p>'
  
    menu = $('<ul>') 
    @pagina.append menu

    @addMenu(menu, new App.ModuloProjetos this)
    @addMenu(menu, new App.ModuloResponsaveis this)
    @addMenu(menu, new App.ModuloTipoItem this)
    @addMenu(menu, new App.ModuloTabelaPreco this)

  addMenu: (menu, modulo) ->
    item = $('<li>' + modulo.nome + '</li>')
    menu.append item
    item.click -> 
      modulo.abrir()
  
$ -> 
  principal = new App.PaginaPrincipal
  principal.abrir()
