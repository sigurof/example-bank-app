package com.sigurof.bankybank.db

import com.sigurof.bankybank.dbPassword
import com.sigurof.bankybank.postgresUrl
import com.sigurof.bankybank.user
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import liquibase.Liquibase
import liquibase.database.DatabaseFactory
import liquibase.database.jvm.JdbcConnection
import liquibase.exception.LiquibaseException
import liquibase.resource.ClassLoaderResourceAccessor
import org.jetbrains.exposed.sql.Database
import java.sql.Connection
import java.sql.SQLException

fun configureDb() {
    val datasource =
        HikariDataSource(
            HikariConfig().apply {
                jdbcUrl = postgresUrl
                username = user
                password = dbPassword
            },
        )
    datasource.connection.use {
        runLiquibase(it)
    }
    Database.connect(
        datasource,
    )
}

private fun runLiquibase(c: Connection) {
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
