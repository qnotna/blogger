import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  blogs$: Observable<Blog[]>;
  blogs: Blog[];

  constructor(private api: ApiWebService, private authService: AuthService) {}

  ngOnInit(): void {
  }

  input: string = "";

  onEnter(value: string) {
     this.input = value; 
     console.log(this.input)
     //this.blogs$ = this.api.searchPostsForBlog(1,this.input);
  }

}
