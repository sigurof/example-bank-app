package com.sigurof.bankybank.db

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.Application
import liquibase.Liquibase
import liquibase.database.DatabaseFactory
import liquibase.database.jvm.JdbcConnection
import liquibase.exception.LiquibaseException
import liquibase.resource.ClassLoaderResourceAccessor
import org.jetbrains.exposed.sql.Database
import java.sql.Connection
import java.sql.SQLException
import javax.sql.DataSource

fun configureDb(datasource: DataSource) {
    configureLiquibase(datasource)
    configureJetbrainsExposed(datasource)
}

fun configureLiquibase(datasource: DataSource) =
    datasource.connection.use {
        runLiquibase(it)
    }

fun Application.hikariDatasource(): HikariDataSource {
    val baseUrl = environment.config.property("db.jdbc.url").getString()
    val user = environment.config.property("db.jdbc.user").getString()
    val dbPassword = environment.config.property("db.jdbc.password").getString()
    val port = environment.config.property("db.jdbc.port").getString()
    val databaseName = environment.config.property("db.jdbc.database").getString()
    val postgresUrl = "$baseUrl:$port/$databaseName"

    return HikariDataSource(
        HikariConfig().apply {
            jdbcUrl = postgresUrl
            username = user
            password = dbPassword
        },
    )
}

fun configureJetbrainsExposed(datasource: DataSource) =
    Database.connect(
        datasource,
    )

fun runLiquibase(c: Connection) {
    val liquibase: Liquibase?
    try {
        val database: liquibase.database.Database =
            DatabaseFactory.getInstance().findCorrectDatabaseImplementation(JdbcConnection(c))
        liquibase = Liquibase("db/changelog-master.yml", ClassLoaderResourceAccessor(), database)
        liquibase.update("main")
    } catch (e: SQLException) {
        e.printStackTrace()
        throw NoSuchElementException(e.message)
    } catch (e: LiquibaseException) {
        e.printStackTrace()
        throw NoSuchElementException(e.message)
    } finally {
        if (c != null) {
            try {
                c.rollback()
                c.close()
            } catch (e: SQLException) {
                // nothing to do
            }
        }
    }
}
