package br.com.hospitaldocoracaoal.hsup

class Solicitacao {

    Usuario responsavel
    Setor setor
    Boolean aprovada
    Date data = new Date()

    static constraints = {
        responsavel nullable: false, blank: false
        setor nullable: false, blank: false
        data nullable: false, blank: false
        aprovada nullable: false, blank: false
    }
}