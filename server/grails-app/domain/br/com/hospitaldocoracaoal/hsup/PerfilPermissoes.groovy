package br.com.hospitaldocoracaoal.hsup

import grails.gorm.DetachedCriteria
import groovy.transform.ToString

import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class PerfilPermissoes implements Serializable {

	private static final long serialVersionUID = 1

	Perfil perfil
	Permissoes permissoes

	@Override
	boolean equals(other) {
		if (other instanceof PerfilPermissoes) {
			other.permissoesId == permissoes?.id && other.perfilId == perfil?.id
		}
	}

	@Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (perfil) {
            hashCode = HashCodeHelper.updateHash(hashCode, perfil.id)
		}
		if (permissoes) {
		    hashCode = HashCodeHelper.updateHash(hashCode, permissoes.id)
		}
		hashCode
	}

	static PerfilPermissoes get(long perfilId, long permissoesId) {
		criteriaFor(perfilId, permissoesId).get()
	}

	static boolean exists(long perfilId, long permissoesId) {
		criteriaFor(perfilId, permissoesId).count()
	}

	private static DetachedCriteria criteriaFor(long perfilId, long permissoesId) {
		PerfilPermissoes.where {
			perfil == Perfil.load(perfilId) &&
			permissoes == Permissoes.load(permissoesId)
		}
	}

	static PerfilPermissoes create(Perfil perfil, Permissoes permissoes, boolean flush = false) {
		def instance = new PerfilPermissoes(perfil: perfil, permissoes: permissoes)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(Perfil rg, Permissoes r) {
		if (rg != null && r != null) {
			PerfilPermissoes.where { perfil == rg && permissoes == r }.deleteAll()
		}
	}

	static int removeAll(Permissoes r) {
		r == null ? 0 : PerfilPermissoes.where { permissoes == r }.deleteAll() as int
	}

	static int removeAll(Perfil rg) {
		rg == null ? 0 : PerfilPermissoes.where { perfil == rg }.deleteAll() as int
	}

	static constraints = {
	    perfil nullable: false
		permissoes nullable: false, validator: { Permissoes r, PerfilPermissoes rg ->
			if (rg.perfil?.id) {
				if (PerfilPermissoes.exists(rg.perfil.id, r.id)) {
				    return ['roleGroup.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['perfil', 'permissoes']
		version false
	}
}
