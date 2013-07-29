(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormEdicaoProjeto = (function(_super) {

    __extends(FormEdicaoProjeto, _super);

    function FormEdicaoProjeto(modulo) {
      this.modulo = modulo;
      FormEdicaoProjeto.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoProjeto.prototype.desenharConteudoForm = function(jsonObj) {
      var divCliente, divNome, labelCliente, labelNome;
      divNome = $('<div data-role="fieldcontain">');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      divCliente = $('<div data-role="fieldcontain">');
      this.form.append(divCliente);
      labelCliente = $('<label for="cliente">Cliente</label>');
      this.inputCliente = $('<input name="cliente" id="cliente" placeholder="" value="' + jsonObj.cliente + '" type="text">');
      divNome.append(labelCliente);
      return divNome.append(this.inputCliente);
    };

    FormEdicaoProjeto.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'cliente': '" + (this.inputCliente.val()) + "', 'id': " + this.idItem + ", 'version': " + this.versionItem + " }";
    };

    return FormEdicaoProjeto;

  })(App.PaginaEdicao);

  App.FormCriacaoProjeto = (function(_super) {

    __extends(FormCriacaoProjeto, _super);

    function FormCriacaoProjeto(modulo) {
      this.modulo = modulo;
      FormCriacaoProjeto.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoProjeto.prototype.desenharConteudoForm = function() {
      var divCliente, divNome, labelCliente, labelNome;
      divNome = $('<div data-role="fieldcontain">');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      divCliente = $('<div data-role="fieldcontain">');
      this.form.append(divCliente);
      labelCliente = $('<label for="cliente">Cliente</label>');
      this.inputCliente = $('<input name="cliente" id="cliente" placeholder="" value="" type="text">');
      divNome.append(labelCliente);
      return divNome.append(this.inputCliente);
    };

    FormCriacaoProjeto.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'cliente': '" + (this.inputCliente.val()) + "' }";
    };

    return FormCriacaoProjeto;

  })(App.PaginaCriacao);

  App.PaginaDetalhesProjeto = (function(_super) {

    __extends(PaginaDetalhesProjeto, _super);

    function PaginaDetalhesProjeto(modulo) {
      this.modulo = modulo;
      PaginaDetalhesProjeto.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesProjeto.prototype.carregar = function(registro) {
      var botaoPeriodos,
        _this = this;
      this.titulo.html("" + registro[this.modulo.propriedade]);
      botaoPeriodos = $('<a data-role="button" data-inline="true" href="#' + this.modulo.moduloPeriodo.paginaListagem.getId() + '" data-icon="create" data-iconpos="left">Per�odos</a>');
      this.content.append(botaoPeriodos);
      return botaoPeriodos.click(function() {
        return _this.modulo.moduloPeriodo.abrir(registro.id);
      });
    };

    PaginaDetalhesProjeto.prototype.montarJSON = function() {
      return "{ 'periodo do projeto', 'periodos': '" + (this.inputPeriodos.val()) + "' }";
    };

    return PaginaDetalhesProjeto;

  })(App.PaginaDetalhes);

  App.ModuloProjetos = (function(_super) {

    __extends(ModuloProjetos, _super);

    function ModuloProjetos() {
      ModuloProjetos.__super__.constructor.call(this, 'Projetos', 'projetos', 'nome');
      this.moduloPeriodo = new App.ModuloPeriodos(this);
    }

    ModuloProjetos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoProjeto(this);
    };

    ModuloProjetos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoProjeto(this);
    };

    ModuloProjetos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesProjeto(this);
    };

    return ModuloProjetos;

  })(App.Modulo);

}).call(this);
