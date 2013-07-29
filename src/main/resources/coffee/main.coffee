  
addMenu = (menu, modulo) ->
  item = $('<li data-theme="c"><a href="#' + modulo.paginaListagem.getId() + '" data-transition="slide">' + modulo.nome + '</a></li>')
  menu.append item
  item.click -> 
    modulo.abrir()

abrirTelaPrincipal = ->
  content  = $("div[data-role='content']")
  content.empty()
  
  menu = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">') 
  content.append menu
  menu.append('<li data-role="list-divider" role="heading">Módulos</li>')

  addMenu(menu, new App.ModuloProjetos)
  addMenu(menu, new App.ModuloResponsaveis)
  addMenu(menu, new App.ModuloTipoItem)
  addMenu(menu, new App.ModuloTabelaPreco)
  
iniciar = ->
  abrirTelaPrincipal()
  $("#principal").page()
  
$ -> 
  iniciar()
  App.atualizarGUI($('#principal'))