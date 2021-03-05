import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Post} from '../../post.model'
import { PostsService } from '../../posts.service';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {


  // posts = [
  //   {
  //     title:'First Post', content:'This is the first post content'
  //   },
  //   {
  //     title:'Second Post', content:'This is the Second post content'
  //   },
  //   {
  //     title:'Third Post', content:'This is the Third post content'
  //   }
  // ]
 posts : Post[]=[]
 isLoading=false
 private postsSub: Subscription | any
constructor(public postsService:PostsService){
  
}

  ngOnInit(): void {
      this.postsService.getPosts()
      this.isLoading=true
  this.postsSub =  this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[])=>{
      this.isLoading=false
this.posts=posts
    })
  }


  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
  onDelete(postId: string){
    this.postsService.deletePost(postId)
  }

}
