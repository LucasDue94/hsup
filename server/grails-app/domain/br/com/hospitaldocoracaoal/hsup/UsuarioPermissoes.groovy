package br.com.hospitaldocoracaoal.hsup

import grails.gorm.DetachedCriteria
import groovy.transform.ToString

import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class UsuarioPermissoes implements Serializable {

	private static final long serialVersionUID = 1

	Usuario usuario
	Permissoes permissoes

	@Override
	boolean equals(other) {
		if (other instanceof UsuarioPermissoes) {
			other.usuarioId == usuario?.id && other.permissoesId == permissoes?.id
		}
	}

    @Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (usuario) {
            hashCode = HashCodeHelper.updateHash(hashCode, usuario.id)
		}
		if (permissoes) {
		    hashCode = HashCodeHelper.updateHash(hashCode, permissoes.id)
		}
		hashCode
	}

	static UsuarioPermissoes get(long usuarioId, long permissoesId) {
		criteriaFor(usuarioId, permissoesId).get()
	}

	static boolean exists(long usuarioId, long permissoesId) {
		criteriaFor(usuarioId, permissoesId).count()
	}

	private static DetachedCriteria criteriaFor(long usuarioId, long permissoesId) {
		UsuarioPermissoes.where {
			usuario == Usuario.load(usuarioId) &&
			permissoes == Permissoes.load(permissoesId)
		}
	}

	static UsuarioPermissoes create(Usuario usuario, Permissoes permissoes, boolean flush = false) {
		def instance = new UsuarioPermissoes(usuario: usuario, permissoes: permissoes)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(Usuario u, Permissoes r) {
		if (u != null && r != null) {
			UsuarioPermissoes.where { usuario == u && permissoes == r }.deleteAll()
		}
	}

	static int removeAll(Usuario u) {
		u == null ? 0 : UsuarioPermissoes.where { usuario == u }.deleteAll() as int
	}

	static int removeAll(Permissoes r) {
		r == null ? 0 : UsuarioPermissoes.where { permissoes == r }.deleteAll() as int
	}

	static constraints = {
	    usuario nullable: false
		permissoes nullable: false, validator: { Permissoes r, UsuarioPermissoes ur ->
			if (ur.usuario?.id) {
				if (UsuarioPermissoes.exists(ur.usuario.id, r.id)) {
				    return ['userRole.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['usuario', 'permissoes']
		version false
	}
}
