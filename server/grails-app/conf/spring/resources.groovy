package spring

import br.com.hospitaldocoracaoal.hsup.CustomAccessTokenRenderer
import br.com.hospitaldocoracaoal.hsup.UserDetailService

// Place your Spring DSL code here
beans = {
    userDetailsService(UserDetailService)
    accessTokenJsonRenderer(CustomAccessTokenRenderer)
}
