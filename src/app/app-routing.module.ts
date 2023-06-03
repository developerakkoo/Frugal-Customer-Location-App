import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'auto-form',
    loadChildren: () => import('./auto-form/auto-form.module').then( m => m.AutoFormPageModule)
  },
  {
    path: 'eauto/:lat/:lng/:userId',
    loadChildren: () => import('./eauto/eauto.module').then( m => m.EautoPageModule)
  },
  {
    path: 'ambulance/:lat/:lng/:userId',
    loadChildren: () => import('./ambulance/ambulance.module').then( m => m.AmbulancePageModule)
  },
  {
    path: 'crane/:lat/:lng/:userId',
    loadChildren: () => import('./crane/crane.module').then( m => m.CranePageModule)
  },
  {
    path: 'bulldozer/:lat/:lng/:userId',
    loadChildren: () => import('./bulldozer/bulldozer.module').then( m => m.BulldozerPageModule)
  },
  {
    path: 'schoolvan/:lat/:lng/:userId',
    loadChildren: () => import('./schoolvan/schoolvan.module').then( m => m.SchoolvanPageModule)
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'set-pin/:id',
    loadChildren: () => import('./set-pin/set-pin.module').then( m => m.SetPinPageModule)
  },
  {
    path: 'enter-pin/:id',
    loadChildren: () => import('./enter-pin/enter-pin.module').then( m => m.EnterPinPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tanker/:lat/:lng/:userId',
    loadChildren: () => import('./tanker/tanker.module').then( m => m.TankerPageModule)
  },
  {
    path: 'firebrigade/:lat/:lng/:userId',
    loadChildren: () => import('./firebrigade/firebrigade.module').then( m => m.FirebrigadePageModule)
  },
  {
    path: 'auto/:lat/:lng/:userId',
    loadChildren: () => import('./auto/auto.module').then( m => m.AutoPageModule)
  },
  {
    path: 'cargo/:lat/:lng/:userId',
    loadChildren: () => import('./cargo/cargo.module').then( m => m.CargoPageModule)
  },
  {
    path: 'truck/:lat/:lng/:userId',
    loadChildren: () => import('./truck/truck.module').then( m => m.TruckPageModule)
  },
  {
    path: 'tractor/:lat/:lng/:userId',
    loadChildren: () => import('./tractor/tractor.module').then( m => m.TractorPageModule)
  },
  {
    path: 'roadroller/:lat/:lng/:userId',
    loadChildren: () => import('./roadroller/roadroller.module').then( m => m.RoadrollerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
