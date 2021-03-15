
import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http'
import {Subject} from 'rxjs'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({providedIn:'root'})
export class PostsService {
  private  posts:Post[] = [];

  private postsUpdated = new Subject<Post[]>()

constructor(private http:HttpClient, private router: Router){}
getPosts() {
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    //rxjs map
    .pipe(map((postData)=>{
        //normal map
return postData.posts.map((post:any)=>{
    return {
        title:post.title,
        content:post.content,
        id:post._id,
        imagePath:post.imagePath
    }
})
    }))
    .subscribe((transformedPosts)=>{
this.posts = transformedPosts;
this,this.postsUpdated.next([...this.posts])
    })
}
getPostUpdateListener(){
    return this.postsUpdated.asObservable();
}

getPost(id: string | null){
return this.http.get<{_id:string, title:string, content:string}>("http://localhost:3000/api/posts/" + id)
}

addPost(title:string, content: string, image: File){
    // const post: Post = {title:title, content:content,id:''}
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append('image', image, title)

    this.http.post<{message:string, post:Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((responseData) => {
      const post: Post = {id:responseData.post.id, title:title,content:content, imagePath:responseData.post.imagePath}
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
        this.router.navigate(["/"])
    })
   
}
updatePost(id:string, title:string, content:string){
    const post:Post = {id:id, title:title, content:content, imagePath:''};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
.subscribe((response)=>{
  const updatedPosts = [...this.posts];
  const oldPostIndex = updatedPosts.findIndex(p=>p.id===post.id);
  updatedPosts[oldPostIndex]=post;
  this.posts = updatedPosts;
  this.postsUpdated.next([...this.posts])
  this.router.navigate(["/"])
})
}

deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
.subscribe(()=>{
   const updatedPost = this.posts.filter(post =>{
       return post.id !==postId
   })
   this.posts=updatedPost
   this.postsUpdated.next([...this.posts])
})
}

}