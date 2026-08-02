package com.expensetracker.backend.controller;

import com.expensetracker.backend.service.ExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/export")
@CrossOrigin(origins = "http://localhost:5173")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @GetMapping("/pdf")
    public ResponseEntity<InputStreamResource> exportPdf() {

        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Disposition",
                "attachment; filename=Expense_Report.pdf");

        return ResponseEntity.ok()

                .headers(headers)

                .contentType(MediaType.APPLICATION_PDF)

                .body(new InputStreamResource(exportService.exportPdf()));

    }
    @GetMapping("/excel")
public ResponseEntity<InputStreamResource> exportExcel() {

    HttpHeaders headers = new HttpHeaders();

    headers.add(
            "Content-Disposition",
            "attachment; filename=Expense_Report.xlsx"
    );

    return ResponseEntity.ok()
            .headers(headers)
            .contentType(
                    MediaType.parseMediaType(
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    )
            )
            .body(
                    new InputStreamResource(
                            exportService.exportExcel()
                    )
            );
}

}