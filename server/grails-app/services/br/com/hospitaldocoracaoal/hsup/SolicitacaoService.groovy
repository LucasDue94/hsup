package br.com.hospitaldocoracaoal.hsup

import grails.gorm.PagedResultList
import grails.gorm.services.Service
import grails.plugin.springsecurity.SpringSecurityService
import grails.web.servlet.mvc.GrailsParameterMap
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.transaction.annotation.Transactional

@Service(Solicitacao)
@Transactional
abstract class SolicitacaoService {

    @Autowired
    SpringSecurityService springSecurityService

    abstract Solicitacao get(Serializable id)

    PagedResultList<Solicitacao> list(Map args, String termo) {
        def criteria = Solicitacao.createCriteria()

        criteria.list(args) {
            this.listCriteria(args, criteria, termo)
        }
    }

    abstract Long count()

    abstract void delete(Serializable id)

    Solicitacao save(Solicitacao solicitacao) {
        if (solicitacao == null) {
            throw new IllegalArgumentException("Solicitação não pode ser nula.")
        }

        def principal = springSecurityService.principal
        if (principal == null) throw new IllegalStateException('Deve ter um usuário logado.')

        Usuario usuarioLogado = Usuario.get principal.id

        solicitacao.responsavel = usuarioLogado

        if (solicitacao.responsavel.setor.necessitaAutorizacao) {
            solicitacao.status = StatusSolicitacao.load StatusSolicitacao.AGUARDANDO_AUTORIZACAO_ID
        } else {
            solicitacao.status = StatusSolicitacao.load StatusSolicitacao.VALIDACAO_ALMOXARIFE_ID
        }

        solicitacao.itens.item.each { i ->
            i.fornecedor = i.fornecedor.unique { a, b -> a.fantasia <=> b.fantasia }
            def newForn = i.fornecedor.findAll { it.id == null }
            def fornList = i.fornecedor.findAll { it.id != null }

            fornList.each {
                Fornecedor forn = Fornecedor.get it.id
                if (forn != null) {
                    i.fornecedor.remove(it)
                    i.fornecedor.add(forn)
                }
            }

            newForn.each {
                Fornecedor fornecedor = Fornecedor.findByFantasia it.fantasia
                if (fornecedor == null) {
                    it.save(flush: true)
                } else {
                    i.fornecedor.remove(it)
                    i.fornecedor.add(fornecedor)
                }
            }

            i.fabricante = i.fabricante.unique { a, b -> a.fantasia <=> b.fantasia }
            def newFab = i.fabricante.findAll { it.id == null }
            def fabList = i.fabricante.findAll { it.id != null }

            fabList.each {
                Fabricante fab = Fabricante.get it.id
                if (fab != null) {
                    i.fabricante.remove(it)
                    i.fabricante.add(fab)
                }
            }

            newFab.each {
                Fabricante fabricante = Fabricante.findByFantasia it.fantasia
                if (fabricante == null) {
                    it.save()
                } else {
                    i.fabricante.remove(it)
                    i.fabricante.add(fabricante)
                }
            }

            def newItem = solicitacao.itens.item.findAll { it.id == null }

            newItem.each {
                Item item = Item.findByDescricao it.descricao
                if (item == null) it.save(flush: true)
            }
        }

        solicitacao.save()

        solicitacao.itens.each {
            it.item.each { item ->
                if (item.fornecedor.size() > 0) {
                    it.addToFornecedor(item.fornecedor)
                }

                if (item.fabricante.size() > 0) {
                    it.addToFabricante(item.fabricante)
                }
            }

            it.save()
        }

        createHistorico(solicitacao)
        solicitacao
    }

    void createHistorico(Solicitacao solicitacao) {
        if (solicitacao.status) {
            def principal = springSecurityService.principal
            if (principal == null) throw new IllegalStateException('Deve ter um usuário logado.')

            Usuario usuarioLogado = Usuario.load principal.id

            def historico = [
                    solicitacao: solicitacao,
                    usuario    : usuarioLogado,
                    status     : solicitacao.status
            ]

            SolicitacaoHistorico solicitacaoHistorico = SolicitacaoHistorico.findOrCreateWhere(historico)
            solicitacaoHistorico.save(flush: true)
        }
    }

    void cancel(Serializable id) {
        def solicitacao = Solicitacao.get id
        StatusSolicitacao status = StatusSolicitacao.get StatusSolicitacao.CANCELADA_ID
        checkStatusPermitido solicitacao, status

    }

    void deny(Serializable id) {
        def solicitacao = Solicitacao.get id
        StatusSolicitacao status = StatusSolicitacao.get StatusSolicitacao.RECUSADA_ID
        checkStatusPermitido solicitacao, status
    }

    void approval(Serializable id) {
        def solicitacao = Solicitacao.get id
        StatusSolicitacao status = StatusSolicitacao.get StatusSolicitacao.VALIDACAO_ALMOXARIFE_ID
        checkStatusPermitido solicitacao, status

    }

    void finish(Serializable id) {
        def solicitacao = Solicitacao.get id
        StatusSolicitacao status = StatusSolicitacao.get StatusSolicitacao.RECEBIDO_ALMOXARIFADO_ID
        checkStatusPermitido solicitacao, status
    }

    void validaAlmoxarife(Serializable id) {
        def solicitacao = Solicitacao.get id
        StatusSolicitacao status = StatusSolicitacao.get StatusSolicitacao.PENDENTE_ID
        checkStatusPermitido solicitacao, status
    }


    void changeStatus(Serializable solicitacaoId, Serializable newStatusId) {
        def solicitacao = Solicitacao.get solicitacaoId
        def statusSolicitacao = StatusSolicitacao.get newStatusId
        checkStatusPermitido solicitacao, statusSolicitacao
    }

    void checkStatusPermitido(Solicitacao solicitacao, status) {
        solicitacao.status.statusPermitido.find {
            if (it == status) {
                solicitacao.status = it
                solicitacao.save flush: true
                createHistorico(solicitacao)
            }
        }
    }

    def listCriteria = { Map args, builder, String termo ->
        def principal = springSecurityService.principal
        Usuario usuarioLogado = Usuario.get principal.id

        if (!args.containsKey('sort')) {
            builder.status {
                builder.order('peso', 'desc')
            }
            builder.order('urgente', 'desc')
            builder.order('dateCreated', 'asc')
        }

        def permission = usuarioLogado.perfil.permissoes.findAll {
            it.authority == 'ROLE_SOLICITACAO_LISTALMOXARIFE' || it.authority == 'ROLE_SOLICITACAO_LISTCOMPRADOR'
        }

        if (termo != null && !termo.isEmpty()) {
            builder.or {
                if (termo.isNumber()) {
                    Long id = termo as Long
                    builder.eq('id', id)
                }

                builder.responsavel {
                    builder.or {
                        builder.ilike('name', "%${termo}%")

                        builder.setor {
                            builder.ilike('nome', "%${termo}%")
                        }
                    }
                }

                builder.status {
                    builder.ilike('nome', "%${termo}%")
                }
            }
        }

        if (permission.size() == 0) {
            builder.responsavel {
                builder.or {
                    builder.eq 'id', usuarioLogado.id

                    builder.setor {
                        builder.gestor {
                            builder.eq 'id', usuarioLogado.id
                        }
                    }
                }
            }
        }
    }
}