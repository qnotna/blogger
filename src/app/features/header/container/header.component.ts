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

=======
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed
  constructor(public dialog: MatDialog) { }

  onLogout() {
    this.logout.emit();
  }
  onPostingPost(): void {
    let dialogRef = this.dialog.open(MyDialogComponent, {
<<<<<<< HEAD
      data: {
         blogId: this.blogId 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Closed')
    })
  }
=======
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('Dialog Closed')
    })
  }


>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed
}
