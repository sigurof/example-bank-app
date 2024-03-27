package sigurof.com.session

import java.util.UUID
import sigurof.com.plugins.LogInInformation


object UserSessions {

    private val sessionsByUsername = mutableMapOf<String, UUID>()
    private val usernamePassword = mutableMapOf<String, String>()

    fun createSession(username: String): UUID{
        val session= UUID.randomUUID()
        sessionsByUsername[username] = session
        return session
    }

//    fun getUsername(session: String): String? {
//        return sessionsByUsername[session]
//    }

    fun deleteSession(session: String) {
        sessionsByUsername.remove(session)
    }

    fun createUser(loginInformation: LogInInformation) : Result<Unit> {
        if (usernamePassword.containsKey(loginInformation.username)) {
            return Result.failure(Exception("User already exists"))
        }
        usernamePassword[loginInformation.username] = loginInformation.password
        return Result.success(Unit)
    }


}
