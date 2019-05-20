package hsup

import br.com.hospitaldocoracaoal.hsup.Perfil
import br.com.hospitaldocoracaoal.hsup.Permissoes
import br.com.hospitaldocoracaoal.hsup.StatusSolicitacao
import br.com.hospitaldocoracaoal.hsup.mail.StatusMensagem
import grails.core.GrailsApplication
import org.grails.core.artefact.ControllerArtefactHandler

class BootStrap {
    GrailsApplication grailsApplication

    def init = { servletContext ->
        def controllers = grailsApplication.getArtefacts(ControllerArtefactHandler.TYPE).toList()

        def adminPerfil = Perfil.findOrCreateByName Perfil.ROLE_ADMIN
        Perfil.findOrSaveByName Perfil.ROLE_ALMOXARIFE
        Perfil.findOrSaveByName Perfil.ROLE_COMPRADOR
        Perfil.findOrSaveByName Perfil.ROLE_GESTOR
        Perfil.findOrSaveByName Perfil.ROLE_SOLICITANTE


        controllers.each { c ->
            c.actions.each { a ->
                Permissoes permissoes = Permissoes.findOrCreateByAuthority 'ROLE_' + c.name.toUpperCase() + '_' + a.toUpperCase()
                adminPerfil.addToPermissoes(permissoes).save()
                permissoes.save()
            }
        }

        StatusSolicitacao.criarStatusPadroes()
        StatusSolicitacao.attachStatus()
        StatusMensagem.criarStatusPadroes()
    }
    def destroy = {
    }
}