package com.sigurof.bankybank.db

import com.sigurof.bankybank.SignUpPrincipal
import com.sigurof.bankybank.web.rest.LogInRequest
import com.sigurof.bankybank.web.rest.ProfileResponse
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import java.util.UUID

sealed class CreateUserResult {
    data class Success(val profile: ProfileResponse) : CreateUserResult()

    data object AlreadyExists : CreateUserResult()

    data class Error(val exception: Exception) : CreateUserResult()
}

sealed class LogInResult {
    data class Success(val sessionId: UUID) : LogInResult()

    data object NotFound : LogInResult()

    data object WrongPassword : LogInResult()

    data class Error(val exception: Exception) : LogInResult()
}

object Profiles : Table() {
    val id: Column<Int> = integer("id").autoIncrement()
    val email: Column<String> = varchar("email", 255).uniqueIndex()
    val password: Column<String> = varchar("password", 255)
    val sessionId: Column<UUID?> = uuid("session_id").nullable()
}

fun getProfile(session: String?): ProfileResponse? =
    transaction {
        try {
            Profiles
                .selectAll()
                .where { Profiles.sessionId eq UUID.fromString(session) }
                .singleOrNull()
                ?.let {
                    ProfileResponse(
                        id = it[Profiles.id],
                        email = it[Profiles.email],
                    )
                }
        } catch (e: Exception) {
            null
        }
    }

fun createUser(loginRequest: SignUpPrincipal): CreateUserResult =
    transaction {
        try {
            val exists = Profiles.selectAll().where { Profiles.email eq loginRequest.email }.empty().not()
            if (exists) {
                CreateUserResult.AlreadyExists
            } else {
                val userId =
                    Profiles.insert {
                        it[email] = loginRequest.email
                        it[password] = loginRequest.password
                    } get (Profiles.id)
                val createdUser = ProfileResponse(userId, loginRequest.email)
                CreateUserResult.Success(createdUser)
            }
        } catch (e: Exception) {
            CreateUserResult.Error(e)
        }
    }

fun logInUser(loginRequest: LogInRequest): LogInResult =
    transaction {
        try {
            val user = Profiles.selectAll().where { Profiles.email eq loginRequest.email }.singleOrNull()
            if (user == null) {
                LogInResult.NotFound
            } else {
                if (user[Profiles.password] == loginRequest.password) {
                    val randomUUID = UUID.randomUUID()
                    Profiles.update({ Profiles.email eq loginRequest.email }) {
                        it[sessionId] = randomUUID
                    }
                    LogInResult.Success(randomUUID)
                } else {
                    LogInResult.WrongPassword
                }
            }
        } catch (e: Exception) {
            LogInResult.Error(e)
        }
    }
