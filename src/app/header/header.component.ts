import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //user: User;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    //this.newUser();
    this
      .firestore
      .collection('Users')
      .valueChanges()
      .subscribe((users) => {
        console.log('Curent user', users);
      });

  }
  newUser() {
    //this.user = new User();
    this.firestore
    .collection('Users')
    .add({'Hallo':'Welt'}); 
  }
}
