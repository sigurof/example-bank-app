package com.sigurof.bankybank.web.rest

import com.sigurof.bankybank.db.CreateUserResult
import com.sigurof.bankybank.db.LogInResult
import com.sigurof.bankybank.db.createUser
import com.sigurof.bankybank.db.logInUser
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.request.receive
import io.ktor.server.response.header
import io.ktor.server.response.respond
import io.ktor.server.routing.post
import io.ktor.server.routing.routing
import kotlinx.serialization.Serializable

@Serializable
data class LogInRequest(val email: String, val password: String)

@Serializable
data class SignUpRequest(val email: String, val password: String)

fun Application.configureUserRouting() {
    routing {
        post("/signUp") {
            val loginRequest = call.receive<SignUpRequest>()

            when (val result = createUser(loginRequest)) {
                is CreateUserResult.Success -> call.respond(HttpStatusCode.Created, result.profile)

                is CreateUserResult.AlreadyExists -> call.respond(HttpStatusCode.Forbidden, "User already exists")

                is CreateUserResult.Error -> {
                    println("Failed to create user: ${result.exception}")
                    call.respond(HttpStatusCode.InternalServerError, "An unexpected error occurred")
                }
            }
        }

        post("/logIn") {
            val loginRequest = call.receive<LogInRequest>()
            when (val result: LogInResult = logInUser(loginRequest)) {
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
