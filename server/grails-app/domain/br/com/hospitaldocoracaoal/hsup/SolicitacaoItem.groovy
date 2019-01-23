package br.com.hospitaldocoracaoal.hsup

class SolicitacaoItem implements Serializable {

    Solicitacao solicitacao
    Item item
    UnidadeMedida unidadeMedida

    static belongsTo = [Solicitacao]
    static hasMany = [fabricante: Fabricante, fornecedor: Fornecedor]

    static constraints = {
        solicitacao nullable: false
        item nullable: false
        unidadeMedida nullable: false
    }

    static mapping = {
        id composite: ['solicitacao', 'item']
    }
}
