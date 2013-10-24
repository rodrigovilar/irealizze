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
   "{ 'nome': '#{@inputNome.val()}'}"                


class App.PaginaDetalhesTabelaPreco extends App.PaginaDetalhes
  constructor:(@modulo, @paginaMae)->
    super(@modulo, @paginaMae)
     
  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}'}" 
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
    
    tabela = $('<table>')
    @pagina.append tabela
    
   
    cabecalho = $('<th>') 
    tabela.append cabecalho
    
    celulaItem = $('<td>Item</td>')
    cabecalho.append celulaItem
    
    celulaPreco = $('<td>Preço</td>')
    cabecalho.append celulaPreco
    
    $.getJSON "tabelasprecos/" + registro.id + "/precos", (jsonObj) =>
      $.each jsonObj, (i, preco) =>
        linha = $('<tr>') 
        tabela.append linha
    
        item = eval(preco.item)
        celulaItem = $('<td>' + item.nome + '</td>')
        linha.append celulaItem
    
        celulaPreco = $('<td>' + preco.valorUnitario + '</td>')
        linha.append celulaPreco
        

class App.ModuloTabelaPreco extends App.Modulo
  constructor: (@paginaMae) ->
    super(@paginaMae, 'TabelaPreco', 'tabelasprecos', 'nome')
   
  criarPaginaEdicao: ->
    new App.FormEdicaoTabelaPreco(this, @paginaListagem)
  
  criarPaginaCriacao: ->
    new App.FormCriacaoTabelaPreco(this, @paginaListagem)
  
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesTabelaPreco(this, @paginaListagem)