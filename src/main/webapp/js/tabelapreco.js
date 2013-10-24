(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.FormCriacaoTabelaPreco = (function(_super) {

    __extends(FormCriacaoTabelaPreco, _super);

    function FormCriacaoTabelaPreco(modulo) {
      this.modulo = modulo;
      FormCriacaoTabelaPreco.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoTabelaPreco.prototype.desenharConteudoForm = function() {
      return this.inputNome = App.inputCriacao(this.form, "nome", "Nome", "text");
    };

    FormCriacaoTabelaPreco.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "'}";
    };

    return FormCriacaoTabelaPreco;

  })(App.PaginaCriacao);

  App.FormEdicaoTabelaPreco = (function(_super) {

    __extends(FormEdicaoTabelaPreco, _super);

    function FormEdicaoTabelaPreco(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      FormEdicaoTabelaPreco.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    FormEdicaoTabelaPreco.prototype.desenharConteudoForm = function(jsonObj) {
      return this.inputNome = App.inputEdicao(this.form, "nome", "Nome", "text", jsonObj.nome);
    };

    FormEdicaoTabelaPreco.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'id': " + this.dados.idItem + ", 'version': " + this.dados.versionItem + " }";
    };

    return FormEdicaoTabelaPreco;

  })(App.PaginaEdicao);

  App.PaginaDetalhesTabelaPreco = (function(_super) {

    __extends(PaginaDetalhesTabelaPreco, _super);

    function PaginaDetalhesTabelaPreco(modulo) {
      this.modulo = modulo;
      PaginaDetalhesTabelaPreco.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhesTabelaPreco.prototype.carregar = function(registro) {
      var cabecalho, celulaItem, celulaPreco, link, precos, tabela;
      this.titulo.html("" + registro[this.modulo.propriedade]);
      tabela = $('<table>');
      this.pagina.append(tabela);
      cabecalho = $('<th>');
      tabela.append(cabecalho);
      celulaItem = $('<td>Item</td>');
      cabecalho.append(celulaItem);
      celulaPreco = $('<td>Preço</td>');
      cabecalho.append(celulaPreco);
      link = "tabelasprecos/" + registro.id + "/precos";
      precos = eval(registro.precos);
      return $.each(precos, function(i, preco) {
        var item, linha;
        linha = $('<tr>');
        tabela.append(linha);
        item = eval(preco.item);
        celulaItem = $('<td>' + item.nome + '</td>');
        linha.append(celulaItem);
        celulaPreco = $('<td>' + preco.valorUnitario + '</td>');
        return linha.append(celulaPreco);
      });
    };

    return PaginaDetalhesTabelaPreco;

  })(App.PaginaDetalhes);

  App.ModuloTabelaPreco = (function(_super) {

    __extends(ModuloTabelaPreco, _super);

    function ModuloTabelaPreco(paginaMae) {
      this.paginaMae = paginaMae;
      ModuloTabelaPreco.__super__.constructor.call(this, this.paginaMae, 'TabelaPreco', 'tabelasprecos', 'nome');
    }

    ModuloTabelaPreco.prototype.criarPaginaEdicao = function() {
      return new App.FormEdicaoTabelaPreco(this);
    };

    ModuloTabelaPreco.prototype.criarPaginaCriacao = function() {
      return new App.FormCriacaoTabelaPreco(this);
    };

    ModuloTabelaPreco.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhesTabelaPreco(this);
    };

    return ModuloTabelaPreco;

  })(App.Modulo);

}).call(this);
