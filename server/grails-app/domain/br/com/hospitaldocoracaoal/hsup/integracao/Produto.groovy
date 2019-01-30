package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String codigo
    String setor
    String descricao
    Long estoque
    String unidade_estoque

    static mapping = {
        datasource: 'hsup_homol.public'
        table name: 'produto', schema: 'hsup_homol.public'
        id generator: 'assigned', composite: ['codigo', 'setor']
        version false
    }
}
