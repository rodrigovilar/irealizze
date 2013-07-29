(function() {
  var abrirTelaPrincipal, addMenu, iniciar;

  addMenu = function(menu, modulo) {
    var item;
    item = $('<li data-theme="c"><a href="#' + modulo.paginaListagem.getId() + '" data-transition="slide">' + modulo.nome + '</a></li>');
    menu.append(item);
    return item.click(function() {
      return modulo.abrir();
    });
  };

  abrirTelaPrincipal = function() {
    var content, menu;
    content = $("div[data-role='content']");
    content.empty();
    menu = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
    content.append(menu);
    menu.append('<li data-role="list-divider" role="heading">Módulos</li>');
    addMenu(menu, new App.ModuloProjetos);
    addMenu(menu, new App.ModuloResponsaveis);
    addMenu(menu, new App.ModuloTipoItem);
    return addMenu(menu, new App.ModuloTabelaPreco);
  };

  iniciar = function() {
    abrirTelaPrincipal();
    return $("#principal").page();
  };

  $(function() {
    iniciar();
    return App.atualizarGUI($('#principal'));
  });

}).call(this);
