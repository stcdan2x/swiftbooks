import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalBalance: number;

  constructor(private clientservice: ClientService) {}

  ngOnInit(): void {
    this.clientservice.getClients().subscribe((clients) => {
      this.clients = clients;
      this.getTotalBalance();
    });
  }

  getTotalBalance() {
    this.totalBalance = this.clients.reduce((acc, client) => {
      return acc + client.acctBalance!;
    }, 0);
  }
}
