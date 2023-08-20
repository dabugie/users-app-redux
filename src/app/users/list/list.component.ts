import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  error: any;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {

    // this.userService.getUsers().subscribe((users: any) => {
    //   this.users = users;
    // });

    this.store.select('users').subscribe(({ users, loading, error }) => {
      this.users = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch(loadUsers());
  }
}
