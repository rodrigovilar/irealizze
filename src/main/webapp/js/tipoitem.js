(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoTipoItem = (function(_super) {

    __extends(FormEdicaoTipoItem, _super);

    function FormEdicaoTipoItem(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoTipoItem.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoTipoItem.prototype.desenharConteudoForm = function(jsonObj) {
      var divNome, labelNome;
      divNome = $('<div>');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nom + '" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      ({
        montarJSON: function() {}
      });
      return "{ 'nome': '" + (this.inputNome.val()) + "' }";
    };

    return FormEdicaoTipoItem;

  })(App.PaginaEdicao);

  App.FormCriacaoTipoItem = (function(_super) {

    __extends(FormCriacaoTipoItem, _super);

    function FormCriacaoTipoItem(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormCriacaoTipoItem.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormCriacaoTipoItem.prototype.desenharConteudoForm = function() {
      var divNome, labelNome;
      divNome = $('<div>');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">');
      divNome.append(labelNome);
      return divNome.append(this.inputNome);
    };

    FormCriacaoTipoItem.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "' }";
    };

    return FormCriacaoTipoItem;

  })(App.PaginaCriacao);

  App.ModuloTipoItem = (function(_super) {

    __extends(ModuloTipoItem, _super);

    function ModuloTipoItem(paginaMae) {
      this.paginaMae = paginaMae;
      ModuloTipoItem.__super__.constructor.call(this, this.paginaMae, 'TipoItem', 'tipositens', 'nome');
    }

    ModuloTipoItem.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoTipoItem(this);
    };

    ModuloTipoItem.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoTipoItem(this);
    };

    return ModuloTipoItem;

  })(App.Modulo);

}).call(this);
