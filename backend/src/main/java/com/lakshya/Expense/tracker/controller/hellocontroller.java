package com.lakshya.expensetracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hellocontroller {

    @GetMapping("/hello")
    public String hello() {
        return "Expense Tracker backend is running!";
    }
}
