package br.com.hospitaldocoracaoal.hsup.mail

import br.com.hospitaldocoracaoal.hsup.Solicitacao
import org.apache.commons.lang.CharEncoding
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper

import javax.mail.internet.MimeMessage
import java.text.DateFormat
import java.text.SimpleDateFormat

class TarefaEmail implements Runnable {

    JavaMailSender transmissor
    Long mensagemId

    TarefaEmail(JavaMailSender transmissor, Long mensagemId) {
        this.transmissor = transmissor
        this.mensagemId = mensagemId
    }

    @Override
    void run() {
        DateFormat format = new SimpleDateFormat('dd/MM/yyyy HH:mm:ss')
        println "${format.format(new Date())} - Iniciando Tarefa da mensagem $mensagemId"

        Mensagem.withTransaction {
            Mensagem mensagem = Mensagem.get this.mensagemId
            Solicitacao solicitacao = Solicitacao.findById mensagem.solicitacaoId
            MimeMessage mimeMessage = this.transmissor.createMimeMessage()
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, CharEncoding.UTF_8)
            helper.setTo(mensagem.usuarios.first().email)
            if (mensagem.usuarios.size() > 1) {
                String[] cc = Arrays.copyOfRange(mensagem.usuarios*.email.toArray(), 1, mensagem.usuarios.size() - 1)
                helper.setCc(cc)
            }
            helper.setSubject('HSUP - Sua solicitação tem uma atualização')
            String content = """<style>
                        table {
                            border: 1px solid black;
                            border-radius: 5px;
                            text-transform: capitalize;
                        }
                        td {
                            padding: 3px;
                            font-size: 18px;
                        }
                        th {
                            padding: 10px;
                            font-size: 20px;
                        }
                        .header{
                            letter-spacing: 2px;
                            background-color: #00ABA5;
                            color: white;
                        }
                    </style>
                    <table>
                        <tr class="header">
                            <th colspan="2">Solicitação Nº ${solicitacao.id}</th>
                        </tr>
                        <tr>
                            <td><b>Status:</b></td>
                            <td><b style="color: red;">${solicitacao.status.nome}</b></td>
                        </tr>
                        <tr>
                            <td><b>Solicitante:</b></td>
                            <td>${solicitacao.responsavel.name}</td>
                        </tr>
                        <tr>
                            <td><b>Solicitada em:</b></td>
                            <td>${solicitacao.dateCreated.format('dd-MM-YYYY')}</td>
                        </tr>
                    </table>"""

            helper.setText(content, true)

            StatusMensagem novoStatus = StatusMensagem.load StatusMensagem.ENVIADA_ID
            if (this.transmissor != null) {
                try {
                    println "${format.format(new Date())} - Enviando $mensagemId"
                    this.transmissor.send mimeMessage
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
            this.transmissor = null
            mensagem.status = novoStatus
            mensagem.save flush: true
        }
    }
}