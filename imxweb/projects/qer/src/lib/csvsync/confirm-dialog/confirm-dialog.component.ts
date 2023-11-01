import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';


@Component({
  selector: 'imx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, selectedOptionKey: any, selectedOptionValue: any, totalRows: number },
    private dialogRef: MatDialogRef<ConfirmDialogComponent> // Inject MatDialogRef
  ) {}

  // Handle cancel button click
  onNoClick(): void {
    this.dialogRef.close(false); // Close the dialog with a result (false in this case)
  }

  ngOnInit(): void {
  }

}
