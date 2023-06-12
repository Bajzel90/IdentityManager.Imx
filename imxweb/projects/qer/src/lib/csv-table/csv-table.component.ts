import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'imx-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss']
})
export class CsvTableComponent implements OnInit {
  csvData: any[] = []; 
  headers: string[] = []; 

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readCSV(file);
    }
  }

  readCSV(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result as string;
      const lines = csvData.split('\n');
      this.headers = lines[0].split(',');

      this.csvData = [];
      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(',');
        const row = {};
        for (let j = 0; j < this.headers.length; j++) {
          row[this.headers[j]] = data[j];
        }
        this.csvData.push(row);
      }
    };
    reader.readAsText(file);
  }
}

