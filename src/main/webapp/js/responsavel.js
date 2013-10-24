(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoResponsavel = (function(_super) {

    __extends(FormCriacaoResponsavel, _super);

    function FormCriacaoResponsavel(modulo) {
      this.modulo = modulo;
      FormCriacaoResponsavel.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoResponsavel.prototype.desenharConteudoForm = function() {
      return this.inputLogin = App.inputCriacao(this.form, "login", "Login", "text");
    };

    FormCriacaoResponsavel.prototype.montarJSON = function() {
      return "{ 'login': '" + (this.inputLogin.val()) + "' }";
    };

    return FormCriacaoResponsavel;

  })(App.PaginaCriacao);

  App.FormEdicaoResponsavel = (function(_super) {

    __extends(FormEdicaoResponsavel, _super);

    function FormEdicaoResponsavel(modulo) {
      this.modulo = modulo;
      FormEdicaoResponsavel.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoResponsavel.prototype.desenharConteudoForm = function(jsonObj) {
      return this.inputLogin = App.inputEdicao(this.form, "login", "Login", "text", jsonObj.login);
    };

    FormEdicaoResponsavel.prototype.montarJSON = function() {
      return "{ 'login': '" + (this.inputLogin.val()) + "', 'id': " + this.dados.idItem + ", 'version': " + this.dados.versionItem + " }";
    };

    return FormEdicaoResponsavel;

  })(App.PaginaEdicao);

  App.PaginaDetalhesResponsavel = (function(_super) {

    __extends(PaginaDetalhesResponsavel, _super);

    function PaginaDetalhesResponsavel(modulo) {
      this.modulo = modulo;
      PaginaDetalhesResponsavel.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesResponsavel.prototype.carregar = function(registro) {
      return this.titulo.html("" + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhesResponsavel;

  })(App.PaginaDetalhes);

  App.ModuloResponsaveis = (function(_super) {

    __extends(ModuloResponsaveis, _super);

    function ModuloResponsaveis(paginaMae) {
      this.paginaMae = paginaMae;
      ModuloResponsaveis.__super__.constructor.call(this, this.paginaMae, 'Responsavel', 'responsaveis', 'login');
    }

    ModuloResponsaveis.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoResponsavel(this);
    };

    ModuloResponsaveis.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoResponsavel(this);
    };

    ModuloResponsaveis.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesResponsavel(this);
    };

    return ModuloResponsaveis;

  })(App.Modulo);

}).call(this);
