import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrls: ['./pokemon-details-dialog.component.scss']
})
export class PokemonDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PokemonDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getTypeNames(types: any[]): string {
    return types.map(t => t.type.name).join(', ');
  }
}
