package br.com.hospitaldocoracaoal.hsup

class UrlMappings {

    static mappings = {

        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')

        get "/solicitacao/listComprador(.$format)?"(controller: "solicitacao", action: "listComprador")
        get "/solicitacao/listAlmoxarife(.$format)?"(controller: "solicitacao", action: "listAlmoxarife")
        put "/solicitacao/cancel/$id(.$format)?"(controller: "solicitacao", action: "cancel")
        put "/solicitacao/deny/$id(.$format)?"(controller: "solicitacao", action: "deny")
        put "/solicitacao/approval/$id(.$format)?"(controller: "solicitacao", action: "approval")
        put "/solicitacao/changeStatus/$id/$status(.$format)?"(controller: "solicitacao", action: "changeStatus")
        put "/solicitacao/validaAlmoxarife/$id(.$format)?"(controller: "solicitacao", action: "validaAlmoxarife")
        put "/solicitacao/retiradoAlmoxarife/$id(.$format)?"(controller: "solicitacao", action: "retiradoAlmoxarife")
        put "/solicitacao/recebidoAlmoxarife/$id(.$format)?"(controller: "solicitacao", action: "recebidoAlmoxarife")
    }
}
