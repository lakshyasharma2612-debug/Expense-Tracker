package com.lakshya.expensetracker.dto;

public class ExpenseRequest {

    private String title;
    private double amount;
    private String category;

    public String getTitle() {
        return title;
    }

    public double getAmount() {
        return amount;
    }

    public String getCategory() {
        return category;
    }
}
