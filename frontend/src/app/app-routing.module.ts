import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignup } from './pages/user-signup/user-signup';
import { ServiceDetails } from './pages/service-details/service-details';
import { MarketplaceHomepage } from './pages/marketplace-homepage/marketplace-homepage';

import { UserLogin } from './pages/user-login/user-login';
import { ReservationsClient } from './pages/reservations-client/reservations-client';
import { ReservationsPrestataire } from './pages/reservations-prestataire/reservations-prestataire';

const routes: Routes = [
  { path: '', redirectTo: 'user-signup', pathMatch: 'full' },
  { path: 'user-signup', component: UserSignup },
  { path: 'user-login', component: UserLogin },
  { path: 'service-details', component: ServiceDetails },
  { path: 'marketplace-homepage', component: MarketplaceHomepage },
  { path: 'reservations-client', component: ReservationsClient },
  { path: 'reservations-prestataire', component: ReservationsPrestataire },
  { path: '**', redirectTo: 'user-signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
