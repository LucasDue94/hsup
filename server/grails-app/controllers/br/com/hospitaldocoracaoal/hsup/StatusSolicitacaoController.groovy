package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class StatusSolicitacaoController {

    StatusSolicitacaoService statusSolicitacaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_STATUSSOLICITACAO_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<StatusSolicitacao> statusSolicitacaoList = statusSolicitacaoService.list(params, termo)
        return respond(statusSolicitacaoList)
    }

    @Secured('ROLE_STATUSSOLICITACAO_SHOW')
    def show(Long id) {
        respond statusSolicitacaoService.get(id)
    }

    @Secured('ROLE_STATUSSOLICITACAO_SAVE')
    def save(StatusSolicitacao statusSolicitacao) {
        if (statusSolicitacao == null) {
            render status: NOT_FOUND
            return
        }

        try {
            statusSolicitacaoService.save(statusSolicitacao)
        } catch (ValidationException e) {
            respond statusSolicitacao.errors, view:'create'
            return
        }

        respond statusSolicitacao, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_STATUSSOLICITACAO_UPDATE')
    def update(StatusSolicitacao statusSolicitacao) {
        if (statusSolicitacao == null) {
            render status: NOT_FOUND
            return
        }

        try {
            statusSolicitacaoService.save(statusSolicitacao)
        } catch (ValidationException e) {
            respond statusSolicitacao.errors, view:'edit'
            return
        }

        respond statusSolicitacao, [status: OK, view:"show"]
    }

    @Secured('ROLE_STATUSSOLICITACAO_UPDATE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        statusSolicitacaoService.delete(id)

        render status: NO_CONTENT
    }
}
