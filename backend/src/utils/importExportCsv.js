import { json2csv, csv2json } from "json-2-csv";
import fs from "fs";

// Importación de tareas
export const jsonToCsv = async (tasks, filePath) => {
  return await new Promise((resolve, reject) => {
    try {
      const csv = json2csv(tasks, {
        excelBOM: true,
      });
      if (csv) {
        fs.writeFile(filePath, csv, { encoding: "utf8" }, (err) => {
          if (err) {
            reject(err);
          }
          resolve(csv);
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Exportación de tareas
export const csvToJson = async (filePath) => {
  return await new Promise((resolve, reject) => {
    try {
      fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
        if (err) {
          reject(err);
        }
        const json = csv2json(data);
        resolve(json);
      });
    } catch (error) {
      reject(error);
    }
  });
};
