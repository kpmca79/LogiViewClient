import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'app/services/form.service';
export class CommentNode {
  text:string ='';
  
  anwsers:CommentNode[] = [];
  isOpen:false;
  createdDate:Date;
  createdBy:string;
  isEdit:boolean = false;
  viewReply:boolean = false;
  constructor(text:string){
    this.text = text;
  }

  public addAnwser(newComment:CommentNode){
    if(newComment.text){
      this.anwsers.push(newComment);
    }
  }

  public removeComment(newComment:CommentNode){
    let index = this.anwsers.indexOf(newComment);
    if(~index){
      this.anwsers.slice(index,1);
    }
  }
}
@Component({
  selector: 'comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {


  @Input() comments:CommentNode[] = [];
  @Input() showDefaultComment:boolean=false;
  @Input() currentResp:any;
  text:string;
  
  textDefalt:string;
  editText:string='';

  constructor(private srv: FormService){}

  ngOnInit(){
   if(this.comments)
        this.comments.forEach(cmt=>{cmt.viewReply=false;});
  }
  ngAfterViewInit(){
    if(this.comments)
        this.comments.forEach(cmt=>{cmt.viewReply=false;});
  }

  viewReply(comment:CommentNode){
    comment.viewReply=true;
  }
  hideReply(comment:CommentNode){
    comment.viewReply=false;
  }
  deleteComment(comment:CommentNode){
    const index: number = this.comments.indexOf(comment);
    if (index !== -1) {
        this.comments.splice(index, 1);
        this.updateResponse();
    }        
  }
  editComment(comment:CommentNode){
    comment.isEdit=true;
    comment.createdDate=new Date();
    comment.createdBy="Keyur Patel";
    this.editText=comment.text;
    this.updateResponse();
  }
  updateResponse(){
    this.currentResp.comments=this.comments;
    this.srv.updateResponse(this.currentResp.id,this.currentResp).subscribe(data=>{console.log("Comment updated successfully",data)},error=>{console.log("Comment update fail error=",error)});
  }
  addComment(comment:CommentNode){
    let commentnode=new CommentNode(this.text);
    commentnode.createdDate=new Date();
    comment.createdBy="Keyur Patel";
    commentnode.viewReply=false;
    comment.anwsers.push(commentnode);      
    this.comments.forEach(comnt=>{comnt.viewReply=false});
    comment.viewReply=true;
    comment.isOpen = false;
    this.text="";    

    this.updateResponse();
    console.log(this.comments);
  }
  addNewComment(){
    let comment=new CommentNode(this.textDefalt);
    comment.createdDate=new Date();
    comment.createdBy="Keyur Patel";
    //comment.createdDate.setHours(comment.createdDate.getHours()-2);
    comment.viewReply=false;
    this.comments.push(comment);
    comment.isOpen = false;
    this.textDefalt="";    
    this.comments.forEach(comnt=>{comnt.viewReply=false});
    console.log(this.comments);
    this.updateResponse();
  }
  updateComment(comment:CommentNode){
    comment.text=this.editText;
    comment.isEdit=false;
    comment.createdDate=new Date();
    this.updateResponse();
  }
  cancelUpdateComment(comment:CommentNode){
    
    comment.isEdit=false;
  }
  cancelNewComment(comment:CommentNode){
    this.textDefalt="";
    console.log(this.comments);
  }

  cancelComment(comment:CommentNode){
    
    comment.isOpen = false;
    this.text="";
    
    console.log(this.comments);
  }

  openCommentText(comment){
    console.log(comment)
    comment.isOpen = !comment.isOpen;
  }

  remove(comment:CommentNode){    
    let index = this.comments.indexOf(comment);
    this.comments = this.comments.splice(index,1);        
  }

}
