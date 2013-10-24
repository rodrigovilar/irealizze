(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoProjeto = (function(_super) {

    __extends(FormCriacaoProjeto, _super);

    function FormCriacaoProjeto(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormCriacaoProjeto.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormCriacaoProjeto.prototype.desenharConteudoForm = function() {
      var divCliente, divNome, labelCliente, labelNome;
      divNome = $('<div>');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      divCliente = $('<div>');
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

  App.FormEdicaoProjeto = (function(_super) {

    __extends(FormEdicaoProjeto, _super);

    function FormEdicaoProjeto(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoProjeto.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoProjeto.prototype.desenharConteudoForm = function(jsonObj) {
      var divCliente, divNome, labelCliente, labelNome;
      divNome = $('<div>');
      this.form.append(divNome);
      labelNome = $('<label for="nome">Nome</label>');
      this.inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">');
      divNome.append(labelNome);
      divNome.append(this.inputNome);
      divCliente = $('<div>');
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

  App.PaginaDetalhesProjeto = (function(_super) {

    __extends(PaginaDetalhesProjeto, _super);

    function PaginaDetalhesProjeto(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      PaginaDetalhesProjeto.__super__.constructor.call(this, this.modulo, this.paginaMae);
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

    ModuloProjetos.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoProjeto(this, this.paginaListagem);
    };

    ModuloProjetos.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoProjeto(this, this.paginaListagem);
    };

    ModuloProjetos.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesProjeto(this, this.paginaListagem);
    };

    return ModuloProjetos;

  })(App.Modulo);

}).call(this);
