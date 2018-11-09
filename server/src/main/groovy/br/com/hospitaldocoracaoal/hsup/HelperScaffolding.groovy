package br.com.hospitaldocoracaoal.hsup

import grails.util.Holders

class HelperScaffolding {

    static String[] getAttributes(String className) {
        def domain = Holders.grailsApplication.getArtefacts('Domain').find { it.clazz.name.contains(className) }
        domain.properties.persistentProperty.name
    }
}
