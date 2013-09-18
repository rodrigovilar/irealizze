(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoItem = (function(_super) {

    __extends(FormEdicaoItem, _super);

    function FormEdicaoItem(modulo) {
      this.modulo = modulo;
      FormEdicaoItem.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoItem.prototype.desenharConteudoForm = function(jsonObj) {
      var divNome, divUnidade, labelNome, labelUnidade;
      divNome = $('<div data-role="fieldcontain">');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      divUnidade = $('<div data-role="fieldcontain">');
      this.form.append(divUnidade);
      labelUnidade = $('<label for="unidade">Unidade</label>');
      this.inputUnidade = $('<input name="unidade" id="unidade" placeholder="" value="' + jsonObj.unidade + '" type="text">');
      divUnidade.append(labelUnidade);
      return divUnidade.append(this.inputUnidade);
    };

    FormEdicaoItem.prototype.montarJSON = function() {
      return '{ "nome": "' + this.inputNome.val() + '", "unidade": ' + this.inputUnidade.val() + ', "id": ' + this.idItem + ', "version": ' + this.versionItem + ' }';
    };

    return FormEdicaoItem;

  })(App.PaginaEdicao);

  App.FormCriacaoItem = (function(_super) {

    __extends(FormCriacaoItem, _super);

    function FormCriacaoItem(modulo) {
      this.modulo = modulo;
      FormCriacaoItem.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoItem.prototype.desenharConteudoForm = function() {
      var divNome, divUnidade, labelNome, labelUnidade;
      divNome = $('<div data-role="fieldcontain">');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      divUnidade = $('<div data-role="fieldcontain">');
      this.form.append(divUnidade);
      labelUnidade = $('<label for="unidade">Unidade</label>');
      this.inputUnidade = $('<input name="unidade" id="unidade" placeholder="" value="" type="text">');
      divUnidade.append(labelUnidade);
      return divUnidade.append(this.inputUnidade);
    };

    FormCriacaoItem.prototype.montarJSON = function() {
      return '{ "nome": "' + this.inputNome.val() + '", "unidade": ' + this.inputUnidade.val() + ', "TipoItem": ' + this.modulo.idObjetoPai + ' }';
    };

    return FormCriacaoItem;

  })(App.PaginaCriacao);

  App.PaginaDetalhesItem = (function(_super) {

    __extends(PaginaDetalhesItem, _super);

    function PaginaDetalhesItem(modulo) {
      this.modulo = modulo;
      PaginaDetalhesItem.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesItem.prototype.carregar = function(registro) {
      return this.titulo.html("" + registro[this.modulo.propriedade]);
    };

    PaginaDetalhesItem.prototype.montarJSON = function() {
      return "{ 'item do tipoitem', 'itens': '" + (this.inputItens.val()) + "' }";
    };

    return PaginaDetalhesItem;

  })(App.PaginaDetalhes);

  App.ModuloItem = (function(_super) {

    __extends(ModuloItem, _super);

    function ModuloItem(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloItem.__super__.constructor.call(this, 'Itens', 'itens', 'nome', this.moduloPai);
    }

    ModuloItem.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoItem(this);
    };

    ModuloItem.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoItem(this);
    };

    ModuloItem.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesItem(this);
    };

    ModuloItem.prototype.abrirItem = function(idItem) {
      return alert("ver item " + idItem);
    };

    ModuloItem.prototype.prepararLinhaListagem = function(registro) {
      return registro[this.propriedade];
    };

    return ModuloItem;

  })(App.SubModulo);

}).call(this);
