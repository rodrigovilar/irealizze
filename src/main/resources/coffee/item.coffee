class App.FormEdicaoItem extends App.PaginaEdicao
  constructor: (@modulo, @paginaMae) ->
    super(@modulo, @paginaMae)
    
  desenharConteudoForm: (jsonObj) ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="' + jsonObj.nome + '" type="text">')          
    divNome.append labelNome
    divNome.append @inputNome

    divUnidade = $('<div>')
    @form.append divUnidade    
    labelUnidade = $('<label for="unidade">Unidade</label>')        
    @inputUnidade = $('<input name="unidade" id="unidade" placeholder="" value="' + jsonObj.unidade + '" type="text">')             
    divUnidade.append labelUnidade
    divUnidade.append @inputUnidade

  montarJSON: ->
    '{ "nome": "' + @inputNome.val() + '", "unidade": "' + @inputUnidade.val() + 
      '", "tipoitem": ' + @modulo.idObjetoPai + ', "id": ' + @idItem + ', "version": ' + @versionItem + ' }'                

class App.FormCriacaoItem extends App.PaginaCriacao
  constructor: (@modulo) ->
    super(@modulo)
    
  desenharConteudoForm: () ->
    divNome = $('<div>')
    @form.append divNome    
    labelNome = $('<label for="nome">Nome</label>')        
    @inputNome = $('<input name="nome" id="nome" placeholder="" value="" type="text">')
                
    divNome.append labelNome
    divNome.append @inputNome
    
    divUnidade = $('<div>')
    @form.append divUnidade    
    labelUnidade = $('<label for="unidade">Unidade</label>')        
    @inputUnidade = $('<input name="unidade" id="unidade" placeholder="" value="" type="text">')
                
    divUnidade.append labelUnidade
    divUnidade.append @inputUnidade

  montarJSON: ->
    j = '{ "nome": "' + @inputNome.val() + '", "unidade": "' + @inputUnidade.val() + '", "tipoitem": ' + @modulo.idObjetoPai + ' }'                
    alert j
    return j

class App.PaginaDetalhesItem extends App.PaginaDetalhes
  constructor:(@modulo)->
    super(@modulo)
  
  carregar: (registro) ->
    @titulo.html "#{registro[@modulo.propriedade]}"
        
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