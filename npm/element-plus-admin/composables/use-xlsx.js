import * as Xlsx from "xlsx";

export const useXlsx = () => {
  const save = ({ fileName, data } = {}) => {
    const worksheet = Xlsx.utils.json_to_sheet(data);
    const workbook = Xlsx.utils.book_new();

    Xlsx.utils.book_append_sheet(workbook, worksheet, "People");
    Xlsx.writeFile(workbook, `${fileName}.xlsx`);
  };

  return {
    save,
  };
};
