import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loadUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = new Subscription();

  user: User | null = null;
  loading: boolean = false;
  error: any;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user').subscribe(({ user, loading, error }) => {
      this.user = user;
      this.loading = loading;
      this.error = error;
    });

    this.router.params.subscribe(({ id }) => {
      this.store.dispatch(loadUser({ id }));
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
