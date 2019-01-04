package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String codigo
    String setor
    String descricao
    String estoque
    String bloqueado

    static mapping = {
        id generator: 'assigned', composite: ['codigo', 'setor']
        version false
    }


}
