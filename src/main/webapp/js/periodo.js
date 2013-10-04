(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoPeriodo = (function(_super) {

    __extends(FormEdicaoPeriodo, _super);

    function FormEdicaoPeriodo(modulo) {
      this.modulo = modulo;
      FormEdicaoPeriodo.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoPeriodo.prototype.desenharConteudoForm = function(jsonObj) {
      var divDataLimite, divProjeto, labelDataLimite, labelProjeto;
      divDataLimite = $('<div data-role="fieldcontain">');
      this.form.append(divDataLimite);
      labelDataLimite = $('<label for="dataLimite">DataLimite</label>');
      this.inputDataLimite = $('<input name="dataLimite" id="dataLimite" placeholder="" value="' + jsonObj.dataLimite + '" type="text">');
      divDataLimite.append(labelDataLimite);
      divDataLimite.append(this.inputDataLimite);
      divProjeto = $('<div data-role="fieldcontain">');
      this.form.append(divProjeto);
      labelProjeto = $('<label for="projeto">Projeto</label>');
      this.inputProjeto = $('<input name="projeto" id="projeto" placeholder="" value="' + jsonObj.cliente + '" type="text">');
      divProjeto.append(labelProjeto);
      return divProjeto.append(this.inputProjeto);
    };

    FormEdicaoPeriodo.prototype.montarJSON = function() {
      return '{ "dataLimite": "' + this.inputDataLimite.val() + '", "projeto": ' + this.inputProjeto.val() + ', "id": ' + this.idItem + ', "version": ' + this.versionItem + ' }';
    };

    return FormEdicaoPeriodo;

  })(App.PaginaEdicao);

  App.FormCriacaoPeriodo = (function(_super) {

    __extends(FormCriacaoPeriodo, _super);

    function FormCriacaoPeriodo(modulo) {
      this.modulo = modulo;
      FormCriacaoPeriodo.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoPeriodo.prototype.desenharConteudoForm = function() {
      var divDataLimite, labelDataLimite;
      divDataLimite = $('<div data-role="fieldcontain">');
      this.form.append(divDataLimite);
      labelDataLimite = $('<label for="dataLimite">DataLimite</label>');
      this.inputDataLimite = $('<input name="dataLimite" id="dataLimite" placeholder="" value="" type="date">');
      divDataLimite.append(labelDataLimite);
      return divDataLimite.append(this.inputDataLimite);
    };

    FormCriacaoPeriodo.prototype.montarJSON = function() {
      return '{ "dataLimite": "' + this.inputDataLimite.val() + '", "projeto": ' + this.modulo.idObjetoPai + ' }';
    };

    return FormCriacaoPeriodo;

  })(App.PaginaCriacao);

  App.PaginaDetalhesPeriodo = (function(_super) {

    __extends(PaginaDetalhesPeriodo, _super);

    function PaginaDetalhesPeriodo(modulo) {
      this.modulo = modulo;
      PaginaDetalhesPeriodo.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesPeriodo.prototype.carregar = function(registro) {
      return this.titulo.html("" + registro[this.modulo.propriedade]);
    };

    PaginaDetalhesPeriodo.prototype.montarJSON = function() {
      return "{ 'periodo do projeto', 'periodos': '" + (this.inputPeriodos.val()) + "' }";
    };

    return PaginaDetalhesPeriodo;

  })(App.PaginaDetalhes);

  App.ModuloPeriodos = (function(_super) {

    __extends(ModuloPeriodos, _super);

    function ModuloPeriodos(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloPeriodos.__super__.constructor.call(this, 'Periodos', 'periodos', 'dataLimite', this.moduloPai);
    }

    ModuloPeriodos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoPeriodo(this);
    };

    ModuloPeriodos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoPeriodo(this);
    };

    ModuloPeriodos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesPeriodo(this);
    };

    ModuloPeriodos.prototype.abrirItem = function(idItem) {
      return alert("ver periodo " + idItem);
    };

    ModuloPeriodos.prototype.prepararLinhaListagem = function(registro) {
      var formatoAAAAMMDD, formatoDDMMAAAA;
      formatoAAAAMMDD = registro[this.propriedade];
      formatoDDMMAAAA = formatoAAAAMMDD.split('-').reverse().join('/');
      return formatoDDMMAAAA;
    };

    return ModuloPeriodos;

  })(App.SubModulo);

}).call(this);
