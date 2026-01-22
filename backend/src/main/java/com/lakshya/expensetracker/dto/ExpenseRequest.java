package com.lakshya.expensetracker.dto;

public class ExpenseRequest {

    private String title;
    private double amount;

    public ExpenseRequest() {
        // default constructor required for JSON mapping
    }

    public String getTitle() {
        return title;
    }

    public double getAmount() {
        return amount;
    }
}
