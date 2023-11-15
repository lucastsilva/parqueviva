import { Component, ViewChild } from '@angular/core';
import { IAssociado } from 'src/app/Models/fire-database.model';
import { FireDatabaseService } from 'src/app/Services/fire-database.service';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CriarEditarAssociadoComponent } from './criar-editar-associado/criar-editar-associado.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-associados',
  templateUrl: './associados.component.html',
  styleUrls: ['./associados.component.scss']
})
export class AssociadosComponent {
  associado: IAssociado = {} as IAssociado;
  enviado: boolean = false;

  displayedColumns: string[] = [
    'nome',
    'email',
    'telefone',
    'conjunto',
    'numero',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private dbService: FireDatabaseService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  abrirAdicionarEditarAssociadoDialog() {
    const dialogRef = this.dialog.open(CriarEditarAssociadoComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.dbService.getAll();
        }
      },
    });
  }

  getEmployeeList() {
    this.dbService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // for searching employees with firstname, lastname, gennder, etc
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(CriarEditarAssociadoComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.dbService.getAll();
        }
      }
    });
  }

  deleteEmployee(id: string) {
    let confirm = window.confirm("Confirma a exclusão desse associado?");
    if (confirm) {
      this.dbService.delete(id);
    }
  }
}
