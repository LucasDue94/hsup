package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

class SolicitacaoController {

    SolicitacaoService solicitacaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_SOLICITACAO_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Solicitacao> solicitacaoList = solicitacaoService.list(params, termo)
        Map modelRes = [solicitacaoList: solicitacaoList, solicitacaoCount: solicitacaoList.totalCount]
        respond modelRes
    }

    @Secured('ROLE_SOLICITACAO_LISTALMOXARIFE')
    def listAlmoxarife(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Solicitacao> solicitacaoList = solicitacaoService.list(params, termo)
        Map modelRes = [solicitacaoList: solicitacaoList, solicitacaoCount: solicitacaoList.totalCount]
        respond modelRes
    }

    @Secured('ROLE_SOLICITACAO_LISTCOMPRADOR')
    def listComprador(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Solicitacao> solicitacaoList = solicitacaoService.list(params, termo)
        Map modelRes = [solicitacaoList: solicitacaoList, solicitacaoCount: solicitacaoList.totalCount]
        respond modelRes
    }

    @Secured('ROLE_SOLICITACAO_SHOW')
    def show(Long id) {
        respond solicitacaoService.get(id)
    }

    @Secured('ROLE_SOLICITACAO_SAVE')
    def save(Solicitacao solicitacao) {
        if (solicitacao == null) {
            render status: NOT_FOUND
            return
        }

        try {
            solicitacaoService.save(solicitacao)
        } catch (ValidationException e) {
            respond solicitacao.errors, view: 'create'
            return
        }

        respond solicitacao, [status: CREATED, view: "show"]
    }

    @Secured('ROLE_SOLICITACAO_UPDATE')
    def update(Solicitacao solicitacao) {
        if (solicitacao == null) {
            render status: NOT_FOUND
            return
        }

        try {
            solicitacaoService.save(solicitacao)
        } catch (ValidationException e) {
            respond solicitacao.errors, view: 'edit'
            return
        }

        respond solicitacao, [status: OK, view: "show"]
    }

    @Secured('ROLE_SOLICITACAO_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        solicitacaoService.delete(id)

        render status: NO_CONTENT
    }

    @Secured('ROLE_SOLICITACAO_CANCEL')
    def cancel(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        solicitacaoService.cancel(id)

        render status: NO_CONTENT
    }

    @Secured('ROLE_SOLICITACAO_DENY')
    def deny(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        solicitacaoService.deny(id)

        render status: NO_CONTENT
    }

    @Secured('ROLE_SOLICITACAO_APPROVAL')
    def approval(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        solicitacaoService.approval(id)

        render status: NO_CONTENT
    }

    @Secured('ROLE_SOLICITACAO_FINISH')
    def finish(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        solicitacaoService.finish(id)

        render status: NO_CONTENT
    }

    @Secured('ROLE_SOLICITACAO_VALIDAALMOXARIFE')
    def validaAlmoxarife(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        solicitacaoService.validaAlmoxarife(id)

        render status: NO_CONTENT
    }

    @Secured('ROLE_SOLICITACAO_CHANGESTATUS')
    def changeStatus() {
        if (params.id == null && params.status == null) {
            render status: NOT_FOUND
            return
        }

        solicitacaoService.changeStatus(params.id, params.status)

        render status: NO_CONTENT
    }
}
