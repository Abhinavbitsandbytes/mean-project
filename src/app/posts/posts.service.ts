
import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http'
import {Subject} from 'rxjs'
import { map } from 'rxjs/operators';
@Injectable({providedIn:'root'})
export class PostsService {
  private  posts:Post[] = [];

  private postsUpdated = new Subject<Post[]>()

constructor(private http:HttpClient){}
getPosts() {
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    //rxjs map
    .pipe(map((postData)=>{
        //normal map
return postData.posts.map((post:any)=>{
    return {
        title:post.title,
        content:post.content,
        id:post._id
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

addPost(title:string, content: string){
    const post: Post = {title:title, content:content,id:''}
    this.http.post<{message:string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
        console.log(responseData.message)
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
    })
   
}

}