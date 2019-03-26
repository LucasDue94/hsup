package br.com.hospitaldocoracaoal.hsup

class Fornecedor implements Comparable<Fornecedor> {

    String fantasia
    String telefone
    String email
    Boolean ativo

    static belongsTo = Item

    static constraints = {
        fantasia nullable: false, blank: false, unique: true
        ativo nullable: false, blank: false
        telefone nullable: false, blank: false
        email nullable: false, blank: false
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (getClass() != o.class) return false

        Fornecedor that = (Fornecedor) o

        if (fantasia != that.fantasia) return false
        if (id != that.id) return false

        return true
    }

    @Override
    int compareTo(Fornecedor o) {
        return equals(o) ? 0 : id <=> o.id
    }
}
