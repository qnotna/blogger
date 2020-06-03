import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() blogs: Blog[];
  @Input() blogId: string;
  @Output() blogChanged = new EventEmitter<string>();
  @Output() searchPosts = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

<<<<<<< HEAD
<<<<<<< HEAD
  constructor() {}
=======
=======
>>>>>>> test 1
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


<<<<<<< HEAD
>>>>>>> test 1
=======
>>>>>>> test 1
}
