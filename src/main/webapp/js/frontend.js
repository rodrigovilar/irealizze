(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.App = {};

  App.enviarPut = function(link, json, callback) {
    var dadosAjax, request,
      _this = this;
    dadosAjax = {
      type: "PUT",
      url: link,
      data: json,
      processData: true,
      contentType: "application/json",
      headers: {
        Accept: "application/json"
      }
    };
    request = $.ajax(dadosAjax);
    return request.always(function() {
      return callback();
    });
  };

  App.enviarPost = function(link, json, callback) {
    var dadosAjax, request,
      _this = this;
    dadosAjax = {
      type: "POST",
      url: link,
      data: json,
      processData: true,
      contentType: "application/json",
      headers: {
        Accept: "application/json"
      }
    };
    request = $.ajax(dadosAjax);
    return request.always(function() {
      return callback();
    });
  };

  App.desenharBotao = function(elemento, texto, callback) {
    var botao,
      _this = this;
    botao = $('<button type="button">' + texto + '</button>');
    elemento.append(botao);
    return botao.click(function() {
      return callback();
    });
  };

  App.Pagina = (function() {

    function Pagina(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
    }

    Pagina.prototype.getId = function() {
      return "pagina" + this.modulo.url;
    };

    Pagina.prototype.desenharConteudo = function() {
      this.mudarPagina();
      return this.desenharBotaoVoltar();
    };

    Pagina.prototype.mudarPagina = function() {
      var body;
      body = $("body");
      body.empty();
      this.pagina = $('<div id="' + this.getId() + '">"');
      return body.append(this.pagina);
    };

    Pagina.prototype.desenharBotaoVoltar = function() {
      var _this = this;
      return App.desenharBotao(this.pagina, 'Voltar', function() {
        return _this.paginaMae.desenharConteudo();
      });
    };

    return Pagina;

  })();

  App.PaginaListagem = (function(_super) {

    __extends(PaginaListagem, _super);

    function PaginaListagem(modulo, idMae, linkGet) {
      this.modulo = modulo;
      this.idMae = idMae;
      this.linkGet = linkGet;
      this.desenharConteudo = __bind(this.desenharConteudo, this);

      PaginaListagem.__super__.constructor.call(this, this.modulo, this.idMae);
    }

    PaginaListagem.prototype.desenharConteudo = function() {
      var _this = this;
      this.mudarPagina();
      this.pagina.append($('<p>' + this.modulo.nome + '</p>'));
      this.desenharBotaoNovo();
      this.lista = $('<table>');
      this.pagina.append(this.lista);
      this.desenharBotaoVoltar();
      return $.getJSON(this.linkGet, function(jsonObj) {
        return $.each(jsonObj, function(i, registro) {
          return _this.listar(registro);
        });
      });
    };

    PaginaListagem.prototype.listar = function(registro) {
      var editar, texto, tr, ver,
        _this = this;
      tr = $('<tr>');
      this.lista.append(tr);
      texto = this.modulo.prepararLinhaListagem(registro);
      ver = $("<td>" + texto + "</td>");
      tr.append(ver);
      editar = $("<td>Editar</td>");
      tr.append(editar);
      ver.click(function() {
        return _this.modulo.abrirItem(registro.id);
      });
      return editar.click(function() {
        return _this.modulo.editarItem(registro.id, registro.version);
      });
    };

    PaginaListagem.prototype.desenharBotaoNovo = function() {
      var _this = this;
      return App.desenharBotao(this.pagina, 'Criar', function() {
        return _this.modulo.novoItem();
      });
    };

    return PaginaListagem;

  })(App.Pagina);

  App.PaginaDetalhes = (function(_super) {

    __extends(PaginaDetalhes, _super);

    function PaginaDetalhes(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      PaginaDetalhes.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    PaginaDetalhes.prototype.getId = function() {
      return "detalhes" + this.modulo.url;
    };

    PaginaDetalhes.prototype.abrir = function(idItem) {
      var _this = this;
      this.idItem = idItem;
      this.desenharConteudo();
      return $.getJSON(this.modulo.url + "/" + this.idItem, function(jsonObj) {
        return _this.carregar(jsonObj);
      });
    };

    PaginaDetalhes.prototype.desenharConteudo = function() {
      this.mudarPagina();
      this.titulo = $("<div>" + this.modulo.nome + " </div>");
      this.pagina.append(this.titulo);
      return this.desenharBotaoVoltar();
    };

    PaginaDetalhes.prototype.carregar = function(registro) {
      return this.titulo.html("" + this.modulo.nome + " " + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhes;

  })(App.Pagina);

  App.PaginaEdicao = (function(_super) {

    __extends(PaginaEdicao, _super);

    function PaginaEdicao(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      this.salvar = __bind(this.salvar, this);

      PaginaEdicao.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    PaginaEdicao.prototype.getId = function() {
      return "edicao" + this.modulo.url;
    };

    PaginaEdicao.prototype.desenharConteudo = function() {
      this.mudarPagina();
      this.form = $('<form>');
      this.pagina.append(this.form);
      return this.desenharBotaoVoltar();
    };

    PaginaEdicao.prototype.abrir = function(idItem, versionItem) {
      var _this = this;
      this.idItem = idItem;
      this.versionItem = versionItem;
      this.desenharConteudo();
      return $.getJSON(this.modulo.url + "/" + this.idItem, function(jsonObj) {
        _this.desenharConteudoForm(jsonObj);
        return _this.desenharBotaoSalvar();
      });
    };

    PaginaEdicao.prototype.desenharConteudoForm = function(jsonObj) {};

    PaginaEdicao.prototype.desenharBotaoSalvar = function() {
      var _this = this;
      return App.desenharBotao(this.form, 'Salvar', function() {
        return _this.salvar();
      });
    };

    PaginaEdicao.prototype.salvar = function() {
      var json,
        _this = this;
      json = this.montarJSON();
      return App.enviarPut(this.modulo.url, json, function() {
        return _this.modulo.abrir();
      });
    };

    PaginaEdicao.prototype.montarJSON = function() {
      return "{}";
    };

    return PaginaEdicao;

  })(App.Pagina);

  App.PaginaCriacao = (function(_super) {

    __extends(PaginaCriacao, _super);

    function PaginaCriacao(modulo, paginaMae) {
      this.modulo = modulo;
      this.paginaMae = paginaMae;
      this.salvar = __bind(this.salvar, this);

      PaginaCriacao.__super__.constructor.call(this, this.modulo, this.paginaMae);
    }

    PaginaCriacao.prototype.getId = function() {
      return "criacao" + this.modulo.url;
    };

    PaginaCriacao.prototype.desenharConteudo = function() {
      this.mudarPagina();
      this.form = $('<form>');
      this.pagina.append(this.form);
      return this.desenharBotaoVoltar();
    };

    PaginaCriacao.prototype.abrir = function() {
      this.desenharConteudo();
      this.desenharConteudoForm();
      return this.desenharBotaoSalvar();
    };

    PaginaCriacao.prototype.desenharConteudoForm = function() {};

    PaginaCriacao.prototype.desenharBotaoSalvar = function() {
      var _this = this;
      return App.desenharBotao(this.form, 'Salvar', function() {
        return _this.salvar();
      });
    };

    PaginaCriacao.prototype.salvar = function() {
      var json,
        _this = this;
      json = this.montarJSON();
      return App.enviarPost(this.modulo.url, json, function() {
        return _this.modulo.abrir();
      });
    };

    PaginaCriacao.prototype.montarJSON = function() {
      return "{}";
    };

    return PaginaCriacao;

  })(App.Pagina);

  App.Modulo = (function() {

    function Modulo(paginaMae, nome, url, propriedade) {
      this.paginaMae = paginaMae;
      this.nome = nome;
      this.url = url;
      this.propriedade = propriedade;
      this.paginaListagem = this.criarPaginaListagem();
      this.paginaEdicao = this.criarPaginaEdicao();
      this.paginaCriacao = this.criarPaginaCriacao();
      this.paginaDetalhes = this.criarPaginaDetalhes();
    }

    Modulo.prototype.criarPaginaListagem = function() {
      return new App.PaginaListagem(this, this.paginaMae, this.url);
    };

    Modulo.prototype.criarPaginaEdicao = function() {
      return new App.PaginaEdicao(this, this.paginaListagem);
    };

    Modulo.prototype.criarPaginaCriacao = function() {
      return new App.PaginaCriacao(this, this.paginaListagem);
    };

    Modulo.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhes(this, this.paginaListagem);
    };

    Modulo.prototype.abrir = function() {
      return this.paginaListagem.desenharConteudo();
    };

    Modulo.prototype.novoItem = function() {
      return this.paginaCriacao.abrir();
    };

    Modulo.prototype.abrirItem = function(idItem) {
      return this.paginaDetalhes.abrir(idItem);
    };

    Modulo.prototype.editarItem = function(idItem, versionItem) {
      return this.paginaEdicao.abrir(idItem, versionItem);
    };

    Modulo.prototype.prepararLinhaListagem = function(registro) {
      return registro[this.propriedade];
    };

    return Modulo;

  })();

  App.SubModulo = (function(_super) {

    __extends(SubModulo, _super);

    function SubModulo(nome, urlFilho, propriedade, moduloPai) {
      this.nome = nome;
      this.urlFilho = urlFilho;
      this.propriedade = propriedade;
      this.moduloPai = moduloPai;
      SubModulo.__super__.constructor.call(this, this.moduloPai.paginaDetalhes, this.nome, this.urlFilho, this.propriedade);
    }

    SubModulo.prototype.criarPaginaListagem = function() {
      return new App.PaginaListagem(this, this.moduloPai.paginaDetalhes);
    };

    SubModulo.prototype.abrir = function(idPai) {
      var link;
      if (idPai) {
        this.idObjetoPai = idPai;
      }
      link = this.moduloPai.url + '/' + this.idObjetoPai + '/' + this.urlFilho;
      this.paginaListagem = new App.PaginaListagem(this, this.paginaMae, link);
      return this.paginaListagem.desenharConteudo();
    };

    return SubModulo;

  })(App.Modulo);

}).call(this);
