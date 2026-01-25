package com.lakshya.expensetracker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ExpenseRequest {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @Min(value = 1, message = "Amount must be greater than zero")
    private double amount;

    @NotNull(message = "Category is required")
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
