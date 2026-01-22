package com.lakshya.expensetracker.model;

public class StatusResponse {

    private String status;
    private String message;

    // constructor
    public StatusResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    // getters
    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
