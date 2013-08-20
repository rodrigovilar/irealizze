(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.App = {};

  App.atualizarGUI = function(page) {
    return page.trigger('create');
  };

  App.Pagina = (function() {

    function Pagina(modulo, idMae) {
      var body;
      this.modulo = modulo;
      this.idMae = idMae;
      this.enviarPost = __bind(this.enviarPost, this);

      this.enviarPut = __bind(this.enviarPut, this);

      body = $("body");
      this.page = $('<div data-role="page" data-theme="a" id="' + this.getId() + '">"');
      this.header = $('<div data-role="header" data-theme="a"><h1>iRealizze</h1></div>');
      this.content = $('<div data-role="content" data-theme="a" id="' + this.getId() + 'content">');
      this.footer = $('<div data-role="footer" data-theme="a"><h4>Realizzare Empreendimentos Imobiliários LTDA</h4></div>');
      body.append(this.page);
      this.page.append(this.header);
      this.page.append(this.content);
      this.page.append(this.footer);
      this.page.page();
    }

    Pagina.prototype.getId = function() {
      return "pagina" + this.modulo.url;
    };

    Pagina.prototype.atualizar = function() {
      return App.atualizarGUI(this.page);
    };

    Pagina.prototype.desenharConteudo = function() {
      return this.desenharBotaoVoltar();
    };

    Pagina.prototype.desenharBotaoVoltar = function() {
      return this.content.append($('<a data-role="button" data-inline="true" href="#' + this.idMae + '" data-icon="arrow-l" data-iconpos="left">Voltar</a>'));
    };

    Pagina.prototype.enviarPut = function(link, json, callback) {
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

    Pagina.prototype.enviarPost = function(link, json, callback) {
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

    return Pagina;

  })();

  App.PaginaListagem = (function(_super) {

    __extends(PaginaListagem, _super);

    function PaginaListagem(modulo, idMae) {
      this.modulo = modulo;
      this.idMae = idMae;
      PaginaListagem.__super__.constructor.call(this, this.modulo, this.idMae);
    }

    PaginaListagem.prototype.desenharConteudo = function(linkGet) {
      var _this = this;
      this.content.empty();
      this.lista = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
      this.content.append(this.lista);
      this.lista.append($('<li data-role="list-divider" role="heading">' + this.modulo.nome + '</li>'));
      this.desenharBotaoNovo();
      this.desenharBotaoVoltar();
      this.atualizar();
      return $.getJSON(linkGet, function(jsonObj) {
        $.each(jsonObj, function(i, registro) {
          return _this.listar(registro);
        });
        return _this.lista.listview('refresh');
      });
    };

    PaginaListagem.prototype.listar = function(registro) {
      var editar, li, linha, ver,
        _this = this;
      linha = this.modulo.prepararLinhaListagem(registro);
      ver = $("<a href='#" + this.modulo.paginaDetalhes.getId() + ("' data-transition='slide'>" + linha + "</a>"));
      editar = $("<a href='#" + this.modulo.paginaEdicao.getId() + "' data-transition='slide'>Editar</a>");
      li = $("<li data-theme='c' data-icon='edit'>");
      li.append(ver);
      li.append(editar);
      this.lista.append(li);
      ver.click(function() {
        return _this.modulo.abrirItem(registro.id);
      });
      return editar.click(function() {
        return _this.modulo.editarItem(registro.id, registro.version);
      });
    };

    PaginaListagem.prototype.desenharBotaoNovo = function() {
      var criar,
        _this = this;
      criar = $('<a data-role="button" data-inline="true" href="#criacao' + this.modulo.url + '" data-icon="create" data-iconpos="left">Criar</a>');
      this.content.append(criar);
      return criar.click(function() {
        return _this.modulo.novoItem();
      });
    };

    return PaginaListagem;

  })(App.Pagina);

  App.PaginaDetalhes = (function(_super) {

    __extends(PaginaDetalhes, _super);

    function PaginaDetalhes(modulo) {
      this.modulo = modulo;
      PaginaDetalhes.__super__.constructor.call(this, this.modulo, this.modulo.paginaListagem.getId());
    }

    PaginaDetalhes.prototype.getId = function() {
      return "detalhes" + this.modulo.url;
    };

    PaginaDetalhes.prototype.abrir = function(idItem) {
      var _this = this;
      this.idItem = idItem;
      this.desenharConteudo();
      return $.getJSON(this.modulo.url + "/" + this.idItem, function(jsonObj) {
        _this.carregar(jsonObj);
        return _this.atualizar();
      });
    };

    PaginaDetalhes.prototype.desenharConteudo = function() {
      this.content.empty();
      this.titulo = $("<div>" + this.modulo.nome + " </div>");
      this.content.append(this.titulo);
      this.desenharBotaoVoltar();
      return this.atualizar();
    };

    PaginaDetalhes.prototype.carregar = function(registro) {
      return this.titulo.html("" + this.modulo.nome + " " + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhes;

  })(App.Pagina);

  App.PaginaEdicao = (function(_super) {

    __extends(PaginaEdicao, _super);

    function PaginaEdicao(modulo) {
      this.modulo = modulo;
      this.salvar = __bind(this.salvar, this);

      PaginaEdicao.__super__.constructor.call(this, this.modulo, this.modulo.paginaListagem.getId());
      this.form = $('<form>');
      this.content.append(this.form);
      this.desenharBotaoVoltar();
    }

    PaginaEdicao.prototype.getId = function() {
      return "edicao" + this.modulo.url;
    };

    PaginaEdicao.prototype.desenharConteudo = function() {
      return this.form.empty();
    };

    PaginaEdicao.prototype.abrir = function(idItem, versionItem) {
      var _this = this;
      this.idItem = idItem;
      this.versionItem = versionItem;
      this.desenharConteudo();
      return $.getJSON(this.modulo.url + "/" + this.idItem, function(jsonObj) {
        _this.desenharConteudoForm(jsonObj);
        _this.desenharBotaoSalvar();
        return _this.atualizar();
      });
    };

    PaginaEdicao.prototype.desenharConteudoForm = function(jsonObj) {};

    PaginaEdicao.prototype.desenharBotaoSalvar = function() {
      var submit,
        _this = this;
      submit = $('<a href="#' + this.idMae + '" data-role="button" data-inline="true" data-icon="arrow-l" data-iconpos="left">Salvar</a>');
      this.form.append(submit);
      return submit.click(function() {
        return _this.salvar();
      });
    };

    PaginaEdicao.prototype.salvar = function() {
      var json,
        _this = this;
      json = this.montarJSON();
      return this.enviarPut(this.modulo.url, json, function() {
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

    function PaginaCriacao(modulo) {
      this.modulo = modulo;
      this.salvar = __bind(this.salvar, this);

      PaginaCriacao.__super__.constructor.call(this, this.modulo, this.modulo.paginaListagem.getId());
      this.form = $('<form>');
      this.content.append(this.form);
      this.desenharBotaoVoltar();
    }

    PaginaCriacao.prototype.getId = function() {
      return "criacao" + this.modulo.url;
    };

    PaginaCriacao.prototype.desenharConteudo = function() {
      return this.form.empty();
    };

    PaginaCriacao.prototype.abrir = function() {
      this.desenharConteudo();
      this.desenharConteudoForm();
      this.desenharBotaoSalvar();
      return this.atualizar();
    };

    PaginaCriacao.prototype.desenharConteudoForm = function() {};

    PaginaCriacao.prototype.desenharBotaoSalvar = function() {
      var submit,
        _this = this;
      submit = $('<a href="#' + this.idMae + '" data-role="button" data-inline="true" data-icon="arrow-l" data-iconpos="left">Criar</a>');
      this.form.append(submit);
      return submit.click(function() {
        return _this.salvar();
      });
    };

    PaginaCriacao.prototype.salvar = function() {
      var json,
        _this = this;
      json = this.montarJSON();
      return this.enviarPost(this.modulo.url, json, function() {
        return _this.modulo.abrir();
      });
    };

    PaginaCriacao.prototype.montarJSON = function() {
      return "{}";
    };

    return PaginaCriacao;

  })(App.Pagina);

  App.Modulo = (function() {

    function Modulo(nome, url, propriedade) {
      this.nome = nome;
      this.url = url;
      this.propriedade = propriedade;
      this.paginaListagem = this.criarPaginaListagem();
      this.paginaEdicao = this.criarPaginaEdicao();
      this.paginaCriacao = this.criarPaginaCriacao();
      this.paginaDetalhes = this.criarPaginaDetalhes();
    }

    Modulo.prototype.criarPaginaListagem = function() {
      return new App.PaginaListagem(this, "principal");
    };

    Modulo.prototype.criarPaginaEdicao = function() {
      return new App.PaginaEdicao(this);
    };

    Modulo.prototype.criarPaginaCriacao = function() {
      return new App.PaginaCriacao(this);
    };

    Modulo.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhes(this);
    };

    Modulo.prototype.abrir = function() {
      return this.paginaListagem.desenharConteudo(this.url);
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
      SubModulo.__super__.constructor.call(this, this.nome, this.urlFilho, this.propriedade);
    }

    SubModulo.prototype.criarPaginaListagem = function() {
      return new App.PaginaListagem(this, this.moduloPai.paginaDetalhes.getId());
    };

    SubModulo.prototype.abrir = function(idPai) {
      var link;
      if (idPai) {
        this.idObjetoPai = idPai;
      }
      link = this.moduloPai.url + '/' + this.idObjetoPai + '/' + this.urlFilho;
      return this.paginaListagem.desenharConteudo(link);
    };

    return SubModulo;

  })(App.Modulo);

}).call(this);
