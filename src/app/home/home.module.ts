import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const route: Routes = [{
    path: '',
    component: HomeComponent,
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        RouterModule,
    ]
})
export class HomeModule { }