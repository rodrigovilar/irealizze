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
      var divDataLimite, labelDataLimite;
      divDataLimite = $('<div>');
      this.form.append(divDataLimite);
      labelDataLimite = $('<label for="dataLimite">Data Final</label>');
      this.inputDataLimite = $('<input name="dataLimite" id="dataLimite" value="" type="date">');
      divDataLimite.append(labelDataLimite);
      return divDataLimite.append(this.inputDataLimite);
    };

    FormCriacaoPeriodo.prototype.montarJSON = function() {
      return '{ "dataLimite": "' + this.inputDataLimite.val() + '", "projeto": ' + this.modulo.idObjetoPai + ' }';
    };

    return FormCriacaoPeriodo;

  })(App.PaginaCriacao);

  App.FormEdicaoPeriodo = (function(_super) {

    __extends(FormEdicaoPeriodo, _super);

    function FormEdicaoPeriodo(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoPeriodo.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoPeriodo.prototype.desenharConteudoForm = function(jsonObj) {
      var divDataLimite, labelDataLimite;
      divDataLimite = $('<div>');
      this.form.append(divDataLimite);
      labelDataLimite = $('<label for="dataLimite">Data Final</label>');
      this.inputDataLimite = $('<input name="dataLimite" id="dataLimite" value="' + jsonObj.dataLimite + '" type="date">');
      divDataLimite.append(labelDataLimite);
      return divDataLimite.append(this.inputDataLimite);
    };

    FormEdicaoPeriodo.prototype.montarJSON = function() {
      return '{ "dataLimite": "' + this.inputDataLimite.val() + '", "projeto": ' + this.modulo.idObjetoPai + ', "id": ' + this.idItem + ', "version": ' + this.versionItem + ' }';
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

    ModuloPeriodos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoPeriodo(this, this.paginaListagem);
    };

    ModuloPeriodos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoPeriodo(this, this.paginaListagem);
    };

    ModuloPeriodos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesPeriodo(this, this.paginaListagem);
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
