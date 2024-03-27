package sigurof.com.bankybank

import com.sigurof.bankybank.db.configureDb
import com.sigurof.bankybank.plugins.configureSerialization
import com.sigurof.bankybank.web.rest.configureRestRouting
import com.zaxxer.hikari.HikariDataSource
import io.kotest.core.extensions.install
import io.kotest.core.spec.style.FreeSpec
import io.kotest.extensions.testcontainers.JdbcDatabaseContainerExtension
import io.kotest.matchers.shouldBe
import io.ktor.client.request.cookie
import io.ktor.client.request.get
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.ApplicationTestBuilder
import io.ktor.server.testing.testApplication
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.utility.DockerImageName
import java.util.UUID

class ApplicationTest : FreeSpec({

    val dockerImageName = DockerImageName.parse("postgres:16.2-alpine3.19")
    val postgres: PostgreSQLContainer<*> =
        PostgreSQLContainer(dockerImageName).apply {
            withDatabaseName("postgres")
            withUsername("postgres")
            withPassword("bank")
        }
    val datasource: HikariDataSource = install(JdbcDatabaseContainerExtension(postgres))
    configureDb(datasource)

    "getting accounts" - {
        "fails if you're unauthorized" - {
            testApplication {
                configureSerializationAndRestRouting()
                client.get("/accounts").apply {
                    status shouldBe HttpStatusCode.Unauthorized
                }
            }
        }

        "works if you're authorized" - {
            val randomUUID = UUID.randomUUID()
            val email = "sigurd.ofstad@spond.com"
            datasource.connection.use { connection ->
                connection.prepareStatement(
                    "INSERT INTO profiles (id, email, password, session_id) VALUES (' 1', ?, 'password', ?)",
                ).apply {
                    setString(1, email)
                    setObject(2, randomUUID)
                }.execute()
            }
            testApplication {
                configureSerializationAndRestRouting()
                client.get("/accounts") {
                    cookie("sessionId", randomUUID.toString())
                }.apply {
                    status shouldBe HttpStatusCode.OK
                }
            }
        }
    }
})

private fun ApplicationTestBuilder.configureSerializationAndRestRouting() =
    application {
        configureSerialization()
        configureRestRouting()
    }
