
import {Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading: boolean = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe(); // prevents memory leaks
  }

  onDelete(postId: string) {
    console.log(postId);
    this.postsService.deletePost(postId);
  }
}
