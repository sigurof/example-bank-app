package com.sigurof.bankybank

import com.sigurof.bankybank.db.configureDb
import com.sigurof.bankybank.db.hikariDatasource
import com.sigurof.bankybank.web.rest.restModule
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureDb(hikariDatasource())
        configureSecurity()
        restModule()
    }
        .start(wait = true)
}
