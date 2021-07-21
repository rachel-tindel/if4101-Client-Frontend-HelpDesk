import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';
import { ClientService } from '../../services/client.service';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues:Issue[]=[];

  constructor(  private issueService:IssueService,
                private clientService:ClientService,
                private commentService:CommentService,
                private router:Router  ) { }


  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(){
    this.issueService.getIssuesByClientId(this.clientService.client.id)
    .subscribe( issues => {
        this.issues=issues;
    })
  }
  

  issueDetail(issueId:number){
        this.router.navigateByUrl('issues-details/'+issueId);
  }

}
