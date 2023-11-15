import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';

@Component({
  selector: 'app-criar-editar-associado',
  templateUrl: './criar-editar-associado.component.html',
  styleUrls: ['./criar-editar-associado.component.scss']
})
export class CriarEditarAssociadoComponent implements OnInit {
  associadoForm: FormGroup = {} as FormGroup;

  constructor(
    private dbService: FireDatabaseService,
    private dialogRef: MatDialogRef<CriarEditarAssociadoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.associadoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      modulo: ['', Validators.required],
      numero: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.associadoForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.associadoForm.valid) {
      if (this.data) {
        this.dbService.update(this.data.key, this.associadoForm.value);
        this.dialogRef.close(true);
      } else {
        this.dbService.create(this.associadoForm.value).then(() => {
          console.log('Created new item successfully!');
          this.dialogRef.close(true);
        });
      }
    }
  }
}
