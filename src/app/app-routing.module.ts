import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';



const routes: Routes = [
  { path: 'channel/:name', component: ChannelComponent },
  // { path: '**', redirectTo: '' },
  { path: '', component: DashboardComponent },
  { path: 'singin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'verifyemailaddress', component: VerifyEmailComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
