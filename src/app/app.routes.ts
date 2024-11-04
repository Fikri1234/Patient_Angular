import { Routes } from '@angular/router';

import { IndexComponent } from './patient/index/index.component';
import { ViewComponent } from './patient/view/view.component';
import { CreateComponent } from './patient/create/create.component';
import { EditComponent } from './patient/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'patient/index', pathMatch: 'full' },
  { path: 'patient', redirectTo: 'patient/index', pathMatch: 'full' },
  { path: 'patient/index', component: IndexComponent },
  { path: 'patient/:postId/view', component: ViewComponent },
  { path: 'patient/create', component: CreateComponent },
  { path: 'patient/:postId/edit', component: EditComponent },
];
