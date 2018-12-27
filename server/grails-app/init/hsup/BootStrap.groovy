package hsup

import br.com.hospitaldocoracaoal.hsup.Perfil
import br.com.hospitaldocoracaoal.hsup.Usuario


class BootStrap {
    def springSecurityService

    def init = { servletContext ->
        final String ADMIN_USERNAME = 'admin'
        final String ADMIN_NAME = 'Administrador'
        final String ADMIN_PASSWORD = springSecurityService.encodePassword('admin')

        Perfil adminPerfil = Perfil.findOrCreateByName Perfil.ROLE_ADMIN
        adminPerfil.save()

        Usuario adminUsuario = Usuario.findOrCreateByUsernameAndPasswordAndName ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_NAME
        adminUsuario.save()
    }
    def destroy = {
    }
}
