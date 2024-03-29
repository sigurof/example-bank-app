package com.sigurof.bankybank.web.rest

import com.sigurof.bankybank.ProfilePrincipal
import com.sigurof.bankybank.db.AccountType
import com.sigurof.bankybank.db.CreateAccountsResult
import com.sigurof.bankybank.db.GetAccountsResult
import com.sigurof.bankybank.db.createAccount
import com.sigurof.bankybank.db.getAccounts
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.auth.authenticate
import io.ktor.server.auth.principal
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.routing
import kotlinx.serialization.Serializable

@Serializable
data class AccountResponse(
    val id: Int,
    val name: String,
    val type: AccountType,
    val number: String,
    val balance: Int,
)

@Serializable
data class AccountRequest(val name: String)

fun Application.configureAccountsRouting() {
    routing {
        authenticate("auth-session") {
            get("/accounts") {
                val profile = call.principal<ProfilePrincipal>()!!.profile
                when (val result = getAccounts(profile)) {
                    is GetAccountsResult.Success -> {
                        call.respond(HttpStatusCode.OK, result.accounts)
                    }

                    is GetAccountsResult.Error -> {
                        call.respond(HttpStatusCode.InternalServerError)
                    }
                }
            }

            post("/accounts") {
                val profile = call.principal<ProfilePrincipal>()!!.profile
                val account = call.receive<AccountRequest>()
                when (val result = createAccount(profile, account)) {
                    is CreateAccountsResult.Success -> {
                        call.respond(HttpStatusCode.OK, result.account)
                    }

                    is CreateAccountsResult.Error -> {
                        call.respond(HttpStatusCode.InternalServerError)
                    }
                }
                call.respond(HttpStatusCode.Created)
            }
        }
    }
}
