package br.com.hospitaldocoracaoal.hsup

import spock.lang.*
import static org.springframework.http.HttpStatus.*
import grails.validation.ValidationException
import grails.testing.web.controllers.ControllerUnitTest
import grails.testing.gorm.DomainUnitTest

class StatusSolicitacaoControllerSpec extends Specification implements ControllerUnitTest<StatusSolicitacaoController>, DomainUnitTest<StatusSolicitacao> {

    def populateValidParams(params) {
        assert params != null

        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
        assert false, "TODO: Provide a populateValidParams() implementation for this generated test suite"
    }

    void "Test the index action returns the correct response"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * list(_) >> []
            1 * count() >> 0
        }

        when:"The index action is executed"
            controller.index()

        then:"The response is correct"
            response.text == '[]'
    }


    void "Test the save action with a null instance"() {
        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'POST'
        controller.save(null)

        then:
        response.status == NOT_FOUND.value()
    }

    void "Test the save action correctly persists"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * save(_ as StatusSolicitacao)
        }

        when:
        response.reset()
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'POST'
        populateValidParams(params)
        def statusSolicitacao = new StatusSolicitacao(params)
        statusSolicitacao.id = 1

        controller.save(statusSolicitacao)

        then:
        response.status == CREATED.value()
        response.json
    }

    void "Test the save action with an invalid instance"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * save(_ as StatusSolicitacao) >> { StatusSolicitacao statusSolicitacao ->
                throw new ValidationException("Invalid instance", statusSolicitacao.errors)
            }
        }

        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'POST'
        def statusSolicitacao = new StatusSolicitacao()
        statusSolicitacao.validate()
        controller.save(statusSolicitacao)

        then:
        response.status == UNPROCESSABLE_ENTITY.value()
        response.json.errors
    }

    void "Test the show action with a null id"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * get(null) >> null
        }

        when:"The show action is executed with a null domain"
        controller.show(null)

        then:"A 404 error is returned"
        response.status == NOT_FOUND.value()
    }

    void "Test the show action with a valid id"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * get(2) >> new StatusSolicitacao()
        }

        when:"A domain instance is passed to the show action"
        controller.show(2)

        then:"A model is populated containing the domain instance"
        response.status == OK.value()
        response.json
    }

    void "Test the update action with a null instance"() {
        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'PUT'
        controller.update(null)

        then:
        response.status == NOT_FOUND.value()
    }

    void "Test the update action correctly persists"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * save(_ as StatusSolicitacao)
        }

        when:
        response.reset()
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'PUT'
        populateValidParams(params)
        def statusSolicitacao = new StatusSolicitacao(params)
        statusSolicitacao.id = 1

        controller.update(statusSolicitacao)

        then:
        response.status == OK.value()
        response.json
    }

    void "Test the update action with an invalid instance"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * save(_ as StatusSolicitacao) >> { StatusSolicitacao statusSolicitacao ->
                throw new ValidationException("Invalid instance", statusSolicitacao.errors)
            }
        }

        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'PUT'
        def statusSolicitacao = new StatusSolicitacao()
        statusSolicitacao.validate()
        controller.update(statusSolicitacao)

        then:
        response.status == UNPROCESSABLE_ENTITY.value()
        response.json.errors
    }

    void "Test the delete action with a null instance"() {
        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'DELETE'
        controller.delete(null)

        then:
        response.status == NOT_FOUND.value()
    }

    void "Test the delete action with an instance"() {
        given:
        controller.statusSolicitacaoService = Mock(StatusSolicitacaoService) {
            1 * delete(2)
        }

        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'DELETE'
        controller.delete(2)

        then:
        response.status == NO_CONTENT.value()
    }
}