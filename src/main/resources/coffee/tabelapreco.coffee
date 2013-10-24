class App.FormCriacaoTabelaPreco extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    @inputNome = App.inputCriacao(@form, "nome", "Nome", "text")

  montarJSON: ->
   "{ 'nome': '#{@inputNome.val()}'}"                


class App.FormEdicaoTabelaPreco extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
      
  desenharConteudoForm: (jsonObj) ->
    @inputNome = App.inputEdicao(@form, "nome", "Nome", "text", jsonObj.nome)

  montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}', 'id': #{@dados.idItem}, 'version': #{@dados.versionItem} }"                

    
class App.PaginaDetalhesTabelaPreco extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
     
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
    link = "tabelasprecos/" + registro.id + "/precos"
    
    precos = eval(registro.precos)
    
    $.each precos, (i, preco) =>
      linha = $('<tr>') 
      tabela.append linha
      @desenharLinha(linha, preco)

  desenharLinha: (linha, preco) ->  
    item = eval(preco.item)

    celulaItem = $('<td>' + item.nome + '</td>')
    linha.append celulaItem

    celulaPreco = $('<td>')
    inputPreco = $('<input min="0.00" step="0.01" value="' + preco.valorUnitario + '" type="number">')
    celulaPreco.append inputPreco
    linha.append celulaPreco

    tdMsg = $('<td>')
    divMsg = $('<div>')
    tdMsg.append divMsg
    linha.append tdMsg

    inputPreco.change =>
      divMsg.html "Atualizando" 
      preco.valorUnitario = inputPreco.val()
      preco.tabela = preco.tabela.id
      preco.item = preco.item.id  
      App.enviarPut "precos", JSON.stringify(preco), =>
        divMsg.html "Ok" 
    

class App.ModuloTabelaPreco extends App.Modulo
  constructor: (@paginaMae) ->
    super(@paginaMae, 'TabelaPreco', 'tabelasprecos', 'nome')
   
  criarPaginaEdicao: ->
    new App.FormEdicaoTabelaPreco(this)
  
  criarPaginaCriacao: ->
    new App.FormCriacaoTabelaPreco(this)
  
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesTabelaPreco(this)
