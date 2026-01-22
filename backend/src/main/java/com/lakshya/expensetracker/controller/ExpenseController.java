package com.lakshya.expensetracker.controller;

import com.lakshya.expensetracker.dto.ExpenseRequest;
import com.lakshya.expensetracker.model.Expense;
import com.lakshya.expensetracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense addExpense(@RequestBody ExpenseRequest request) {
        return expenseService.addExpense(request);
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return expenseService.getAllExpenses();
    }
}
