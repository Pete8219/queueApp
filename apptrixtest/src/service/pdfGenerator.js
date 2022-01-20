import jsPDF from "jspdf";
import "jspdf-autotable";

const timeConvert = (duration) => {
  let hours = Math.floor(duration / 60);

  let minutes = duration - hours * 60;

  return `${hours} hours ${minutes} minutes`;
};

// define a generatePDF function that accepts a tickets argument
const generatePDF = (workItems) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Text", "UserName", "Duration"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  workItems.forEach((item) => {
    let time = timeConvert(item.duration.minutes);
    const workItemsData = [item.text, item.creator.name, time];
    // push each tickcet's info into a row
    tableRows.push(workItemsData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("List of workItems.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
