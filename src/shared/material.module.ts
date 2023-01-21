import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatSidenavModule,
        MatListModule,
    ],
})

export class MaterialModule {}
