  
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

  addMenu(menu, new App.ModuloProjetos content)
  addMenu(menu, new App.Modulo content, 'Responsáveis', 'responsaveis', 'login')
  addMenu(menu, new App.Modulo content, 'Itens', 'tipositens', 'nome')
  addMenu(menu, new App.ModuloTabelaPreco content)
  
iniciar = ->
  abrirTelaPrincipal()
  $("#principal").page()
  
$ -> 
  iniciar()
  App.atualizarGUI($('#principal'))