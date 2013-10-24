(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoPeriodo = (function(_super) {

    __extends(FormCriacaoPeriodo, _super);

    function FormCriacaoPeriodo(modulo) {
      this.modulo = modulo;
      FormCriacaoPeriodo.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoPeriodo.prototype.desenharConteudoForm = function() {
      return this.inputDataLimite = App.inputCriacao(this.form, "dataLimite", "Data Final", "date");
    };

    FormCriacaoPeriodo.prototype.montarJSON = function() {
      return '{ "dataLimite": "' + this.inputDataLimite.val() + '", "projeto": ' + this.modulo.idObjetoPai + ' }';
    };

    return FormCriacaoPeriodo;

  })(App.PaginaCriacao);

  App.FormEdicaoPeriodo = (function(_super) {

    __extends(FormEdicaoPeriodo, _super);

    function FormEdicaoPeriodo(modulo) {
      this.modulo = modulo;
      FormEdicaoPeriodo.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoPeriodo.prototype.desenharConteudoForm = function(jsonObj) {
      return this.inputDataLimite = App.inputEdicao(this.form, "dataLimite", "Data Final", "date", jsonObj.dataLimite);
    };

    FormEdicaoPeriodo.prototype.montarJSON = function() {
      return '{ "dataLimite": "' + this.inputDataLimite.val() + '", "projeto": ' + this.modulo.idObjetoPai + ', "id": ' + this.dados.idItem + ', "version": ' + this.dados.versionItem + ' }';
    };

    return FormEdicaoPeriodo;

  })(App.PaginaEdicao);

  App.PaginaDetalhesPeriodo = (function(_super) {

    __extends(PaginaDetalhesPeriodo, _super);

    function PaginaDetalhesPeriodo(modulo) {
      this.modulo = modulo;
      PaginaDetalhesPeriodo.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesPeriodo.prototype.carregar = function(registro) {
      return this.titulo.html("" + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhesPeriodo;

  })(App.PaginaDetalhes);

  App.ModuloPeriodos = (function(_super) {

    __extends(ModuloPeriodos, _super);

    function ModuloPeriodos(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloPeriodos.__super__.constructor.call(this, 'Períodos', 'periodos', 'dataLimite', this.moduloPai);
    }

    ModuloPeriodos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoPeriodo(this);
    };

    ModuloPeriodos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoPeriodo(this);
    };

    ModuloPeriodos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesPeriodo(this);
    };

    ModuloPeriodos.prototype.abrirItem = function(idItem) {
      return alert("ver periodo " + idItem);
    };

    ModuloPeriodos.prototype.prepararLinhaListagem = function(registro) {
      return App.dataJson2Gui(registro[this.propriedade]);
    };

    return ModuloPeriodos;

  })(App.SubModulo);

}).call(this);
