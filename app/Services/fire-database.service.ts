import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IAssociado } from '../Models/fire-database.model';

@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {
  private dbPath = '/associados';
  associados: AngularFireList<IAssociado> = {} as AngularFireList<IAssociado>;

  constructor(private db: AngularFireDatabase) {
    this.associados = db.list(this.dbPath);
   }

  getAll(): AngularFireList<IAssociado> {
    return this.associados;
  }

  create(tutorial: IAssociado): any {
    return this.associados.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.associados.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.associados.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.associados.remove();
  }
}
