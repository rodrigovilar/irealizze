class App.FormCriacaoItem extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    @inputNome = App.inputCriacao(@form, "nome", "Nome", "text")
    @inputUnidade = App.inputCriacao(@form, "unidade", "Unidade", "text")
    
  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "unidade": "' + @inputUnidade.val() + '", "tipoitem": ' + @modulo.idObjetoPai + ' }' 


class App.FormEdicaoItem extends App.PaginaEdicao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: (jsonObj) ->
    @inputNome = App.inputEdicao(@form, "nome", "Nome", "text", jsonObj.nome)
    @inputUnidade = App.inputEdicao(@form, "unidade", "Unidade", "text", jsonObj.unidade)

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "unidade": "' + @inputUnidade.val() + 
      '", "tipoitem": ' + @modulo.idObjetoPai + ', "id": ' + @dados.idItem + 
      ', "version": ' + @dados.versionItem + ' }'                
    

class App.PaginaDetalhesItem extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
    
    App.desenharBotao @pagina, 'ElementosFolhas', =>
      @modulo.moduloElementoFolha.abrir(registro.id)
        
        
class App.ModuloItem extends App.SubModulo
  constructor: (@moduloPai) ->
    super('Itens', 'itens', 'nome', @moduloPai)
    
  criarPaginaEdicao: ->
    new App.FormEdicaoItem(this)
    
  criarPaginaCriacao: ->
    new App.FormCriacaoItem(this)
    
  criarPaginaDetalhes: ->
    new App.PaginaDetalhesItem(this)  
  
  abrirItem: (idItem) ->
    alert "ver item " + idItem
    
  prepararLinhaListagem: (registro) ->
    return registro[@propriedade]