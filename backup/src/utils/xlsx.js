import XLSX from "xlsx";

export default {
  download({ fileName, data } = {}) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "People");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
};
