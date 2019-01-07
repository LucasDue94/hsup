package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String codigo
    String setor
    String descricao
    Long estoque
    String unidade_estoque

    static mapping = {
        id generator: 'assigned', composite: ['codigo', 'setor']
        version false
    }

    static Long countDistinctProducts(){
        return  (Long) createCriteria().get {
            projections {
                countDistinct 'codigo'
            }
        }
    }
}
