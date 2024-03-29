package com.sigurof.bankybank.web.rest

import com.sigurof.bankybank.SessionIdPrincipal
import com.sigurof.bankybank.SignUpPrincipal
import com.sigurof.bankybank.UserSession
import com.sigurof.bankybank.db.CreateUserResult
import com.sigurof.bankybank.db.createUser
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.auth.authenticate
import io.ktor.server.auth.principal
import io.ktor.server.response.respond
import io.ktor.server.routing.post
import io.ktor.server.routing.routing
import io.ktor.server.sessions.sessions
import io.ktor.server.sessions.set
import kotlinx.serialization.Serializable

@Serializable
data class LogInRequest(val email: String, val password: String)

fun Application.configureUserRouting() {
    routing {
        authenticate("auth-basic-register") {
            post("/signUp") {
                val signUpPrincipal = call.principal<SignUpPrincipal>()!!

                when (val result = createUser(signUpPrincipal)) {
                    is CreateUserResult.Success -> call.respond(HttpStatusCode.Created, result.profile)

                    is CreateUserResult.AlreadyExists -> call.respond(HttpStatusCode.Forbidden, "User already exists")

                    is CreateUserResult.Error -> {
                        println("Failed to create user: ${result.exception}")
                        call.respond(HttpStatusCode.InternalServerError, "An unexpected error occurred")
                    }
                }
            }
        }

        authenticate("auth-basic") {
            post("/logIn") {
                val sessionId = call.principal<SessionIdPrincipal>()?.sessionId
                call.sessions.set(UserSession(sessionId!!))
                call.respond(HttpStatusCode.OK, "Logged in")
            }
        }
    }
}
