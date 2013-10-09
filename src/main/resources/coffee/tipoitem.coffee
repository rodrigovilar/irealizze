class App.FormEdicaoTipoItem extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nom + '" type="text">')
    divNome.append labelNome
    divNome.append @inputNome

    montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}' }"         
    
class App.FormCriacaoTipoItem extends App.PaginaCriacao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: () ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">')
    divNome.append labelNome
    divNome.append @inputNome

   montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}' }"                


class App.PaginaDetalhesTipoItem extends App.PaginaDetalhes
  constructor:(@modulo, @paginaMae)->
    super(@modulo, @paginaMae)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
    
    App.desenharBotao @pagina, 'Itens', =>
      @modulo.moduloItem.abrir(registro.id)


class App.ModuloTipoItem extends App.Modulo
  constructor: (@paginaMae) ->
    super(@paginaMae, 'TipoItem', 'tipositens', 'nome')
    @moduloItem = new App.ModuloItem(this)
        
  criarPaginaEdicao: ->
    new App.FormEdicaoTipoItem(this)

  criarPaginaCriacao: ->
    new App.FormCriacaoTipoItem(this)   
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesTipoItem(this, @paginaListagem)