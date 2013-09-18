(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoTabelaPreco = (function(_super) {

    __extends(FormEdicaoTabelaPreco, _super);

    function FormEdicaoTabelaPreco(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoTabelaPreco.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoTabelaPreco.prototype.desenharConteudoForm = function(jsonObj) {
      var divNome, labelNome;
      divNome = $('<div>');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      ({
        montarJSON: function() {}
      });
      return "{ 'nome': '" + (this.inputNome.val()) + "' }";
    };

    return FormEdicaoTabelaPreco;

  })(App.PaginaEdicao);

  App.FormCriacaoTabelaPreco = (function(_super) {

    __extends(FormCriacaoTabelaPreco, _super);

    function FormCriacaoTabelaPreco(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormCriacaoTabelaPreco.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormCriacaoTabelaPreco.prototype.desenharConteudoForm = function() {
      var divNome, labelNome;
      divNome = $('<div>');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">');
      divNome.append(labelNome);
      return divNome.append(this.inputNome);
    };

    FormCriacaoTabelaPreco.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "' }";
    };

    return FormCriacaoTabelaPreco;

  })(App.PaginaCriacao);

  App.ModuloTabelaPreco = (function(_super) {

    __extends(ModuloTabelaPreco, _super);

    function ModuloTabelaPreco(paginaMae) {
      this.paginaMae = paginaMae;
      ModuloTabelaPreco.__super__.constructor.call(this, this.paginaMae, 'TabelaPreco', 'tabelasprecos', 'nome');
    }

    ModuloTabelaPreco.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoTabelaPreco(this, this.paginaListagem);
    };

    ModuloTabelaPreco.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoTabelaPreco(this, this.paginaListagem);
    };

    return ModuloTabelaPreco;

  })(App.Modulo);

}).call(this);
