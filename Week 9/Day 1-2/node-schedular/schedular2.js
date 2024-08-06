// Job to check the status of the invoice and archive the invoice if the status is paid.
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const invoices = require("./data/invoice.json");

const archiveInvoices = () => {
  console.log("Running Archive invoices task at: ", new Date().toISOString());
  try {
    const paidInvoices = invoices.filter(
      (invoice) => invoice.status === "paid"
    );
    if (paidInvoices.length > 0) {
      paidInvoices.forEach((invoice) => {
        invoices.splice(
          invoices.findIndex((i) => i.status == invoice.status),
          1
        );
      });

      fs.writeFileSync(
        path.join(__dirname, "data", "invoice.json"),
        JSON.stringify(invoices),
        "utf-8"
      );

      fs.writeFileSync(
        path.join(__dirname, "data", "archive.json"),
        JSON.stringify(paidInvoices),
        "utf-8"
      );

      console.log('paid invoices are, ', paidInvoices)
    }
  } catch (error) {
    console.log("Error in archiving invoices: ", error);
  }
  console.log("archive invoices task ended");
};

cron.schedule("*/30 * * * * *", archiveInvoices);
