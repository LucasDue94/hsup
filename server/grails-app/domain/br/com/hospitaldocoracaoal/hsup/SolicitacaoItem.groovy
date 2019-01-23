package br.com.hospitaldocoracaoal.hsup

class SolicitacaoItem implements Serializable {

    Solicitacao solicitacao
    Item item

    static hasMany = [fabricante: Fabricante, fornecedor: Fornecedor]

    static constraints = {
        solicitacao nullable: false
        item nullable: false
    }

    static mapping = {
        id composite: ['solicitacao', 'item']
    }
}
