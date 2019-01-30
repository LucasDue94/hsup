package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

class SolicitacaoController {

    SolicitacaoService solicitacaoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_SOLICITACAO_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        List<Solicitacao> solicitacaoList = solicitacaoService.list(params)
        respond solicitacaoList
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

    @Secured('ROLE_SOLICITACAO_INDEX')
    def search() {
        List<Solicitacao> solicitacaoList = Solicitacao.withCriteria {
            if (params.containsKey('id') && !params.id.empty)
                ilike('id', "${params.id}")
        }

        return solicitacaoList
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
}
