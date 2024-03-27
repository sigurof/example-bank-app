package com.sigurof.bankybank.session

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table
import java.util.UUID

// Table definition using Exposed
object Profiles : Table() {
    val id: Column<Int> = integer("id").autoIncrement()
    val email: Column<String> = varchar("email", 255).uniqueIndex()
    val password: Column<String> = varchar("password", 255)
    val sessionId: Column<UUID?> = uuid("session_id").nullable()
}

@Serializable
data class Profile(val id: Int, val email: String, val password: String)
