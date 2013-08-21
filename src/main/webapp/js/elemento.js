(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoElemento = (function(_super) {

    __extends(FormEdicaoElemento, _super);

    function FormEdicaoElemento(modulo) {
      this.modulo = modulo;
      FormEdicaoElemento.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoElemento.prototype.desenharConteudoForm = function(jsonObj) {
      var divNome, labelNome;
      divNome = $('<div data-role="fieldcontain">');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">');
      divNome.append(labelNome);
      return divNome.append(this.inputNome);
    };

    FormEdicaoElemento.prototype.montarJSON = function() {
      return '{ "nome": "' + this.inputNome.val() + '", "projeto": ' + this.modulo.idObjetoPai + ', "id": ' + this.idItem + ', "version": ' + this.versionItem + ' }';
    };

    return FormEdicaoElemento;

  })(App.PaginaEdicao);

  App.FormCriacaoElemento = (function(_super) {

    __extends(FormCriacaoElemento, _super);

    function FormCriacaoElemento(modulo) {
      this.modulo = modulo;
      FormCriacaoElemento.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoElemento.prototype.desenharConteudoForm = function() {
      var divNome, labelNome;
      divNome = $('<div data-role="fieldcontain">');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">');
      divNome.append(labelNome);
      return divNome.append(this.inputNome);
    };

    FormCriacaoElemento.prototype.montarJSON = function() {
      return '{ "nome": "' + this.inputNome.val() + '", "projeto": ' + this.modulo.idObjetoPai + ' }';
    };

    return FormCriacaoElemento;

  })(App.PaginaCriacao);

  App.PaginaDetalhesElemento = (function(_super) {

    __extends(PaginaDetalhesElemento, _super);

    function PaginaDetalhesElemento(modulo) {
      this.modulo = modulo;
      PaginaDetalhesElemento.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesElemento.prototype.carregar = function(registro) {
      return this.titulo.html("" + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhesElemento;

  })(App.PaginaDetalhes);

  App.ModuloElementos = (function(_super) {

    __extends(ModuloElementos, _super);

    function ModuloElementos(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloElementos.__super__.constructor.call(this, 'Elementos', 'elementos', 'nome', this.moduloPai);
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

    ModuloElementos.prototype.abrirItem = function(idItem) {
      return alert("ver elemento " + idItem);
    };

    return ModuloElementos;

  })(App.SubModulo);

}).call(this);
