import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire//compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire//compat/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user: Observable<any> | undefined;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

    constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
      this.user = null!;
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            console.log('Dashboard: user', user);

            if (user) {
                this.user = this.firestore.collection('users').doc().valueChanges();
            }
        });
    }
}
