import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() blogs: Blog[];
  @Output() blogChanged = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  constructor(public dialog: MatDialog) { }

  onLogout() {
    this.logout.emit();
  }
  onPostingPost(): void {
    let dialogRef = this.dialog.open(MyDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('Dialog Closed')
    })
  }


}
