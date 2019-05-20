package br.com.hospitaldocoracaoal.hsup

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes = 'name')
@ToString(includes = 'name', includeNames = true, includePackage = false)
class Perfil implements Serializable {

    private static final long serialVersionUID = 1
    public static final String ROLE_ADMIN = 'ADMIN'
    public static final String ROLE_SOLICITANTE = 'SOLICITANTE'
    public static final String ROLE_COMPRADOR = 'COMPRADOR'
    public static final String ROLE_GESTOR = 'GESTOR'
    public static final String ROLE_ALMOXARIFE = 'ALMOXARIFE'

    String name

    static belongsTo = [StatusSolicitacao]
    static hasMany = [permissoes: Permissoes, status: StatusSolicitacao]

    static constraints = {
        name nullable: false, blank: false, unique: true
    }

    static mapping = {
        cache true
    }

    static void criarPerfisPadroes() {

    }
}
