package hsup

import br.com.hospitaldocoracaoal.hsup.Perfil
import br.com.hospitaldocoracaoal.hsup.Permissoes
import br.com.hospitaldocoracaoal.hsup.Setor
import br.com.hospitaldocoracaoal.hsup.StatusSolicitacao
import br.com.hospitaldocoracaoal.hsup.Usuario
import br.com.hospitaldocoracaoal.hsup.mail.StatusMensagem
import grails.core.GrailsApplication
import org.grails.core.artefact.ControllerArtefactHandler


class BootStrap {
    def springSecurityService
    GrailsApplication grailsApplication

    def init = { servletContext ->
        final String ADMIN_USERNAME = 'admin'
        final String ADMIN_SETOR = 'Administração'
        final String ADMIN_NAME = 'Administrador'
        final String ADMIN_EMAIL = 'ti@hospitaldocoracao-al.com.br'

        Perfil adminPerfil = Perfil.findOrCreateByName Perfil.ROLE_ADMIN
        adminPerfil.save()

        Setor setorAdmin = Setor.findOrCreateByNomeAndNecessitaAutorizacao ADMIN_SETOR, false
        setorAdmin.save()

        def controllers = grailsApplication.getArtefacts(ControllerArtefactHandler.TYPE).toList()

        controllers.each { c ->
            c.actions.each { a ->
                Permissoes permissoes = Permissoes.findOrCreateByAuthority 'ROLE_' + c.name.toUpperCase() + '_' + a.toUpperCase()
                adminPerfil.addToPermissoes(permissoes).save()
                permissoes.save()
            }
        }

        def user = [
                username: ADMIN_USERNAME,
                name    : ADMIN_NAME,
                perfil  : adminPerfil,
                setor   : setorAdmin,
                email   : ADMIN_EMAIL
        ]

        Usuario.findOrCreateWhere(user).save()

        StatusSolicitacao.criarStatusPadroes()
        StatusSolicitacao.attachStatus()
        StatusMensagem.criarStatusPadroes()
    }
    def destroy = {
    }
}