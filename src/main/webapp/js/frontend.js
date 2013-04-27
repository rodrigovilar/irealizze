(function() {
  var FormEdicaoProjeto, Modulo, ModuloProjetos, Pagina, PaginaEdicao, PaginaListagem, abrirTelaPrincipal, addMenu, atualizarGUI, iniciar,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  atualizarGUI = function(page) {
    return page.trigger('create');
  };

  Pagina = (function() {

    function Pagina(url, urlMae) {
      var body;
      this.url = url;
      this.urlMae = urlMae;
      this.enviarPut = __bind(this.enviarPut, this);

      this.myId = "pagina";
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
      return "pagina" + this.url;
    };

    Pagina.prototype.atualizar = function() {
      return atualizarGUI(this.page);
    };

    Pagina.prototype.desenharConteudo = function() {
      return this.desenharBotaoVoltar();
    };

    Pagina.prototype.desenharBotaoVoltar = function() {
      return this.content.append($('<a data-role="button" data-inline="true" href="#' + this.urlMae + '" data-icon="arrow-l" data-iconpos="left">Voltar</a>'));
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

    return Pagina;

  })();

  PaginaListagem = (function(_super) {

    __extends(PaginaListagem, _super);

    function PaginaListagem(url, urlMae, titulo) {
      this.url = url;
      this.urlMae = urlMae;
      this.titulo = titulo;
      PaginaListagem.__super__.constructor.call(this, this.url, this.urlMae);
    }

    PaginaListagem.prototype.desenharConteudo = function() {
      this.content.empty();
      this.lista = $('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
      this.content.append(this.lista);
      this.lista.append($('<li data-role="list-divider" role="heading">' + this.titulo + '</li>'));
      this.desenharBotaoVoltar();
      return this.atualizar();
    };

    return PaginaListagem;

  })(Pagina);

  PaginaEdicao = (function(_super) {

    __extends(PaginaEdicao, _super);

    function PaginaEdicao(url, titulo, modulo) {
      this.url = url;
      this.titulo = titulo;
      this.modulo = modulo;
      this.salvar = __bind(this.salvar, this);

      PaginaEdicao.__super__.constructor.call(this, this.url, this.modulo.paginaListagem.getId());
      this.form = $('<form>');
      this.content.append(this.form);
      this.desenharBotaoVoltar();
    }

    PaginaEdicao.prototype.getId = function() {
      return "edicao" + this.url;
    };

    PaginaEdicao.prototype.desenharConteudo = function() {
      return this.form.empty();
    };

    PaginaEdicao.prototype.abrir = function(idItem) {
      var _this = this;
      this.idItem = idItem;
      this.desenharConteudo();
      return $.getJSON(this.url + "/" + this.idItem, function(jsonObj) {
        _this.desenharConteudoForm(jsonObj);
        _this.desenharBotaoSalvar();
        return _this.atualizar();
      });
    };

    PaginaEdicao.prototype.desenharConteudoForm = function(jsonObj) {};

    PaginaEdicao.prototype.desenharBotaoSalvar = function() {
      var submit,
        _this = this;
      submit = $('<a href="#' + this.urlMae + '" data-role="button" data-inline="true" data-icon="arrow-l" data-iconpos="left">Salvar</a>');
      this.form.append(submit);
      return submit.click(function() {
        return _this.salvar();
      });
    };

    PaginaEdicao.prototype.salvar = function() {
      var json,
        _this = this;
      json = this.montarJSON();
      return this.enviarPut(this.url + "/" + this.idItem, json, function() {
        return _this.modulo.abrir();
      });
    };

    PaginaEdicao.prototype.montarJSON = function() {
      return "{}";
    };

    return PaginaEdicao;

  })(Pagina);

  FormEdicaoProjeto = (function(_super) {

    __extends(FormEdicaoProjeto, _super);

    function FormEdicaoProjeto(url, titulo, modulo) {
      this.url = url;
      this.titulo = titulo;
      this.modulo = modulo;
      FormEdicaoProjeto.__super__.constructor.call(this, this.url, this.titulo, this.modulo);
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

  Modulo = (function() {

    function Modulo(lista, nome, url, propriedade) {
      this.lista = lista;
      this.nome = nome;
      this.url = url;
      this.propriedade = propriedade;
      this.paginaListagem = new PaginaListagem(this.url, "#principal", this.nome);
      this.paginaEdicao = new PaginaEdicao(this.url, this.nome, this);
    }

    Modulo.prototype.abrir = function() {
      var _this = this;
      this.paginaListagem.desenharConteudo();
      return $.getJSON(this.url, function(jsonObj) {
        $.each(jsonObj, function(i, registro) {
          return _this.listar(registro);
        });
        return _this.paginaListagem.lista.listview('refresh');
      });
    };

    Modulo.prototype.listar = function(registro) {
      var editar, li, ver,
        _this = this;
      ver = $("<a href='#'>" + registro[this.propriedade] + "</a>");
      editar = $("<a href='#" + this.paginaEdicao.getId() + "' data-transition='slide'>Editar</a>");
      li = $("<li data-theme='c' data-icon='edit'>");
      li.append(ver);
      li.append(editar);
      this.paginaListagem.lista.append(li);
      ver.click(function() {
        return _this.abrirItem(registro.id);
      });
      return editar.click(function() {
        return _this.editarItem(registro.id);
      });
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
      this.paginaEdicao = new FormEdicaoProjeto(this.url, this.nome, this);
    }

    ModuloProjetos.prototype.abrirItem = function(idItem) {
      return alert("ver projeto " + idItem);
    };

    ModuloProjetos.prototype.editarItem = function(idItem) {
      return this.paginaEdicao.abrir(idItem);
    };

    return ModuloProjetos;

  })(Modulo);

  addMenu = function(menu, modulo) {
    var item;
    item = $('<li data-theme="c"><a href="#pagina' + modulo.url + '" data-transition="slide">' + modulo.nome + '</a></li>');
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
    addMenu(menu, new Modulo(content, 'Responsáveis', 'responsaveis', 'login'));
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
