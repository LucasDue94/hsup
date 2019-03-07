package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String id
    String descricao
    Integer estoque

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
