package br.com.hospitaldocoracaoal.hsup

import grails.gorm.DetachedCriteria
import groovy.transform.ToString
import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class UsuarioPerfil implements Serializable {

	private static final long serialVersionUID = 1

	Usuario usuario
	Perfil perfil

	@Override
	boolean equals(other) {
		if (other instanceof UsuarioPerfil) {
			other.usuarioId == usuario?.id && other.perfilId == perfil?.id
		}
	}

    @Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (usuario) {
            hashCode = HashCodeHelper.updateHash(hashCode, usuario.id)
		}
		if (perfil) {
		    hashCode = HashCodeHelper.updateHash(hashCode, perfil.id)
		}
		hashCode
	}
	
	static UsuarioPerfil get(long usuarioId, long perfilId) {
		criteriaFor(usuarioId, perfilId).get()
	}

	static boolean exists(long usuarioId, long perfilId) {
		criteriaFor(usuarioId, perfilId).count()
	}

	private static DetachedCriteria criteriaFor(long usuarioId, long perfilId) {
		UsuarioPerfil.where {
			usuario == Usuario.load(usuarioId) &&
			perfil == Perfil.load(perfilId)
		}
	}

	static UsuarioPerfil create(Usuario usuario, Perfil perfil, boolean flush = false) {
		def instance = new UsuarioPerfil(usuario: usuario, perfil: perfil)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(Usuario u, Perfil rg) {
		if (u != null && rg != null) {
			UsuarioPerfil.where { usuario == u && perfil == rg }.deleteAll()
		}
	}

	static int removeAll(Usuario u) {
		u == null ? 0 : UsuarioPerfil.where { usuario == u }.deleteAll() as int
	}

	static int removeAll(Perfil rg) {
		rg == null ? 0 : UsuarioPerfil.where { perfil == rg }.deleteAll() as int
	}

	static constraints = {
	    perfil nullable: false
		usuario nullable: false, validator: { Usuario u, UsuarioPerfil ug ->
			if (ug.perfil?.id) {
				if (UsuarioPerfil.exists(u.id, ug.perfil.id)) {
					return ['userGroup.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['perfil', 'usuario']
		version false
	}
}
