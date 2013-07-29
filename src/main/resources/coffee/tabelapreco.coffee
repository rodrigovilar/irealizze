class App.FormEdicaoTabelaPreco extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
      
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div data-role="fieldcontain">')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">')
                
    divNome.append labelNome
    divNome.append @inputNome

    montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}' }"         
    
class App.FormCriacaoTabelaPreco extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    divNome = $('<div data-role="fieldcontain">')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">')
                
    divNome.append labelNome
    divNome.append @inputNome


   montarJSON: ->
    "{ 'nome': '#{@inputNome.val()}' }"                




class App.ModuloTabelaPreco extends App.Modulo
  constructor: () ->
    super('TabelaPreco', 'tabelasprecos', 'nome')
    
  criarPaginaEdicao: ->
    new App.FormEdicaoTabelaPreco(this)
  criarPaginaCriacao: ->
    new App.FormCriacaoTabelaPreco(this)
  
 
           
    
    