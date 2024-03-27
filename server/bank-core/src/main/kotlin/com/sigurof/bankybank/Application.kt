package com.sigurof.bankybank

import com.sigurof.bankybank.db.configureDb
import com.sigurof.bankybank.web.rest.restModule
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

val user = "postgres"
val port = 5434
val postgresUrl = "jdbc:postgresql://localhost:$port/postgres"
val dbPassword = "bank"

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureDb()
        restModule()
        configureSecurity()
    }
        .start(wait = true)
}
