import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openMobileMenu() {
    this.dialog.open(MobileMenuComponent, {
      panelClass: 'custom-dialog-container',
    });
  }

  ngOnInit(): void {}
}
