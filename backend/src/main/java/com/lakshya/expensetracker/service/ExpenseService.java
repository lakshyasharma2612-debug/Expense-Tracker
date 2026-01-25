package com.lakshya.expensetracker.service;

import com.lakshya.expensetracker.dto.ExpenseRequest;
import com.lakshya.expensetracker.model.Expense;
import com.lakshya.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import com.lakshya.expensetracker.exception.ResourceNotFoundException;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense addExpense(ExpenseRequest request) {

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty");
        }

        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        Expense expense = new Expense(
        request.getTitle(),
        request.getAmount(),
        request.getCategory()
);


        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
    if (!expenseRepository.existsById(id)) {
       throw new ResourceNotFoundException("Expense not found");

    }
    expenseRepository.deleteById(id);
    }
    
    public Expense updateExpense(Long id, ExpenseRequest request) {

    Expense expense = expenseRepository.findById(id)
           .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));


    expense.setTitle(request.getTitle());
    expense.setAmount(request.getAmount());
    expense.setCategory(request.getCategory());

    return expenseRepository.save(expense);
}


    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
}
