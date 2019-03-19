package br.com.hospitaldocoracaoal.hsup

class Fabricante {

    String fantasia
    Boolean ativo

    static belongsTo = [Item, SolicitacaoItem]

    static constraints = {
        fantasia nullable: false, blank: false, unique: true
        ativo nullable: false, blank: false
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (getClass() != o.class) return false

        Fabricante that = (Fabricante) o

        if (fantasia != that.fantasia) return false
        if (id != that.id) return false

        return true
    }

    int hashCode() {
        int result
        result = fantasia.hashCode()
        result = 31 * result + id.hashCode()
        return result
    }
}