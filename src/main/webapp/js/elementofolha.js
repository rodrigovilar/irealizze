(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoElementoFolha = (function(_super) {

    __extends(FormEdicaoElementoFolha, _super);

    function FormEdicaoElementoFolha(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoElementoFolha.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoElementoFolha.prototype.desenharConteudoForm = function(jsonObj) {
      var divQuantidade, divStatus, labelQuantidade, labelStatus;
      divQuantidade = $('<div>');
      this.form.append(divQuantidade);
      labelQuantidade = $('<label for="quantidade">Quantidade</label>');
      this.inputQuantidade = $('<input name="quantidade" id="quantidade" placeholder="" value="' + jsonObj.quantidade + '" type="text">');
      divQuantidade.append(labelQuantidade);
      divQuantidade.append(this.inputQuantidade);
      divStatus = $('<div>');
      this.form.append(divStatus);
      labelStatus = $('<label for="status">Status</label>');
      this.inputStatus = $('<input name="status" id="status" placeholder="" value="' + jsonObj.status + '" type="text">');
      divStatus.append(labelStatus);
      return divStatus.append(this.inputStatus);
    };

    FormEdicaoElementoFolha.prototype.montarJSON = function() {
      return '{ "quantidade": "' + this.inputQuantidade.val() + '", "status": "' + this.inputStatus.val() + '", "id": ' + this.idItem + ', "version": ' + this.versionItem + ' }';
    };

    return FormEdicaoElementoFolha;

  })(App.PaginaEdicao);

  App.FormCriacaoElementoFolha = (function(_super) {

    __extends(FormCriacaoElementoFolha, _super);

    function FormCriacaoElementoFolha(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormCriacaoElementoFolha.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormCriacaoElementoFolha.prototype.desenharConteudoForm = function(jsonObj) {
      var divQuantidade, divStatus, labelQuantidade, labelStatus;
      divQuantidade = $('<div>');
      this.form.append(divQuantidade);
      labelQuantidade = $('<label for="quantidade">Quantidade</label>');
      this.inputQuantidade = $('<input name="quantidade" id="quantidade" placeholder="" value="' + jsonObj.quantidade + '" type="text">');
      divQuantidade.append(labelQuantidade);
      divQuantidade.append(this.inputQuantidade);
      divStatus = $('<div>');
      this.form.append(divStatus);
      labelStatus = $('<label for="status">Status</label>');
      this.inputStatus = $('<input name="status" id="status" placeholder="" value="' + jsonObj.status + '" type="text">');
      divStatus.append(labelStatus);
      return divStatus.append(this.inputStatus);
    };

    FormCriacaoElementoFolha.prototype.montarJSON = function() {
      return '{ "quantidade": "' + this.inputQuantidade.val() + '", "status": "' + this.inputStatus.val() + '", "id": ' + this.idItem + ', "version": ' + this.versionItem + ' }';
    };

    return FormCriacaoElementoFolha;

  })(App.PaginaCriacao);

  App.PaginaDetalhesElementoFolha = (function(_super) {

    __extends(PaginaDetalhesElementoFolha, _super);

    function PaginaDetalhesElementoFolha(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      PaginaDetalhesElementoFolha.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    PaginaDetalhesElementoFolha.prototype.carregar = function(registro) {
      return this.titulo.html("" + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhesElementoFolha;

  })(App.PaginaDetalhes);

  App.ModuloElementoFolha = (function(_super) {

    __extends(ModuloElementoFolha, _super);

    function ModuloElementoFolha(moduloPai) {
      this.moduloPai = moduloPai;
      ModuloElementoFolha.__super__.constructor.call(this, 'ElementosFolhas', 'elementosfolhas', 'quantidade', 'status', this.moduloPai);
    }

    ModuloElementoFolha.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoElementoFolha(this, this.paginaListagem);
    };

    ModuloElementoFolha.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoElementoFolha(this, this.paginaListagem);
    };

    ModuloElementoFolha.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesElementoFolha(this, this.paginaListagem);
    };

    ModuloElementoFolha.prototype.abrirItem = function(idItem) {
      return alert("ver elementofolha " + idItem);
    };

    return ModuloElementoFolha;

  })(App.SubModulo);

}).call(this);
