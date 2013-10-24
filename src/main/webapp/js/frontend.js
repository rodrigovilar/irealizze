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

  App.dataJson2Gui = function(formatoAAAAMMDD) {
    var formatoDDMMAAAA;
    formatoDDMMAAAA = formatoAAAAMMDD.split('-').reverse().join('/');
    return formatoDDMMAAAA;
  };

  App.novaPagina = function() {
    var body, pagina;
    body = $("body");
    body.empty();
    pagina = $('<div>');
    body.append(pagina);
    return pagina;
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

  App.inputCriacao = function(formEl, id, label, type) {
    var div, inputEl, labelEl;
    div = $('<div>');
    formEl.append(div);
    labelEl = $('<label for="' + id + '">' + label + '</label>');
    inputEl = $('<input name="' + id + '" id="' + id + '" type="' + type + '">');
    div.append(labelEl);
    div.append(inputEl);
    return inputEl;
  };

  App.inputEdicao = function(formEl, id, label, type, value) {
    var div, inputEl, labelEl;
    div = $('<div>');
    formEl.append(div);
    labelEl = $('<label for="' + id + '">' + label + '</label>');
    inputEl = $('<input name="' + id + '" id="' + id + '" value="' + value + '" type="' + type + '">');
    div.append(labelEl);
    div.append(inputEl);
    return inputEl;
  };

  App.Pagina = (function() {

    function Pagina(modulo) {
      this.modulo = modulo;
    }

    Pagina.prototype.configurar = function(dados) {
      this.dados = dados;
    };

    Pagina.prototype.abrir = function() {
      this.mudarPagina();
      return this.desenharBotaoVoltar();
    };

    Pagina.prototype.mudarPagina = function() {
      return this.pagina = App.novaPagina();
    };

    Pagina.prototype.desenharBotaoVoltar = function() {
      var _this = this;
      return App.desenharBotao(this.pagina, 'Voltar', function() {
        return _this.dados.paginaMae.abrir();
      });
    };

    return Pagina;

  })();

  App.PaginaListagem = (function(_super) {

    __extends(PaginaListagem, _super);

    function PaginaListagem(modulo) {
      this.modulo = modulo;
      this.abrir = __bind(this.abrir, this);

      PaginaListagem.__super__.constructor.call(this, this.modulo);
    }

    PaginaListagem.prototype.abrir = function() {
      var _this = this;
      this.mudarPagina();
      this.pagina.append($('<p>' + this.modulo.nome + '</p>'));
      this.desenharBotaoNovo();
      this.lista = $('<table>');
      this.pagina.append(this.lista);
      this.desenharBotaoVoltar();
      return $.getJSON(this.dados.url, function(jsonObj) {
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

    function PaginaDetalhes(modulo) {
      this.modulo = modulo;
      PaginaDetalhes.__super__.constructor.call(this, this.modulo);
    }

    PaginaDetalhes.prototype.abrir = function() {
      var _this = this;
      this.mudarPagina();
      this.titulo = $("<div>" + this.modulo.nome + " </div>");
      this.pagina.append(this.titulo);
      this.desenharBotaoVoltar();
      return $.getJSON(this.modulo.url + "/" + this.dados.idItem, function(jsonObj) {
        return _this.carregar(jsonObj);
      });
    };

    PaginaDetalhes.prototype.carregar = function(registro) {
      return this.titulo.html("" + this.modulo.nome + " " + registro[this.modulo.propriedade]);
    };

    return PaginaDetalhes;

  })(App.Pagina);

  App.PaginaCriacao = (function(_super) {

    __extends(PaginaCriacao, _super);

    function PaginaCriacao(modulo) {
      this.modulo = modulo;
      this.salvar = __bind(this.salvar, this);

      PaginaCriacao.__super__.constructor.call(this, this.modulo);
    }

    PaginaCriacao.prototype.abrir = function() {
      this.mudarPagina();
      this.form = $('<form>');
      this.pagina.append(this.form);
      this.desenharBotaoVoltar();
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

  App.PaginaEdicao = (function(_super) {

    __extends(PaginaEdicao, _super);

    function PaginaEdicao(modulo) {
      this.modulo = modulo;
      this.salvar = __bind(this.salvar, this);

      PaginaEdicao.__super__.constructor.call(this, this.modulo);
    }

    PaginaEdicao.prototype.abrir = function() {
      var _this = this;
      this.mudarPagina();
      this.form = $('<form>');
      this.pagina.append(this.form);
      this.desenharBotaoVoltar();
      return $.getJSON(this.modulo.url + "/" + this.dados.idItem, function(jsonObj) {
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

  App.Modulo = (function() {

    function Modulo(paginaMae, nome, url, propriedade) {
      var dados;
      this.paginaMae = paginaMae;
      this.nome = nome;
      this.url = url;
      this.propriedade = propriedade;
      this.paginaListagem = this.criarPaginaListagem();
      this.configurarPaginaListagem();
      dados = {
        paginaMae: this.paginaListagem
      };
      this.paginaCriacao = this.criarPaginaCriacao();
      this.paginaCriacao.configurar(dados);
      this.paginaEdicao = this.criarPaginaEdicao();
      this.paginaEdicao.configurar(dados);
      this.paginaDetalhes = this.criarPaginaDetalhes();
      this.paginaDetalhes.configurar(dados);
    }

    Modulo.prototype.criarPaginaListagem = function() {
      return new App.PaginaListagem(this);
    };

    Modulo.prototype.configurarPaginaListagem = function() {
      var dados;
      dados = {
        paginaMae: this.paginaMae,
        url: this.url
      };
      return this.paginaListagem.configurar(dados);
    };

    Modulo.prototype.criarPaginaCriacao = function() {
      return new App.PaginaCriacao(this);
    };

    Modulo.prototype.criarPaginaEdicao = function() {
      return new App.PaginaEdicao(this);
    };

    Modulo.prototype.criarPaginaDetalhes = function() {
      return new App.PaginaDetalhes(this, this.paginaListagem);
    };

    Modulo.prototype.abrir = function() {
      return this.paginaListagem.abrir();
    };

    Modulo.prototype.novoItem = function() {
      return this.paginaCriacao.abrir();
    };

    Modulo.prototype.abrirItem = function(idItem) {
      var dados;
      dados = {
        paginaMae: this.paginaListagem,
        idItem: idItem
      };
      this.paginaDetalhes.configurar(dados);
      return this.paginaDetalhes.abrir();
    };

    Modulo.prototype.editarItem = function(idItem, versionItem) {
      var dados;
      dados = {
        paginaMae: this.paginaListagem,
        idItem: idItem,
        versionItem: versionItem
      };
      this.paginaEdicao.configurar(dados);
      return this.paginaEdicao.abrir();
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

    SubModulo.prototype.configurarPaginaListagem = function() {
      var dados;
      dados = {
        paginaMae: this.moduloPai.paginaDetalhes,
        url: this.url
      };
      return this.paginaListagem.configurar(dados);
    };

    SubModulo.prototype.abrir = function(idPai) {
      var dados, link;
      if (idPai) {
        this.idObjetoPai = idPai;
      }
      link = this.moduloPai.url + '/' + this.idObjetoPai + '/' + this.urlFilho;
      if (this.moduloPai.urlFilho) {
        link = this.moduloPai.urlFilho + '/' + this.idObjetoPai + '/' + this.urlFilho;
      }
      dados = {
        paginaMae: this.moduloPai.paginaDetalhes,
        url: link
      };
      this.paginaListagem.configurar(dados);
      return this.paginaListagem.abrir();
    };

    return SubModulo;

  })(App.Modulo);

}).call(this);
