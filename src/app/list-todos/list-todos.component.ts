import { Component, OnInit } from '@angular/core';
import { TodoDataService } from './../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[]
  message: string
  // = [
  //   new Todo(1,'Learn to dance',false, new Date()),
  //   new Todo(2,'Become an expert at angulare',false, new Date()),
  //   new Todo(3,'Become an expert at SpringBoot',false, new Date()),
  //   // { id: 1, description: 'Learn to dance' },
  //   // { id: 2, description: 'Become an expert at angular' },
  //   // { id: 3, description: 'Become an expert at SpringBoot' }
  // ]
  // todo = {
  //   id: 1,
  //   description: 'Learn to dance'
  // }

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    console.log(`delte todo ${id}`)
    this.todoService.deleteTodo('in28minurtes', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} successful`;
        this.refreshTodos();
      }
    )
  }
  updateTodo(id) {
    console.log (`Update ${id}`)
    this.router.navigate(['todos',id])
  }
  addTodo(){
    this.router.navigate(['todos',-1])
  }
}
