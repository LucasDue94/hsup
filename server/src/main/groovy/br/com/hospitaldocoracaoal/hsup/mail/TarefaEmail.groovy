package br.com.hospitaldocoracaoal.hsup.mail

import org.springframework.mail.MailMessage
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender

import javax.mail.Message
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage

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

            /*MailMessage mailMessage = new SimpleMailMessage()
            mailMessage.setTo mensagem.usuarios.email as String[]
            mailMessage.subject = mensagem.titulo
            mailMessage.text = mensagem.conteudo*/

            MimeMessage htmlMensagem = this.transmissor.createMimeMessage()
            htmlMensagem.setFrom(this.transmissor.username)
            mensagem.usuarios.eachWithIndex { usuario, index ->
                if (index == 0) {
                    htmlMensagem.addRecipient(Message.RecipientType.TO, new InternetAddress(${usuario.email}))
                }else{
                    htmlMensagem.addRecipient(Message.RecipientType.CC, new InternetAddress(${usuario.email}))
                }
            }
            String html = "<h1 style='background-color:red; color:white;'>TESTANDO O HTML, MORAL!</h1>"
            htmlMensagem.setSubject('Testando o html no corpo')
            htmlMensagem.setContent(html, "text/html")

            StatusMensagem novoStatus = StatusMensagem.load StatusMensagem.ENVIADA_ID

            if (this.transmissor != null) {
                try {
                    this.transmissor.send htmlMensagem
                } catch (Exception e) {
                    novoStatus = StatusMensagem.load StatusMensagem.FALHA_ENVIAR_ID

                    // TODO: log it
                    println(e.message)
                }
            } else {
                novoStatus = StatusMensagem.load StatusMensagem.FALHA_ENVIAR_ID

                // TODO: log it
                println('transmissor não configurado!')

            }

            mensagem.status = novoStatus
            mensagem.save flush: true
        }
    }
}
