(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoTipoItem = (function(_super) {

    __extends(FormCriacaoTipoItem, _super);

    function FormCriacaoTipoItem(modulo) {
      this.modulo = modulo;
      FormCriacaoTipoItem.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoTipoItem.prototype.desenharConteudoForm = function() {
      return this.inputNome = App.inputCriacao(this.form, "nome", "Nome", "text");
    };

    FormCriacaoTipoItem.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "' }";
    };

    return FormCriacaoTipoItem;

  })(App.PaginaCriacao);

  App.FormEdicaoTipoItem = (function(_super) {

    __extends(FormEdicaoTipoItem, _super);

    function FormEdicaoTipoItem(modulo) {
      this.modulo = modulo;
      FormEdicaoTipoItem.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoTipoItem.prototype.desenharConteudoForm = function(jsonObj) {
      return this.inputNome = App.inputEdicao(this.form, "nome", "Nome", "text", jsonObj.nome);
    };

    FormEdicaoTipoItem.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'id': " + this.dados.idItem + ", 'version': " + this.dados.versionItem + " }";
    };

    return FormEdicaoTipoItem;

  })(App.PaginaEdicao);

  App.PaginaDetalhesTipoItem = (function(_super) {

    __extends(PaginaDetalhesTipoItem, _super);

    function PaginaDetalhesTipoItem(modulo) {
      this.modulo = modulo;
      PaginaDetalhesTipoItem.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesTipoItem.prototype.carregar = function(registro) {
      var _this = this;
      this.titulo.html("" + registro[this.modulo.propriedade]);
      return App.desenharBotao(this.pagina, 'Itens', function() {
        return _this.modulo.moduloItem.abrir(registro.id);
      });
    };

    return PaginaDetalhesTipoItem;

  })(App.PaginaDetalhes);

  App.ModuloTipoItem = (function(_super) {

    __extends(ModuloTipoItem, _super);

    function ModuloTipoItem(paginaMae) {
      this.paginaMae = paginaMae;
      ModuloTipoItem.__super__.constructor.call(this, this.paginaMae, 'TipoItem', 'tipositens', 'nome');
      this.moduloItem = new App.ModuloItem(this);
    }

    ModuloTipoItem.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoTipoItem(this);
    };

    ModuloTipoItem.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoTipoItem(this);
    };

    ModuloTipoItem.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesTipoItem(this);
    };

    return ModuloTipoItem;

  })(App.Modulo);

}).call(this);
