(function() {
  var Modulo, ModuloProjetos, abrirTelaPrincipal, addMenu, atualizarGUI, createPage, iniciar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  atualizarGUI = function(pagina) {
    return pagina.trigger('create');
  };

  Modulo = (function() {

    function Modulo(lista, nome, url, propriedade) {
      this.lista = lista;
      this.nome = nome;
      this.url = url;
      this.propriedade = propriedade;
    }

    Modulo.prototype.abrir = function(content) {
      var lista,
        _this = this;
      content.empty();
      lista = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
      content.append(lista);
      lista.append($('<li data-role="list-divider" role="heading">' + this.nome + '</li>'));
      content.append($('<a data-role="button" data-inline="true" data-rel="back" href="#principal" data-icon="arrow-l" data-iconpos="left">Voltar</a>'));
      atualizarGUI(content.parent());
      return $.getJSON(this.url, function(jsonObj) {
        $.each(jsonObj, function(i, registro) {
          return _this.listar(lista, registro);
        });
        return lista.listview('refresh');
      });
    };

    Modulo.prototype.listar = function(lista, registro) {
      var editar, li, ver,
        _this = this;
      ver = $("<a href='#'>" + registro[this.propriedade] + "</a>");
      editar = $("<a href='#'>Editar</a>");
      li = $("<li data-theme='c' data-icon='edit'>");
      li.append(ver);
      li.append(editar);
      lista.append(li);
      ver.click(function() {
        return _this.abrirItem(registro.id);
      });
      return editar.click(function() {
        return _this.editarItem(registro.id);
      });
    };

    Modulo.prototype.abrirItem = function(idItem) {
      return alert("ver " + idItem);
    };

    Modulo.prototype.editarItem = function(idItem) {
      return alert("editar " + idItem);
    };

    return Modulo;

  })();

  ModuloProjetos = (function(_super) {

    __extends(ModuloProjetos, _super);

    function ModuloProjetos(lista) {
      this.lista = lista;
      ModuloProjetos.__super__.constructor.call(this, this.lista, 'Projetos', 'projetos', 'nome');
    }

    ModuloProjetos.prototype.abrirItem = function(idItem) {
      return alert("ver projeto " + idItem);
    };

    ModuloProjetos.prototype.editarItem = function(idItem) {
      return alert("editar projeto" + idItem);
    };

    return ModuloProjetos;

  })(Modulo);

  addMenu = function(menu, modulo) {
    var content, item;
    item = $('<li data-theme="c"><a href="#pagina' + modulo.url + '">' + modulo.nome + '</a></li>');
    menu.append(item);
    content = createPage(modulo.url);
    return item.click(function() {
      return modulo.abrir(content);
    });
  };

  createPage = function(pageUrl) {
    var body, content, footer, header, page;
    body = $("body");
    page = $('<div data-role="page" data-theme="a" id="pagina' + pageUrl + '">"');
    header = $('<div data-role="header" data-theme="a"><h1>iRealizze</h1></div>');
    content = $('<div data-role="content" data-theme="a" id="pagina' + pageUrl + 'content">');
    footer = $('<div data-role="footer" data-theme="a"><h4>Realizzare Empreendimentos Imobiliários LTDA</h4></div>');
    body.append(page);
    page.append(header);
    page.append(content);
    page.append(footer);
    page.page();
    return content;
  };

  abrirTelaPrincipal = function() {
    var content, menu;
    content = $("div[data-role='content']");
    content.empty();
    menu = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
    content.append(menu);
    menu.append('<li data-role="list-divider" role="heading">Módulos</li>');
    addMenu(menu, new ModuloProjetos(content));
    addMenu(menu, new Modulo(content, 'Responsáveis', 'responsaveis', 'login'));
    addMenu(menu, new Modulo(content, 'Itens', 'tipositens', 'nome'));
    return addMenu(menu, new Modulo(content, 'Preço', 'tabelasprecos', 'nome'));
  };

  iniciar = function() {
    abrirTelaPrincipal();
    return $("#principal").page();
  };

  $(function() {
    iniciar();
    return atualizarGUI($('#principal'));
  });

}).call(this);
