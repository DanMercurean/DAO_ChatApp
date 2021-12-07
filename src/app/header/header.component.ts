import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire//compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    //this.newUser();
    // this
    //   .firestore
    //   .collection('Users')
    //   .valueChanges()
    //   .subscribe(() => {
    //     console.log('Curent user', createUserWithEmailAndPassword);
    //   });

  }
  newUser() {
    //this.user = new User();
    // this.firestore
    // .collection('Users')
    // .add({'Hallo':'Welt'}); 
  }
 logout(): void {
    this.afAuth.signOut();
}

}
