(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoElementoFolha = (function(_super) {

    __extends(FormCriacaoElementoFolha, _super);

    function FormCriacaoElementoFolha(modulo) {
      this.modulo = modulo;
      FormCriacaoElementoFolha.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoElementoFolha.prototype.desenharConteudoForm = function(jsonObj) {
      this.inputQuantidade = App.inputCriacao(this.form, "quantidade", "Quantidade", "text");
      return this.inputStatus = App.inputCriacao(this.form, "status", "Status", "text");
    };

    FormCriacaoElementoFolha.prototype.montarJSON = function() {
      return '{ "quantidade": ' + this.inputQuantidade.val() + ', "status": "' + this.inputStatus.val() + '" }';
    };

    return FormCriacaoElementoFolha;

  })(App.PaginaCriacao);

  App.FormEdicaoElementoFolha = (function(_super) {

    __extends(FormEdicaoElementoFolha, _super);

    function FormEdicaoElementoFolha(modulo) {
      this.modulo = modulo;
      FormEdicaoElementoFolha.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoElementoFolha.prototype.desenharConteudoForm = function(jsonObj) {
      this.inputQuantidade = App.inputEdicao(this.form, "quantidade", "Quantidade", "text", jsonObj.quantidade);
      return this.inputStatus = App.inputEdicao(this.form, "status", "Status", "text", jsonObj.status);
    };

    FormEdicaoElementoFolha.prototype.montarJSON = function() {
      return '{ "quantidade": "' + this.inputQuantidade.val() + '", "status": "' + this.inputStatus.val() + '", "id": ' + this.dados.idItem + ', "version": ' + this.dados.versionItem + ' }';
    };

    return FormEdicaoElementoFolha;

  })(App.PaginaEdicao);

  App.PaginaDetalhesElementoFolha = (function(_super) {

    __extends(PaginaDetalhesElementoFolha, _super);

    function PaginaDetalhesElementoFolha(modulo) {
      this.modulo = modulo;
      PaginaDetalhesElementoFolha.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesElementoFolha.prototype.carregar = function(registro) {
      return this.titulo.html("" + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhesElementoFolha;

  })(App.PaginaDetalhes);

  App.ModuloElementoFolha = (function(_super) {

    __extends(ModuloElementoFolha, _super);

    function ModuloElementoFolha(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloElementoFolha.__super__.constructor.call(this, 'ElementosFolhas', 'elementosfolhas', 'status', this.moduloPai);
    }

    ModuloElementoFolha.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoElementoFolha(this);
    };

    ModuloElementoFolha.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoElementoFolha(this);
    };

    ModuloElementoFolha.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesElementoFolha(this);
    };

    ModuloElementoFolha.prototype.abrirItem = function(idItem) {
      return alert("ver elementofolha " + idItem);
    };

    return ModuloElementoFolha;

  })(App.SubModulo);

}).call(this);
