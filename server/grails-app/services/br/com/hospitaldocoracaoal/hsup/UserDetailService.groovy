package br.com.hospitaldocoracaoal.hsup

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.SpringSecurityUtils
import grails.plugin.springsecurity.userdetails.GrailsUserDetailsService
import grails.plugin.springsecurity.userdetails.NoStackUsernameNotFoundException
import org.springframework.dao.DataAccessException
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException

@Transactional
class UserDetailService implements GrailsUserDetailsService {

    static final List NO_ROLES = [new SimpleGrantedAuthority(SpringSecurityUtils.NO_ROLE)]

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
        Usuario usuario = Usuario.findByUsername username
        if (!usuario) throw new NoStackUsernameNotFoundException()

        def authorities = usuario.authorities.collect {
            new SimpleGrantedAuthority(it.authority)
        }

        return new UserDetail(usuario.username, usuario.password, usuario.enabled, !usuario?.accountExpired,
                !usuario?.accountExpired, !usuario?.accountLocked, authorities ?: NO_ROLES, usuario.id,
                usuario.name, usuario.setor?.nome, usuario.perfil?.name)
    }

    @Override
    UserDetails loadUserByUsername(String username, boolean loadRoles) throws UsernameNotFoundException {
        return loadUserByUsername(username)
    }
}
