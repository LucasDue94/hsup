package br.com.hospitaldocoracaoal.hsup


import org.springframework.ldap.core.DirContextAdapter
import org.springframework.ldap.core.DirContextOperations
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper

class UserDetailContextMapper implements UserDetailsContextMapper {

    @Override
    UserDetails mapUserFromContext(DirContextOperations ctx, String username, Collection<? extends GrantedAuthority> authorities) {
        final String OU = 'OU='

        String nome = ctx.getStringAttribute 'displayName'
        String dn = ctx.getStringAttribute 'distinguishedName'
        Integer ouIndex = dn.indexOf OU
        String setorNome = dn.substring ouIndex + OU.length()
        setorNome = setorNome.substring 0, setorNome.indexOf(',')

        Usuario.withTransaction {

            Setor setor = Setor.findOrCreateByNome setorNome
            setor.save()

            Perfil perfil = Perfil.findByName 'SOLICITANTE'

            def usuarioMap = [
                    username: username,
                    name    : nome,
                    setor   : setor,
                    perfil  : perfil
            ]

            Usuario usuario = Usuario.findOrCreateWhere usuarioMap
            usuario.save()

            authorities = usuario.authorities.collect {
                new SimpleGrantedAuthority(it.authority)
            }

            new UserDetail(username, '', true, true, true, true, authorities, usuario?.id, usuario?.name, setorNome, perfil.name)
        }
    }

    @Override
    void mapUserToContext(UserDetails user, DirContextAdapter ctx) {
        throw new IllegalStateException('Só é permitido autenticação com usuários do login')
    }
}