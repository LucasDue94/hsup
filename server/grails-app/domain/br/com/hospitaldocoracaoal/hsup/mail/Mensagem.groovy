package br.com.hospitaldocoracaoal.hsup.mail

import br.com.hospitaldocoracaoal.hsup.Solicitacao
import br.com.hospitaldocoracaoal.hsup.Usuario

class Mensagem {

    Date dateCreated
    String titulo
    String conteudo
    StatusMensagem status
    Solicitacao solicitacao

    static hasMany = [usuarios: Usuario]

    static constraints = {
        titulo nullable: false, blank: false
        conteudo nullable: false, blank: false
        usuarios minSize: 1
    }

    def beforeValidate() {
        if (this.status == null) {
            this.status = StatusMensagem.load StatusMensagem.AGENDADA_ID
        }
    }

    void setStatus(StatusMensagem status) {
        this.status = status
    }
}
