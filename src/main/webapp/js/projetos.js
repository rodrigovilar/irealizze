(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoProjeto = (function(_super) {

    __extends(FormCriacaoProjeto, _super);

    function FormCriacaoProjeto(modulo) {
      this.modulo = modulo;
      FormCriacaoProjeto.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoProjeto.prototype.desenharConteudoForm = function() {
      this.inputNome = App.inputCriacao(this.form, "nome", "Nome", "text");
      return this.inputCliente = App.inputCriacao(this.form, "cliente", "Cliente", "text");
    };

    FormCriacaoProjeto.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'cliente': '" + (this.inputCliente.val()) + "' }";
    };

    return FormCriacaoProjeto;

  })(App.PaginaCriacao);

  App.FormEdicaoProjeto = (function(_super) {

    __extends(FormEdicaoProjeto, _super);

    function FormEdicaoProjeto(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoProjeto.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoProjeto.prototype.desenharConteudoForm = function(jsonObj) {
      this.inputNome = App.inputEdicao(this.form, "nome", "Nome", "text", jsonObj.nome);
      return this.inputCliente = App.inputEdicao(this.form, "cliente", "Cliente", "text", jsonObj.cliente);
    };

    FormEdicaoProjeto.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'cliente': '" + (this.inputCliente.val()) + "', 'id': " + this.dados.idItem + ", 'version': " + this.dados.versionItem + " }";
    };

    return FormEdicaoProjeto;

  })(App.PaginaEdicao);

  App.PaginaDetalhesProjeto = (function(_super) {

    __extends(PaginaDetalhesProjeto, _super);

    function PaginaDetalhesProjeto(modulo) {
      this.modulo = modulo;
      PaginaDetalhesProjeto.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesProjeto.prototype.carregar = function(registro) {
      var _this = this;
      this.titulo.html("" + registro[this.modulo.propriedade]);
      App.desenharBotao(this.pagina, 'Períodos', function() {
        return _this.modulo.moduloPeriodo.abrir(registro.id);
      });
      return App.desenharBotao(this.pagina, 'Elementos', function() {
        return _this.modulo.moduloElemento.abrir(registro.id);
      });
    };

    return PaginaDetalhesProjeto;

  })(App.PaginaDetalhes);

  App.ModuloProjetos = (function(_super) {

    __extends(ModuloProjetos, _super);

    function ModuloProjetos(paginaMae) {
      this.paginaMae = paginaMae;
      ModuloProjetos.__super__.constructor.call(this, this.paginaMae, 'Projetos', 'projetos', 'nome');
      this.moduloPeriodo = new App.ModuloPeriodos(this);
      this.moduloElemento = new App.ModuloElementos(this);
    }

    ModuloProjetos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoProjeto(this);
    };

    ModuloProjetos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoProjeto(this);
    };

    ModuloProjetos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesProjeto(this);
    };

    return ModuloProjetos;

  })(App.Modulo);

}).call(this);
