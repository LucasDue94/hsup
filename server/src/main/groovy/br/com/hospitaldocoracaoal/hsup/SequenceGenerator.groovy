package br.com.hospitaldocoracaoal.hsup

import org.hibernate.MappingException
import org.hibernate.id.enhanced.SequenceStyleGenerator
import org.hibernate.service.ServiceRegistry
import org.hibernate.type.Type

class SequenceGenerator extends SequenceStyleGenerator {
    @Override
    void configure(Type type, Properties params, ServiceRegistry serviceRegistry) throws MappingException {
        String sequence = params.getProperty SEQUENCE_PARAM
        if (sequence == null || sequence.isEmpty()) {
            String tableName = params.getProperty TABLE
            String columnName = params.getProperty PK

            if (tableName != null) {
                while (tableName.contains('"')) {
                    tableName = tableName - '"'
                }

                params.setProperty(SEQUENCE_PARAM, "${tableName}_${columnName}_seq")
            }
        }

        super.configure(type, params, serviceRegistry)
    }
}