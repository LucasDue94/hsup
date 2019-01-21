package br.com.hospitaldocoracaoal.hsup.mail

import org.springframework.mail.MailMessage
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender

class TarefaEmail implements Runnable {

    JavaMailSender transmissor
    Mensagem mensagem

    TarefaEmail(JavaMailSender transmissor, Mensagem mensagem) {
        this.transmissor = transmissor
        this.mensagem = mensagem
    }

    @Override
    void run() {
        Mensagem.withTransaction {
            if (!this.mensagem.attached) this.mensagem = this.mensagem.attach()

            MailMessage mailMessage = new SimpleMailMessage()
            mailMessage.setTo mensagem.usuarios.email as String[]
            mailMessage.subject = this.mensagem.titulo
            mailMessage.text = this.mensagem.conteudo

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

            this.mensagem.status = novoStatus

            this.mensagem.save flush: true
        }
    }
}
