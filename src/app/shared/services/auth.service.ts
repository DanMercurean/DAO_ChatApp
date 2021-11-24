import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  user: any;
  

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public auth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _snackBar: MatSnackBar
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.userData = user;
      
        // localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user') ?? ' ');
      } else {
        //localStorage.setItem('user', ' ');
      }
    })
  }

  //Sign in with email/password
  SignIn(email: any, password: any) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {
          this._snackBar.open('Welcome' + this.user.email);
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        this._snackBar.open(error.message);
      })
  }

  // // Sign up with email/password
  SignUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        this._snackBar.open(error.message);
      })
  }

  // // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.auth.currentUser.then(u => this.user.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // // Reset Forggot password
  // // ForgotPassword(passwordResetEmail) {
  // //   return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  // //   .then(() => {
  // //     window.alert('Password reset email sent, check your inbox.');
  // //   }).catch((error) => {
  // //     window.alert(error)
  // //   })
  // // }

  // Returns true when user is looged in and email is verified
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user') ?? '');
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

  // // Sign in with Google
  // // GoogleAuth() {
  // //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // // }

  // // // Auth logic to run auth providers
  // // AuthLogin(provider) {
  // //   return this.afAuth.auth.signInWithPopup(provider)
  // //   .then((result) => {
  // //      this.ngZone.run(() => {
  // //         this.router.navigate(['dashboard']);
  // //       })
  // //     this.SetUserData(result.user);
  // //   }).catch((error) => {
  // //     window.alert(error)
  // //   })
  // // }

  // /* Setting up user data when sign in with username/password, 
  // sign up with username/password and sign in with social auth  
  // provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user : any) {
    //const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    this.afs.collection('Users').doc(user.uid).set(userData).then().catch();
   
  }

  // // Sign out 
  // // SignOut() {
  // //   return this.afAuth.auth.signOut().then(() => {
  // //     localStorage.removeItem('user');
  // //     this.router.navigate(['sign-in']);
  // //   })
  // // }

}