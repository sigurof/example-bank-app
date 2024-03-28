package com.sigurof.bankybank.web.rest

import com.sigurof.bankybank.db.getProfile
import com.sigurof.bankybank.plugins.configureSerialization
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.ApplicationCall
import io.ktor.server.application.install
import io.ktor.server.plugins.cors.routing.CORS
import io.ktor.server.response.header
import io.ktor.server.response.respond
import kotlinx.serialization.Serializable

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

@Serializable
data class ProfileResponse(val id: Int, val email: String)

suspend fun ApplicationCall.authorizeOrRespond(): ProfileResponse? {
    return getProfile(request.cookies["sessionId"]) ?: run {
        response.header(
            "Set-Cookie",
            "sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure",
        )
        respond(HttpStatusCode.Unauthorized)
        return null
    }
}
