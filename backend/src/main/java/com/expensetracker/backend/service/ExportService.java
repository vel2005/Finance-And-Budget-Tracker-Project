package com.expensetracker.backend.service;

import com.expensetracker.backend.entity.Expense;
import com.expensetracker.backend.entity.Income;
import com.expensetracker.backend.repository.ExpenseRepository;
import com.expensetracker.backend.repository.IncomeRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


@Service
public class ExportService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public ByteArrayInputStream exportPdf() {

        Document document = new Document();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

            Paragraph title = new Paragraph("SMART EXPENSE TRACKER REPORT", titleFont);

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            List<Income> incomes = incomeRepository.findAll();

            PdfPTable incomeTable = new PdfPTable(4);

            incomeTable.addCell("Title");
            incomeTable.addCell("Source");
            incomeTable.addCell("Amount");
            incomeTable.addCell("Date");

            double totalIncome = 0;

            for (Income income : incomes) {

                incomeTable.addCell(income.getTitle());
                incomeTable.addCell(income.getSource());
                incomeTable.addCell(String.valueOf(income.getAmount()));
                incomeTable.addCell(income.getDate().toString());

                totalIncome += income.getAmount();
            }

            document.add(new Paragraph("Income"));

            document.add(incomeTable);

            document.add(new Paragraph(" "));

            List<Expense> expenses = expenseRepository.findAll();

            PdfPTable expenseTable = new PdfPTable(4);

            expenseTable.addCell("Title");
            expenseTable.addCell("Category");
            expenseTable.addCell("Amount");
            expenseTable.addCell("Date");

            double totalExpense = 0;

            for (Expense expense : expenses) {

                expenseTable.addCell(expense.getTitle());
                expenseTable.addCell(expense.getCategory());
                expenseTable.addCell(String.valueOf(expense.getAmount()));
                expenseTable.addCell(expense.getDate().toString());

                totalExpense += expense.getAmount();
            }

            document.add(new Paragraph("Expenses"));

            document.add(expenseTable);

            document.add(new Paragraph(" "));

            document.add(new Paragraph("Total Income : ₹ " + totalIncome));

            document.add(new Paragraph("Total Expense : ₹ " + totalExpense));

            document.add(new Paragraph("Balance : ₹ " + (totalIncome - totalExpense)));

            document.close();

        } catch (Exception e) {

            e.printStackTrace();

        }

        return new ByteArrayInputStream(out.toByteArray());

    }
    
    public ByteArrayInputStream exportExcel() {

    try {

        XSSFWorkbook workbook = new XSSFWorkbook();

        Sheet sheet = workbook.createSheet("Expense Report");

        int rowNum = 0;

        Row header = sheet.createRow(rowNum++);

        header.createCell(0).setCellValue("Type");
        header.createCell(1).setCellValue("Title");
        header.createCell(2).setCellValue("Category/Source");
        header.createCell(3).setCellValue("Amount");
        header.createCell(4).setCellValue("Date");

        double totalIncome = 0;
        double totalExpense = 0;

        // Income Data
        for (Income income : incomeRepository.findAll()) {

            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue("Income");
            row.createCell(1).setCellValue(income.getTitle());
            row.createCell(2).setCellValue(income.getSource());
            row.createCell(3).setCellValue(income.getAmount());
            row.createCell(4).setCellValue(income.getDate().toString());

            totalIncome += income.getAmount();
        }

        // Expense Data
        for (Expense expense : expenseRepository.findAll()) {

            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue("Expense");
            row.createCell(1).setCellValue(expense.getTitle());
            row.createCell(2).setCellValue(expense.getCategory());
            row.createCell(3).setCellValue(expense.getAmount());
            row.createCell(4).setCellValue(expense.getDate().toString());

            totalExpense += expense.getAmount();
        }

        rowNum++;

        Row incomeRow = sheet.createRow(rowNum++);
        incomeRow.createCell(0).setCellValue("Total Income");
        incomeRow.createCell(1).setCellValue(totalIncome);

        Row expenseRow = sheet.createRow(rowNum++);
        expenseRow.createCell(0).setCellValue("Total Expense");
        expenseRow.createCell(1).setCellValue(totalExpense);

        Row balanceRow = sheet.createRow(rowNum++);
        balanceRow.createCell(0).setCellValue("Balance");
        balanceRow.createCell(1).setCellValue(totalIncome - totalExpense);

        // Auto-size columns
        for (int i = 0; i < 5; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        workbook.write(out);

        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());

    } catch (Exception e) {

        e.printStackTrace();

        return null;

    }

}
}