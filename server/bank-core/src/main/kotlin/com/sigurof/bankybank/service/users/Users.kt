package com.sigurof.bankybank.service.users

import com.sigurof.bankybank.plugins.LogInInformation
import com.sigurof.bankybank.session.Profile
import com.sigurof.bankybank.session.Profiles
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import java.util.UUID

sealed class CreateUserResult {
    data class Success(val profile: Profile) : CreateUserResult()

    data object AlreadyExists : CreateUserResult()

    data class Error(val exception: Exception) : CreateUserResult()
}

sealed class LogInResult {
    data class Success(val sessionId: UUID) : LogInResult()

    data object NotFound : LogInResult()

    data object WrongPassword : LogInResult()

    data class Error(val exception: Exception) : LogInResult()
}

fun getUserEmail(session: String?): String? {
    return transaction {
        try {
            val user = Profiles.selectAll().where { Profiles.sessionId eq UUID.fromString(session) }.singleOrNull()
            user?.get(Profiles.email)
        } catch (e: Exception) {
            null
        }
    }
}

fun createUser(loginInformation: LogInInformation): CreateUserResult =
    transaction {
        try {
            val exists = Profiles.selectAll().where { Profiles.email eq loginInformation.email }.empty().not()
            if (exists) {
                CreateUserResult.AlreadyExists
            } else {
                val userId =
                    Profiles.insert {
                        it[email] = loginInformation.email
                        it[password] = loginInformation.password
                    } get (Profiles.id)
                CreateUserResult.Success(Profile(userId, loginInformation.email, loginInformation.password))
            }
        } catch (e: Exception) {
            CreateUserResult.Error(e)
        }
    }

fun logInUser(loginInformation: LogInInformation): LogInResult =
    transaction {
        try {
            val user = Profiles.selectAll().where { Profiles.email eq loginInformation.email }.singleOrNull()
            if (user == null) {
                LogInResult.NotFound
            } else {
                val profile = Profile(user[Profiles.id], user[Profiles.email], user[Profiles.password])
                if (profile.password == loginInformation.password) {
                    val randomUUID = UUID.randomUUID()
                    Profiles.update({ Profiles.email eq loginInformation.email }) {
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
