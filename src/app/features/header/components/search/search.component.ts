import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  blogs$: Observable<Blog[]>;
  blogs: Blog[];
  @Input() blogId: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEnter(value: string) {
    console.log(value)
    this.router.navigate([`home/blogs/${this.blogId}/posts/search`], { queryParams: { q: value } })
    console.log(this.blogId)
  }

}
