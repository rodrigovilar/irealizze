(function() {
  var FormCriacaoProjeto, FormCriacaoResponsavel, FormEdicaoProjeto, FormEdicaoResponsavel, Modulo, ModuloProjetos, ModuloResponsaveis, Pagina, PaginaCriacao, PaginaEdicao, PaginaListagem, abrirTelaPrincipal, addMenu, atualizarGUI, iniciar,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  atualizarGUI = function(page) {
    return page.trigger('create');
  };

  Pagina = (function() {

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
      return atualizarGUI(this.page);
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

  PaginaListagem = (function(_super) {

    __extends(PaginaListagem, _super);

    function PaginaListagem(modulo, idMae) {
      this.modulo = modulo;
      this.idMae = idMae;
      PaginaListagem.__super__.constructor.call(this, this.modulo, this.idMae);
    }

    PaginaListagem.prototype.desenharConteudo = function() {
      var _this = this;
      this.content.empty();
      this.lista = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
      this.content.append(this.lista);
      this.lista.append($('<li data-role="list-divider" role="heading">' + this.modulo.nome + '</li>'));
      this.desenharBotaoNovo();
      this.desenharBotaoVoltar();
      this.atualizar();
      return $.getJSON(this.modulo.url, function(jsonObj) {
        $.each(jsonObj, function(i, registro) {
          return _this.listar(registro);
        });
        return _this.lista.listview('refresh');
      });
    };

    PaginaListagem.prototype.listar = function(registro) {
      var editar, li, ver,
        _this = this;
      ver = $("<a href='#'>" + registro[this.modulo.propriedade] + "</a>");
      editar = $("<a href='#" + this.modulo.paginaEdicao.getId() + "' data-transition='slide'>Editar</a>");
      li = $("<li data-theme='c' data-icon='edit'>");
      li.append(ver);
      li.append(editar);
      this.lista.append(li);
      ver.click(function() {
        return _this.modulo.abrirItem(registro.id);
      });
      return editar.click(function() {
        return _this.modulo.editarItem(registro.id);
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

  })(Pagina);

  PaginaEdicao = (function(_super) {

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

    PaginaEdicao.prototype.abrir = function(idItem) {
      var _this = this;
      this.idItem = idItem;
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
      return this.enviarPut(this.modulo.url + "/" + this.idItem, json, function() {
        return _this.modulo.abrir();
      });
    };

    PaginaEdicao.prototype.montarJSON = function() {
      return "{}";
    };

    return PaginaEdicao;

  })(Pagina);

  PaginaCriacao = (function(_super) {

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

  })(Pagina);

  FormEdicaoProjeto = (function(_super) {

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
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'cliente': '" + (this.inputCliente.val()) + "' }";
    };

    return FormEdicaoProjeto;

  })(PaginaEdicao);

  FormCriacaoResponsavel = (function(_super) {

    __extends(FormCriacaoResponsavel, _super);

    function FormCriacaoResponsavel(modulo) {
      this.modulo = modulo;
      FormCriacaoResponsavel.__super__.constructor.call(this, this.modulo);
    }

    FormCriacaoResponsavel.prototype.desenharConteudoForm = function() {
      var divLogin, labelLogin;
      divLogin = $('<div data-role="fieldcontain">');
      this.form.append(divLogin);
      labelLogin = $('<label for="login">Login</label>');
      this.inputLogin = $('<input name="login" id="login" placeholder="" value="" type="text">');
      divLogin.append(labelLogin);
      return divLogin.append(this.inputLogin);
    };

    return FormCriacaoResponsavel;

  })(PaginaCriacao);

  ({
    montarJSON: function() {
      return "{ 'login': '" + (this.inputLogin.val()) + "' }";
    }
  });

  FormCriacaoProjeto = (function(_super) {

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
      divCliente.append(labelCliente);
      return divCliente.append(this.inputCliente);
    };

    FormCriacaoProjeto.prototype.montarJSON = function() {
      return "{ 'nome': '" + (this.inputNome.val()) + "', 'cliente': '" + (this.inputCliente.val()) + "' }";
    };

    return FormCriacaoProjeto;

  })(PaginaCriacao);

  FormEdicaoResponsavel = (function(_super) {

    __extends(FormEdicaoResponsavel, _super);

    function FormEdicaoResponsavel(modulo) {
      this.modulo = modulo;
      FormEdicaoResponsavel.__super__.constructor.call(this, this.modulo);
    }

    FormEdicaoResponsavel.prototype.desenharConteudoForm = function(jsonObj) {
      var divLogin, labelLogin;
      divLogin = $('<div data-role="fieldcontain">');
      this.form.append(divLogin);
      labelLogin = $('<label for="login">Login</label>');
      this.inputLogin = $('<input name="login" id="login" placeholder="" value="' + jsonObj.login + '" type="text">');
      divLogin.append(labelLogin);
      return divLogin.append(this.inputLogin);
    };

    FormEdicaoResponsavel.prototype.montarJSON = function() {
      return "{ 'login': '" + (this.inputLogin.val()) + "' }";
    };

    return FormEdicaoResponsavel;

  })(PaginaEdicao);

  Modulo = (function() {

    function Modulo(lista, nome, url, propriedade) {
      this.lista = lista;
      this.nome = nome;
      this.url = url;
      this.propriedade = propriedade;
      this.paginaListagem = new PaginaListagem(this, "principal");
      this.paginaEdicao = this.criarPaginaEdicao();
      this.paginaCriacao = this.criarPaginaCriacao();
    }

    Modulo.prototype.criarPaginaEdicao = function() {
      return new PaginaEdicao(this);
    };

    Modulo.prototype.criarPaginaCriacao = function() {
      return new PaginaCriacao(this);
    };

    Modulo.prototype.abrir = function() {
      return this.paginaListagem.desenharConteudo();
    };

    Modulo.prototype.novoItem = function() {
      return this.paginaCriacao.abrir();
    };

    Modulo.prototype.abrirItem = function(idItem) {
      return alert("ver " + idItem);
    };

    Modulo.prototype.editarItem = function(idItem) {
      return this.paginaEdicao.abrir(idItem);
    };

    return Modulo;

  })();

  ModuloProjetos = (function(_super) {

    __extends(ModuloProjetos, _super);

    function ModuloProjetos(lista) {
      this.lista = lista;
      ModuloProjetos.__super__.constructor.call(this, this.lista, 'Projetos', 'projetos', 'nome');
    }

    ModuloProjetos.prototype.criarPaginaEdicao = function() {
      return new FormEdicaoProjeto(this);
    };

    ModuloProjetos.prototype.criarPaginaCriacao = function() {
      return new FormCriacaoProjeto(this);
    };

    ModuloProjetos.prototype.abrirItem = function(idItem) {
      return alert("ver projeto " + idItem);
    };

    return ModuloProjetos;

  })(Modulo);

  addMenu = function(menu, modulo) {
    var item;
    item = $('<li data-theme="c"><a href="#' + modulo.paginaListagem.getId() + '" data-transition="slide">' + modulo.nome + '</a></li>');
    menu.append(item);
    return item.click(function() {
      return modulo.abrir();
    });
  };

  ModuloResponsaveis = (function(_super) {

    __extends(ModuloResponsaveis, _super);

    function ModuloResponsaveis(lista) {
      this.lista = lista;
      ModuloResponsaveis.__super__.constructor.call(this, this.lista, 'Responsavel', 'responsaveis', 'login');
    }

    ModuloResponsaveis.prototype.criarPaginaEdicao = function() {
      return new FormEdicaoResponsavel(this);
    };

    ModuloResponsaveis.prototype.criarPaginaCriacao = function() {
      return new FormCriacaoResponsavel(this);
    };

    ModuloResponsaveis.prototype.abrirItem = function(idItem) {
      return alert("ver responsavel " + idItem);
    };

    return ModuloResponsaveis;

  })(Modulo);

  addMenu = function(menu, modulo) {
    var item;
    item = $('<li data-theme="c"><a href="#' + modulo.paginaListagem.getId() + '" data-transition="slide">' + modulo.nome + '</a></li>');
    menu.append(item);
    return item.click(function() {
      return modulo.abrir();
    });
  };

  abrirTelaPrincipal = function() {
    var content, menu;
    content = $("div[data-role='content']");
    content.empty();
    menu = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
    content.append(menu);
    menu.append('<li data-role="list-divider" role="heading">Módulos</li>');
    addMenu(menu, new ModuloProjetos(content));
    addMenu(menu, new ModuloResponsaveis(content));
    addMenu(menu, new Modulo(content, 'Itens', 'tipositens', 'nome'));
    return addMenu(menu, new Modulo(content, 'Preço', 'tabelasprecos', 'nome'));
  };

  iniciar = function() {
    abrirTelaPrincipal();
    return $("#principal").page();
  };

  $(function() {
    iniciar();
    return atualizarGUI($('#principal'));
  });

}).call(this);
