package com.sigurof.bankybank.plugins

import io.ktor.server.routing.get
import kotlinx.serialization.Serializable

@Serializable
data class LogInInformation(val email: String, val password: String)

@Serializable
data class Account(val email: String, val balance: Int)

// fun Application.configureExceptionHandling() {
//    install(StatusPages) {
//        exception<Throwable> { cause ->
//            val log = LoggerFactory.getLogger("Application")
//            log.error("Unexpected exception occurred", cause)
//            call.respond(HttpStatusCode.InternalServerError, "An unexpected error occurred")
//        }
//        // You can add more specific exception handlers here if needed
//    }
// }
