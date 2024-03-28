package com.sigurof.bankybank.db

import com.sigurof.bankybank.web.rest.AccountRequest
import com.sigurof.bankybank.web.rest.AccountResponse
import com.sigurof.bankybank.web.rest.ProfileResponse
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.postgresql.util.PGobject
import java.math.BigDecimal
import java.util.UUID

sealed class GetAccountsResult {
    data class Success(val accounts: List<AccountResponse>) : GetAccountsResult()

    data class Error(val exception: Exception) : GetAccountsResult()
}

sealed class CreateAccountsResult {
    data class Success(val account: AccountResponse) : CreateAccountsResult()

    data class Error(val exception: Exception) : CreateAccountsResult()
}

class PGEnum<T : Enum<T>>(enumTypeName: String, enumValue: T?) : PGobject() {
    init {
        type = enumTypeName
        value = enumValue?.name
    }
}

enum class AccountType { SAVINGS, CHECKING }

object Accounts : Table() {
    val id: Column<Int> = integer("id").autoIncrement()
    val profileId: Column<Int> = integer("profile_id").references(Profiles.id)
    val name: Column<String> = varchar("name", 255)
    val type =
        customEnumeration(
            "type",
            "account_type",
            { value -> AccountType.valueOf(value as String) },
            { it: AccountType -> PGEnum("account_type", it) },
        )
    val number: Column<String> = varchar("number", 255)
    val balance: Column<BigDecimal> = decimal("balance", 2, 12)
}

fun createAccount(
    profile: ProfileResponse,
    account: AccountRequest,
): CreateAccountsResult =
    transaction {
        try {
            Accounts.insert {
                it[profileId] = profile.id
                it[name] = account.name
                it[type] = AccountType.SAVINGS
                it[number] = UUID.randomUUID().toString()
                it[balance] = BigDecimal(0)
            }.resultedValues!!.map { accountResponse(it) }
                .first()
                .let {
                    CreateAccountsResult.Success(
                        it,
                    )
                }
        } catch (e: Exception) {
            CreateAccountsResult.Error(e)
        }
    }

fun getAccounts(profile: ProfileResponse): GetAccountsResult =
    transaction {
        try {
            val accounts =
                Accounts.selectAll().where {
                    Accounts.profileId eq profile.id
                }.map { accountResponse(it) }
            GetAccountsResult.Success(accounts)
        } catch (e: Exception) {
            GetAccountsResult.Error(e)
        }
    }

private fun accountResponse(resultRow: ResultRow) =
    AccountResponse(
        id = resultRow[Accounts.id],
        name = resultRow[Accounts.name],
        type = resultRow[Accounts.type],
        number = resultRow[Accounts.number],
        balance = 0,
    )
