(function() {
  var Modulo, addMenu, atualizarGUI, iniciar;

  atualizarGUI = function() {
    return $('#pagina').trigger('create');
  };

  Modulo = (function() {

    function Modulo(lista, nome, url, propriedade) {
      this.lista = lista;
      this.nome = nome;
      this.url = url;
      this.propriedade = propriedade;
    }

    Modulo.prototype.abrir = function() {
      var _this = this;
      this.lista.empty();
      return $.getJSON(this.url, function(jsonObj) {
        $.each(jsonObj, function(i, registro) {
          return _this.listar(registro);
        });
        _this.lista.listview('refresh');
        return atualizarGUI();
      });
    };

    Modulo.prototype.listar = function(registro) {
      var editar, li, ver;
      ver = $("<a href='#'>" + registro[this.propriedade] + "</a>");
      editar = $("<a href='#'>Editar</a>");
      li = $("<li data-icon='edit'></li>");
      li.append(ver);
      li.append(editar);
      this.lista.append(li);
      ver.click(function() {
        return alert("ver " + registro.id);
      });
      return editar.click(function() {
        return alert("editar " + registro.id);
      });
    };

    return Modulo;

  })();

  addMenu = function(menu, modulo) {
    var item;
    item = $("<li><a href='#'>" + modulo.nome + "</a></li>");
    menu.append(item);
    return item.click(function() {
      return modulo.abrir();
    });
  };

  iniciar = function() {
    var lista, menu, navbar;
    navbar = $('<div data-role="navbar">');
    $("div[data-role='header']").append(navbar);
    menu = $('<ul>');
    navbar.append(menu);
    lista = $('<ul data-role="listview">');
    $("div[data-role='content']").append(lista);
    addMenu(menu, new Modulo(lista, 'Projetos', 'projetos', 'nome'));
    addMenu(menu, new Modulo(lista, 'Responsáveis', 'responsaveis', 'login'));
    addMenu(menu, new Modulo(lista, 'Itens', 'tipositens', 'nome'));
    return addMenu(menu, new Modulo(lista, 'Preço', 'tabelasprecos', 'nome'));
  };

  $(function() {
    iniciar();
    return atualizarGUI();
  });

}).call(this);
