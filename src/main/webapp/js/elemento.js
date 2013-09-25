(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoElemento = (function(_super) {

    __extends(FormEdicaoElemento, _super);

    function FormEdicaoElemento(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoElemento.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoElemento.prototype.desenharConteudoForm = function(jsonObj) {
      var divNome, labelNome;
      divNome = $('<div>');
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

    function FormCriacaoElemento(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormCriacaoElemento.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormCriacaoElemento.prototype.desenharConteudoForm = function() {
      var divNome, labelNome;
      divNome = $('<div>');
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

    function PaginaDetalhesElemento(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      PaginaDetalhesElemento.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    PaginaDetalhesElemento.prototype.carregar = function(registro) {
      var _this = this;
      this.titulo.html("" + registro[this.modulo.propriedade]);
      return App.desenharBotao(this.pagina, 'ElementosFolhas', function() {
        return _this.modulo.moduloElementoFolha.abrir(registro.id);
      });
    };

    return PaginaDetalhesElemento;

  })(App.PaginaDetalhes);

  App.ModuloElementos = (function(_super) {

    __extends(ModuloElementos, _super);

    function ModuloElementos(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloElementos.__super__.constructor.call(this, 'Elementos', 'elementos', 'nome', this.moduloPai);
      this.moduloElementoFolha = new App.ModuloElementoFolha(this);
    }

    ModuloElementos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoElemento(this, this.paginaListagem);
    };

    ModuloElementos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoElemento(this, this.paginaListagem);
    };

    ModuloElementos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesElemento(this, this.paginaListagem);
    };

    return ModuloElementos;

  })(App.SubModulo);

}).call(this);
