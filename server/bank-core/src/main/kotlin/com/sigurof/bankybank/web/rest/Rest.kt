package com.sigurof.bankybank.web.rest

import com.sigurof.bankybank.plugins.Account
import com.sigurof.bankybank.plugins.LogInInformation
import com.sigurof.bankybank.plugins.configureSerialization
import com.sigurof.bankybank.service.users.CreateUserResult
import com.sigurof.bankybank.service.users.LogInResult
import com.sigurof.bankybank.service.users.createUser
import com.sigurof.bankybank.service.users.getUserEmail
import com.sigurof.bankybank.service.users.logInUser
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.application.install
import io.ktor.server.plugins.cors.routing.CORS
import io.ktor.server.request.receive
import io.ktor.server.response.header
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.routing

fun Application.restModule() {
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Delete)
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.AccessControlAllowOrigin) // Explicitly allow this header
        allowCredentials = true
        allowNonSimpleContentTypes = true
        anyHost()
    }
    configureSerialization()
    configureRestRouting()
}

fun Application.configureRestRouting() {
    configureUserRouting()
    configureAccountsRouting()
}

fun Application.configureUserRouting() {
    routing {
        post("/signUp") {
            val loginInformation = call.receive<LogInInformation>()

            when (val result = createUser(loginInformation)) {
                is CreateUserResult.Success -> {
                    call.respond(HttpStatusCode.Created, result.profile)
                }

                is CreateUserResult.AlreadyExists -> {
                    call.respond(HttpStatusCode.Forbidden, "User already exists")
                }

                is CreateUserResult.Error -> {
                    println("Failed to create user: ${result.exception}")
                    call.respond(HttpStatusCode.InternalServerError, "An unexpected error occurred")
                }
            }
        }

        post("/logIn") {
            val loginInformation = call.receive<LogInInformation>()
            when (val result: LogInResult = logInUser(loginInformation)) {
                is LogInResult.Success -> {
                    call.response.header(
                        "Set-Cookie",
                        "sessionId=${result.sessionId}",
                    )
                    call.respond(HttpStatusCode.OK, "Logged in")
                }

                is LogInResult.NotFound -> {
                    call.respond(HttpStatusCode.NotFound, "User not found")
                }

                is LogInResult.WrongPassword -> {
                    call.respond(HttpStatusCode.Forbidden, "Wrong password")
                }

                is LogInResult.Error -> {
                    println("Failed to verify user: ${result.exception}")
                    call.respond(HttpStatusCode.InternalServerError, "An unexpected error occurred")
                }
            }
        }
    }
}

val accounts: MutableMap<String, MutableList<Account>> = mutableMapOf()

fun Application.configureAccountsRouting() {
    routing {
        get("/accounts") {
            val session = call.request.cookies["sessionId"]
            val email: String? = getUserEmail(session)
            if (email == null) {
                call.response.header(
                    "Set-Cookie",
                    "sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure",
                )
                call.respond(HttpStatusCode.Unauthorized)
                return@get
            }
            call.respond(accounts[email] ?: mutableListOf<Account>())
        }
    }
}
