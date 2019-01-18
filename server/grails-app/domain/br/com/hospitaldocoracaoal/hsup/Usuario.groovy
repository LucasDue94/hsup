package br.com.hospitaldocoracaoal.hsup

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class Usuario implements Serializable {

    private static final long serialVersionUID = 1

    String username
    String name
    String password
    Perfil perfil
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired

    static hasMany = [permissoes: Permissoes]

    Set<Permissoes> getAuthorities() {
        return permissoes + perfil.permissoes
    }

    static transients = ['authorities']

    static constraints = {
        password nullable: false, blank: false, password: true
        username nullable: false, blank: false, unique: true
        name nullable: false, blank: false, unique: true
        perfil nullable: false, blank: false
    }

    static mapping = {
	    password column: '`password`'
    }
}
