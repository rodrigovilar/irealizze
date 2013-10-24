(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoElemento = (function(_super) {

    __extends(FormCriacaoElemento, _super);

    function FormCriacaoElemento(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormCriacaoElemento.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormCriacaoElemento.prototype.desenharConteudoForm = function() {
      return this.inputNome = App.inputCriacao(this.form, "nome", "Nome", "text");
    };

    FormCriacaoElemento.prototype.montarJSON = function() {
      return '{ "nome": "' + this.inputNome.val() + '", "projeto": ' + this.modulo.idObjetoPai + ' }';
    };

    return FormCriacaoElemento;

  })(App.PaginaCriacao);

  App.FormEdicaoElemento = (function(_super) {

    __extends(FormEdicaoElemento, _super);

    function FormEdicaoElemento(modulo) {
      this.modulo = modulo;
      FormEdicaoElemento.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoElemento.prototype.desenharConteudoForm = function(jsonObj) {
      return this.inputNome = App.inputEdicao(this.form, "nome", "Nome", "text", jsonObj.nome);
    };

    FormEdicaoElemento.prototype.montarJSON = function() {
      return '{ "nome": "' + this.inputNome.val() + '", "projeto": ' + this.modulo.idObjetoPai + ', "id": ' + this.dados.idItem + ', "version": ' + this.dados.versionItem + ' }';
    };

    return FormEdicaoElemento;

  })(App.PaginaEdicao);

  App.PaginaDetalhesElemento = (function(_super) {

    __extends(PaginaDetalhesElemento, _super);

    function PaginaDetalhesElemento(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      PaginaDetalhesElemento.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    PaginaDetalhesElemento.prototype.carregar = function(registro) {
      var _this = this;
      this.titulo.html("" + registro[this.modulo.propriedade]);
      return App.desenharBotao(this.pagina, 'ElementosFolhas', function() {
        return _this.modulo.moduloElementoFolha.abrir(registro.id);
      });
    };

    return PaginaDetalhesElemento;

  })(App.PaginaDetalhes);

  App.ModuloElementos = (function(_super) {

    __extends(ModuloElementos, _super);

    function ModuloElementos(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloElementos.__super__.constructor.call(this, 'Elementos', 'elementos', 'nome', this.moduloPai);
      this.moduloElementoFolha = new App.ModuloElementoFolha(this);
    }

    ModuloElementos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoElemento(this);
    };

    ModuloElementos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoElemento(this);
    };

    ModuloElementos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesElemento(this);
    };

    return ModuloElementos;

  })(App.SubModulo);

}).call(this);
