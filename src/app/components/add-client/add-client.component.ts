import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    acctBalance: 0,
  };

  disableAcctBalance: boolean = true;

  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private flashMsg: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  /* onSubmit({ value, valid }: { value: Client; valid: boolean | null }) {
    console.log(value, valid);
  } */

  onSubmit(cForm: NgForm) {
    if (this.disableAcctBalance) {
      cForm.value.acctBalance = 0;
    }

    if (!cForm.valid) {
      this.flashMsg.show('Please make sure the form is filled out correctly', {
        cssClass: 'alert-danger',
        timeout: 5000,
      });
    } else {
      this.flashMsg.show('New Client successfully registered', {
        cssClass: 'alert-success',
        timeout: 5000,
      });
    }
  }
}
