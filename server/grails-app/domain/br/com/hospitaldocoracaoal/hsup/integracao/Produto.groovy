package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String codigo
    String setor
    String descricao
    Long estoque


    static mapping = {
        datasource: 'hsup_homol.public'
        table name: 'produto', schema: 'hsup_homol.public'
        id generator: 'assigned', name: 'codigo'
        version false
    }
}
