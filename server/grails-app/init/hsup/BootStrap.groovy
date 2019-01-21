package hsup

import br.com.hospitaldocoracaoal.hsup.Perfil
import br.com.hospitaldocoracaoal.hsup.Permissoes
import br.com.hospitaldocoracaoal.hsup.Setor
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
        final String ADMIN_PASSWORD = springSecurityService.encodePassword('admin')

        Perfil adminPerfil = Perfil.findOrCreateByName Perfil.ROLE_ADMIN
        adminPerfil.save()

        Usuario adminUsuario = Usuario.findOrCreateByUsernameAndPasswordAndNameAndPerfil ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_NAME, adminPerfil
        adminUsuario.save()

        Setor setorAdmin = Setor.findOrCreateByNomeAndAutenticacao ADMIN_SETOR, false
        setorAdmin.save()

        def controllers = grailsApplication.getArtefacts(ControllerArtefactHandler.TYPE).toList()

        controllers.each { c ->
            c.actions.each { a ->
                Permissoes permissoes = Permissoes.findOrCreateByAuthority c.name.toUpperCase() + '_' + a.toUpperCase()
                permissoes.save()
            }
        }

        StatusMensagem.criarStatusPadroes()
    }
    def destroy = {
    }
}
