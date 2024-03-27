package sigurof.com.plugins

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {

        get("/login") {
            call.respondText("Hello World!")
        }


        get("/accounts"){
            call.respondText("Hello World!")
        }

    }
}
