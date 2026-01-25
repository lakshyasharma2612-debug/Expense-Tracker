package com.lakshya.expensetracker.controller;

import com.lakshya.expensetracker.dto.ExpenseRequest;
import com.lakshya.expensetracker.model.Expense;
import com.lakshya.expensetracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense addExpense(@Valid @RequestBody ExpenseRequest request)
 {
        return expenseService.addExpense(request);
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return expenseService.getAllExpenses();
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request
    ) {
        return expenseService.updateExpense(id, request);
    }



}
