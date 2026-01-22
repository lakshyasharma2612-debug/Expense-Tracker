package com.lakshya.expensetracker.controller;

import com.lakshya.expensetracker.model.StatusResponse;
import com.lakshya.expensetracker.service.StatusService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping("/status")
    public StatusResponse status() {
        return statusService.getStatus();
    }
}
