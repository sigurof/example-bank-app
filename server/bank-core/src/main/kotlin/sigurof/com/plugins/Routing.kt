package sigurof.com.plugins

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.request.receive
import io.ktor.server.response.ApplicationResponse
import io.ktor.server.response.header
import io.ktor.server.response.respond
import io.ktor.server.response.respondText
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.routing
import kotlin.math.log
import kotlinx.serialization.Serializable
import sigurof.com.session.UserSessions

@Serializable
data class LogInInformation(val username: String, val password: String)

fun Application.configureRouting() {
    routing {

        post("/signUp") {
            val loginInformation = call.receive<LogInInformation>()
            UserSessions.createUser(loginInformation)
                .fold(
                    { call.respondText("User ${loginInformation.username} created") },
                    { call.respondText("User already exists", status = HttpStatusCode.BadRequest) }
                )
        }

        get("/logIn") {
            val loginInformation = call.receive<LogInInformation>()
            call.response.header(
                "Set-Cookie",
                "session=${UserSessions.createSession(loginInformation.username)}"
            )
            call.respondText("Hello World!")

        }


        get("/accounts") {
            call.respondText("Hello World!")
        }

    }
}
