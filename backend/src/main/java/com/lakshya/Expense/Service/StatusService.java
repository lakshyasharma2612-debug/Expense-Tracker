package com.lakshya.expensetracker.service;

import com.lakshya.expensetracker.model.StatusResponse;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

    public StatusResponse getStatus() {
        return new StatusResponse(
                "ok",
                "Expense Tracker API is alive"
        );
    }
}
