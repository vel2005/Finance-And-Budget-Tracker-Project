import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (
    income,
    expenses,
    budgets
) => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("Smart Expense Tracker Report",20,20);

    autoTable(doc,{

        startY:35,

        head:[["Type","Title","Category","Amount","Date"]],

        body:[

            ...income.map(i=>[
                "Income",
                i.title,
                i.source,
                i.amount,
                i.date
            ]),

            ...expenses.map(e=>[
                "Expense",
                e.title,
                e.category,
                e.amount,
                e.date
            ])

        ]

    });

    doc.save("Expense_Report.pdf");

};