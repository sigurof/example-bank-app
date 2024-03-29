package com.sigurof.bankybank

import com.sigurof.bankybank.db.LogInResult
import com.sigurof.bankybank.db.getProfile
import com.sigurof.bankybank.db.logInUser
import com.sigurof.bankybank.web.rest.LogInRequest
import com.sigurof.bankybank.web.rest.ProfileResponse
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.auth.Principal
import io.ktor.server.auth.authentication
import io.ktor.server.auth.basic
import io.ktor.server.auth.session
import io.ktor.server.response.respond
import io.ktor.server.sessions.Sessions
import io.ktor.server.sessions.cookie

data class UserSession(val id: String)

data class SessionIdPrincipal(val sessionId: String) : Principal

data class ProfilePrincipal(val profile: ProfileResponse) : Principal

data class SignUpPrincipal(val email: String, val password: String) : Principal

fun Application.configureSecurity() {
    install(Sessions) {
        cookie<UserSession>("user_session") {
            cookie.path = "/"
            cookie.maxAgeInSeconds = 31 * 24 * 3600
        }
    }

    authentication {
        basic("auth-basic-register") {
            validate { credentials ->
                SignUpPrincipal(
                    email = credentials.name,
                    password = credentials.password,
                )
            }
        }
        basic("auth-basic") {
            realm = "Access to the '/' path"
            validate { credentials ->
                val loginRequest =
                    LogInRequest(
                        email = credentials.name,
                        password = credentials.password,
                    )

                when (val result: LogInResult = logInUser(loginRequest)) {
                    is LogInResult.Success -> {
                        SessionIdPrincipal(result.sessionId.toString())
                    }

                    is LogInResult.NotFound -> {
                        respond(HttpStatusCode.NotFound, "User not found")
                        null
                    }

                    is LogInResult.WrongPassword -> {
                        respond(HttpStatusCode.Forbidden, "Wrong password")
                        null
                    }

                    is LogInResult.Error -> {
                        println("Failed to verify user: ${result.exception}")
                        respond(HttpStatusCode.InternalServerError, "An unexpected error occurred")
                        null
                    }
                }
            }
        }
        session<UserSession>("auth-session") {
            validate { session ->
                getProfile(session.id)
                    ?.let {
                        ProfilePrincipal(it)
                    }
            }
            challenge {
                call.respond(HttpStatusCode.Unauthorized, "You must log in first.")
            }
        }
    }
}
