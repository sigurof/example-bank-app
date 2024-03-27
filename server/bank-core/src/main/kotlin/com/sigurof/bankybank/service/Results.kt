package com.sigurof.bankybank.service

import com.sigurof.bankybank.session.Profile

sealed class ApiResult {
    data class Success(val profile: Profile) : ApiResult()

    data class Error(val exception: Exception) : ApiResult()
}
