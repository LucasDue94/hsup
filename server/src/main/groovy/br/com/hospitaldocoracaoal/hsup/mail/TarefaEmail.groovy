package br.com.hospitaldocoracaoal.hsup.mail

import org.springframework.mail.MailMessage
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender

class TarefaEmail implements Runnable {

    JavaMailSender transmissor
    Long mensagemId

    TarefaEmail(JavaMailSender transmissor, Long mensagemId) {
        this.transmissor = transmissor
        this.mensagemId = mensagemId
    }

    @Override
    void run() {
        Mensagem.withTransaction {
            Mensagem mensagem = Mensagem.get this.mensagemId

            MailMessage mailMessage = new SimpleMailMessage()
            mailMessage.setTo mensagem.usuarios.email as String[]
            mailMessage.subject = mensagem.titulo
            mailMessage.text = mensagem.conteudo

            StatusMensagem novoStatus = StatusMensagem.load StatusMensagem.ENVIADA_ID

            if (this.transmissor != null) {
                try {
                    this.transmissor.send mailMessage
                } catch (Exception ignore) {
                    novoStatus = StatusMensagem.load StatusMensagem.FALHA_ENVIAR_ID
                }
            } else {
                novoStatus = StatusMensagem.load StatusMensagem.FALHA_ENVIAR_ID
            }

            mensagem.status = novoStatus
            mensagem.save flush: true
        }
    }
}
