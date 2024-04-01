package com.sigurof.bankybank

import com.sigurof.bankybank.db.configureDb
import com.sigurof.bankybank.db.hikariDatasource
import com.sigurof.bankybank.web.rest.restModule
import io.ktor.server.application.Application

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.module() {
    configureDb(hikariDatasource())
    configureSecurity()
    restModule()
}
