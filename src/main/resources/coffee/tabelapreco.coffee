class App.FormEdicaoTabelaPreco extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
      
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">')
    divNome.append labelNome
    divNome.append @inputNome

    montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}' }"         
    
class App.FormCriacaoTabelaPreco extends App.PaginaCriacao
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


class App.ModuloTabelaPreco extends App.Modulo
  constructor: (@paginaMae) ->
    super(@paginaMae, 'TabelaPreco', 'tabelasprecos', 'nome')
    
  criarPaginaEdicao: ->
    new App.FormEdicaoTabelaPreco(this, @paginaListagem)

  criarPaginaCriacao: ->
    new App.FormCriacaoTabelaPreco(this, @paginaListagem)
  