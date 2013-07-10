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
      var divLogin, labelLogin;
      divLogin = $('<div data-role="fieldcontain">');
      this.form.append(divLogin);
      labelLogin = $('<label for="login">Login</label>');
      this.inputLogin = $('<input name="login" id="login" placeholder="" value="" type="text">');
      divLogin.append(labelLogin);
      return divLogin.append(this.inputLogin);
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
      var divLogin, labelLogin;
      divLogin = $('<div data-role="fieldcontain">');
      this.form.append(divLogin);
      labelLogin = $('<label for="login">Login</label>');
      this.inputLogin = $('<input name="login" id="login" placeholder="" value="' + jsonObj.login + '" type="text">');
      divLogin.append(labelLogin);
      return divLogin.append(this.inputLogin);
    };

    FormEdicaoResponsavel.prototype.montarJSON = function() {
      return "{ 'login': '" + (this.inputLogin.val()) + "', 'id': " + this.idItem + ", 'version': " + this.versionItem + " }";
    };

    return FormEdicaoResponsavel;

  })(App.PaginaEdicao);

  App.ModuloResponsaveis = (function(_super) {

    __extends(ModuloResponsaveis, _super);

    function ModuloResponsaveis(lista) {
      this.lista = lista;
      ModuloResponsaveis.__super__.constructor.call(this, this.lista, 'Responsavel', 'responsaveis', 'login');
    }

    ModuloResponsaveis.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoResponsavel(this);
    };

    ModuloResponsaveis.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoResponsavel(this);
    };

    return ModuloResponsaveis;

  })(App.Modulo);

}).call(this);
