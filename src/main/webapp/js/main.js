(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.PaginaPrincipal = (function(_super) {

    __extends(PaginaPrincipal, _super);

    function PaginaPrincipal() {
      PaginaPrincipal.__super__.constructor.call(this, null, null);
    }

    PaginaPrincipal.prototype.getId = function() {
      return "paginaPrincipal";
    };

    PaginaPrincipal.prototype.desenharConteudo = function() {
      this.mudarPagina();
      return this.abrirTelaPrincipal();
    };

    PaginaPrincipal.prototype.abrirTelaPrincipal = function() {
      var menu;
      this.pagina.append('<p>Módulos</p>');
      menu = $('<ul>');
      this.pagina.append(menu);
      this.addMenu(menu, new App.ModuloProjetos(this));
      this.addMenu(menu, new App.ModuloResponsaveis(this));
      this.addMenu(menu, new App.ModuloTipoItem(this));
      return this.addMenu(menu, new App.ModuloTabelaPreco(this));
    };

    PaginaPrincipal.prototype.addMenu = function(menu, modulo) {
      var item;
      item = $('<li>' + modulo.nome + '</li>');
      menu.append(item);
      return item.click(function() {
        return modulo.abrir();
      });
    };

    return PaginaPrincipal;

  })(App.Pagina);

  $(function() {
    var principal;
    principal = new App.PaginaPrincipal;
    return principal.desenharConteudo();
  });

}).call(this);
