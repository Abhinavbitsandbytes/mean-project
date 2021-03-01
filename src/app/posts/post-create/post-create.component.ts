import { Component, OnInit, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = ""
  enteredContent=""
  @Output() postCreated = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
// its a convention to start method name with "on" that are triggered upon events
  onAddPost(){
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    }
    this.postCreated.emit(post)

  }

}
