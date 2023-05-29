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
    path: 'eauto',
    loadChildren: () => import('./eauto/eauto.module').then( m => m.EautoPageModule)
  },
  {
    path: 'ambulance',
    loadChildren: () => import('./ambulance/ambulance.module').then( m => m.AmbulancePageModule)
  },
  {
    path: 'crane',
    loadChildren: () => import('./crane/crane.module').then( m => m.CranePageModule)
  },
  {
    path: 'bulldozer',
    loadChildren: () => import('./bulldozer/bulldozer.module').then( m => m.BulldozerPageModule)
  },
  {
    path: 'schoolvan',
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
