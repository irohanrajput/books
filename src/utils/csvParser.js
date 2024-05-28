import csv from 'csv-parser';
import fs from 'fs';

const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = fs.createReadStream(filePath)
      .pipe(csv());

    stream.on('data', (data) => {
      results.push(data);
    });

    stream.on('end', () => {
      resolve(results);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
};

export default parseCSV;
