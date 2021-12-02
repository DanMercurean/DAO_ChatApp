import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { createUserWithEmailAndPassword } from '@firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    //this.newUser();
    this
      .firestore
      .collection('Users')
      .valueChanges()
      .subscribe(() => {
        console.log('Curent user', createUserWithEmailAndPassword);
      });

  }
  newUser() {
    //this.user = new User();
    this.firestore
    .collection('Users')
    .add({'Hallo':'Welt'}); 
  }
}
