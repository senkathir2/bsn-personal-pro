package com.pro.book.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum BusinessErrorCodes {

    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No Code"),
    INCORRECT_CURRENT_PASSWORD(300,HttpStatus.BAD_REQUEST,"Current password is incorrect"),
    NEW_PASSWORD_DOES_NOT_MATCH(301,HttpStatus.BAD_REQUEST,"The new password does not match"),
    ACCOUNT_LOCKED(302,HttpStatus.FORBIDDEN,"User account is Locked"),
    ACCOUNT_DISABLED(303,HttpStatus.FORBIDDEN,"User account is Disabled"),
    BAD_CREDENTIALS(304,HttpStatus.FORBIDDEN,"Login and / or password is incorrect")
    ;

    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;

    BusinessErrorCodes( int code, HttpStatus httpStatus, String description) {
        this.description = description;
        this.httpStatus = httpStatus;
        this.code = code;
    }
}
