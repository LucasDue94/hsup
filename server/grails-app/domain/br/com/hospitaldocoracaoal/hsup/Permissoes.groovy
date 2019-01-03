package br.com.hospitaldocoracaoal.hsup

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes='authority')
@ToString(includes='authority', includeNames=true, includePackage=false)
class Permissoes implements Serializable {

	private static final long serialVersionUID = 1

	String authority

	static belongsTo = [Perfil, Usuario]

	static constraints = {
		authority nullable: false, blank: false, unique: true
	}

	static mapping = {
		cache true
	}
}
