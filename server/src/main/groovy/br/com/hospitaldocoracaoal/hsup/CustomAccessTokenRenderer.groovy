package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.rest.token.AccessToken
import grails.plugin.springsecurity.rest.token.rendering.AccessTokenJsonRenderer
import groovy.json.JsonBuilder

class CustomAccessTokenRenderer implements AccessTokenJsonRenderer {

    @Override
    String generateJson(AccessToken accessToken) {
        Map response = [
                id: accessToken.principal.id,
                name: accessToken.principal.name,
                setor: accessToken.principal.setor,
                perfil: accessToken.principal.perfil,
                username: accessToken.principal.username,
                access_token: accessToken.accessToken,
                roles: accessToken.principal.authorities.collect{ it.authority }
        ]

        return new JsonBuilder(response).toPrettyString()
    }
}
