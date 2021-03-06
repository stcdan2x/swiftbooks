import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map((action) => {
          const data = action.payload.doc.data() as Client;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    return this.clients;
  }
}
