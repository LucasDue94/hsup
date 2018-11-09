package br.com.hospitaldocoracaoal.hsup

import grails.util.Holders

class HelperScaffolding {

    static String getAttributes(String className) {
        def grailsApplication = Holders.grailsApplication
         def domainClass = grailsApplication.getDomainClass()
    }
}
