package com.lakshya.expensetracker.service;

import com.lakshya.expensetracker.dto.ExpenseRequest;
import com.lakshya.expensetracker.model.Expense;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExpenseService {

    private final List<Expense> expenses = new ArrayList<>();

    public Expense addExpense(ExpenseRequest request) {
        Expense expense = new Expense(request.getTitle(), request.getAmount());
        expenses.add(expense);
        return expense;
    }

    public List<Expense> getAllExpenses() {
        return expenses;
    }
}
