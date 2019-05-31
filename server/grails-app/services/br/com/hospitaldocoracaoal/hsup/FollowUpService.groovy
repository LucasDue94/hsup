package br.com.hospitaldocoracaoal.hsup

import br.com.hospitaldocoracaoal.hsup.mail.Mensagem
import br.com.hospitaldocoracaoal.hsup.mail.StatusMensagem
import br.com.hospitaldocoracaoal.hsup.mail.TarefaEmail
import grails.gorm.transactions.Transactional
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.scheduling.annotation.Scheduled

@Transactional
class FollowUpService {

    boolean lazyInit = false

    static final String PARAM_SERVIDOR_ID = 'hsup.mail.servidor'
    static final String PARAM_PORTA_ID = 'hsup.mail.porta'
    static final String PARAM_REQUER_AUTENTICACAO_ID = 'hsup.requer_autenticacao.usuario'
    static final String PARAM_USUARIO_ID = 'hsup.mail.usuario'
    static final String PARAM_SENHA_ID = 'hsup.mail.senha'
    static final String PARAM_TLS_ID = 'hsup.mail.usa_tls'
    static final String PROTOCOL = 'smtp'

    JavaMailSender transmissor

    private void carregarConfiguracoes() {
        ParametroSistema parametroServidor = ParametroSistema.get PARAM_SERVIDOR_ID
        ParametroSistema parametroPorta = ParametroSistema.get PARAM_PORTA_ID
        ParametroSistema parametroAutenticacao = ParametroSistema.get PARAM_REQUER_AUTENTICACAO_ID

        if (parametroServidor == null || parametroPorta == null || parametroAutenticacao == null) {
            this.transmissor = null
            return
        }

        JavaMailSender transmissor = new JavaMailSenderImpl()
        transmissor.host = parametroServidor.valor
        transmissor.port = parametroPorta.valor as Integer

        Properties props = transmissor.javaMailProperties
        props.put 'mail.transport.protocol', PROTOCOL

        Boolean requerAtualizacao = parametroAutenticacao.valor as Boolean
        if (requerAtualizacao) {
            ParametroSistema parametroUsuario = ParametroSistema.get PARAM_USUARIO_ID
            ParametroSistema parametroSenha = ParametroSistema.get PARAM_SENHA_ID

            if (parametroUsuario == null || parametroSenha == null) {
                this.transmissor = null
                return
            }

            transmissor.username = parametroUsuario.valor
            transmissor.password = parametroSenha.valor
        }

        ParametroSistema usaTLS = ParametroSistema.get PARAM_TLS_ID
        if (usaTLS != null) {
            props.put 'mail.smtp.starttls.enable', usaTLS.valor == 'true' ? 'true' : 'false'
        }

        this.transmissor = transmissor
    }

    void enviarFollowUp(Solicitacao solicitacao) {
        if (solicitacao == null || solicitacao.id == null) throw new IllegalArgumentException('Solicitação deve ser não nula')

        final String titulo = "Solicitação de compra ${solicitacao.id}"
        final String conteudo = "Atualizada para o status: ${solicitacao.status.nome}"

        new Mensagem(
                solicitacao: solicitacao,
                usuarios: [solicitacao.responsavel, solicitacao.responsavel.setor.gestor],
                titulo: titulo,
                conteudo: conteudo
        ).save flush: true
    }

    @Scheduled(fixedDelay = 10000L, initialDelay = 5000L)
    void porcessarMensagensAgendadas() {
        List<Mensagem> mensagens = Mensagem.findAllByStatus StatusMensagem.load(StatusMensagem.AGENDADA_ID)

        if (!mensagens.empty) {
            if (this.transmissor == null) this.carregarConfiguracoes()

            mensagens.each { m ->
                new Thread(new TarefaEmail(this.transmissor, m.id)).start()
            }
        }
    }
}