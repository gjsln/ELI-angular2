///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {Component, OnInit} from 'angular2/core';
import {MyService} from '../services/my-service';
import {MyPipe} from '../pipes/my-pipe';
import {GithubUser} from '../services/github-user';
import 'rxjs/add/operator/map';

@Component({
    selector: 'my-list',
    bindings: [MyService],
    pipes: [MyPipe],
    template:`<div class="main-master" id="masterPage">
	<form>
	    <div class="form-group">
	      <div class="input-group">
	        <div class="input-group-addon"><i class="fa fa-search"></i></div>
	        <input type="text" name="search" class="form-control" placeholder="Search Name" [(ngModel)]="queryString">
	      </div>      
	    </div>
	</form>
  
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <td>Frist Name</td>
        <td>Last Name</td>
        <td>Age</td>
        <td>Gender</td>
        <td>Address</td>
        <td>Image</td>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="#studs of users | MyPipe:queryString">
        <td>{{ studs.fname }}</td>
        <td>{{ studs.lName }}</td>
		<td>{{ studs.age }}</td>
        <td>{{ studs.gender }}</td>
        <td>{{ studs.address }}</td>        
        <td><img [src]="studs.studImage" height="50" width="50"/></td>
      </tr>
    </tbody>
  </table>
</div>`,
    styles: [`
        :host {
            font-family: 'Arial';
            display: flex;
            width: 100%;
            height: 100%;
        }
    `]
})
export class MyList implements OnInit {
    users:Array<GithubUser>;
    service:MyService;

    constructor(service:MyService) {
        this.service = service;
    }

    ngOnInit() {
        this.service
            .getUsers()
            .subscribe(
                users => this.users = users
            );
    }
}
