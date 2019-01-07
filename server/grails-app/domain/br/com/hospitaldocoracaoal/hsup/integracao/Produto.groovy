package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String codigo
    String setor
    String descricao
    String estoque

    static mapping = {
        id generator: 'assigned', composite: ['codigo', 'setor']
        version false
    }


}
