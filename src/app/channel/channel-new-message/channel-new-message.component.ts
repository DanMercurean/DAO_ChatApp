import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-channel-new-message',
  templateUrl: './channel-new-message.component.html',
  styleUrls: ['./channel-new-message.component.scss']
})
export class ChannelNewMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      console.log(myForm.value.message);
      alert('Your message was sent: ' + myForm.value.message);
      myForm.resetForm();
    }
  }

}
