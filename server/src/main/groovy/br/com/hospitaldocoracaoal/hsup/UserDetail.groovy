package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.userdetails.GrailsUser
import org.springframework.security.core.GrantedAuthority

class UserDetail extends GrailsUser {

    final String name

    UserDetail(String username, String password, boolean enabled, boolean accountNonExpired,
               boolean credentialsNonExpired, boolean accountNonLocked, Collection<GrantedAuthority> authorities,
               Object id, String name) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities, id)

        this.name = name
    }
}
