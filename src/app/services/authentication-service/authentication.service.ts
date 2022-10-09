import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, from, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PASSWORD_RESET_IDENTIFIER, TOKEN_KEY, USER_KEY } from '../../helpers/constants';
import { Preferences } from '@capacitor/preferences';
import { IAuthUser } from '../../interfaces/i-auth-user';
import { IResponse } from '../../interfaces/i-response';

export interface IUser {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  refreshAuthSubject$ = new BehaviorSubject(null);
  authUserRequest$ = this.http.get<{ data: IAuthUser }>('oauth/user').pipe(
    map(({data}) => data),
    switchMap(user => forkJoin([of(user), Preferences.set({key: USER_KEY, value: JSON.stringify(user)})])
    ),
    map(([user]) => user),
  );


  auth$ = new BehaviorSubject<any>(null);

  isDepotUser$ = this.auth$.pipe(
    map(user => user.stationSpecificRoles.filter(({depotId}) => !!depotId).length > 0)
  );

  isTransporterUser$ = this.auth$.pipe(
    map(user => user?.stationSpecificRoles.filter(({transporterId}) => !!transporterId).length > 0)
  );

  isDealerUser$ = this.auth$.pipe(
    tap(res => console.log({res})),
    map(user => user?.stationSpecificRoles.filter(({dealerId}) => !!dealerId).length > 0)
  );

  constructor(
    private http: HttpClient, private router: Router,
    @Inject('passportClient') private passportClient: { grantType: string; clientId: number; clientSecret: string }
  ) {
    forkJoin([this.loadStoredUser(), this.loadStoredToken()]).pipe(
      switchMap(([user]) => user ? this.authUserRequest$ : of(null)),
      take(1)
    ).subscribe();
  }

  requestPasswordReset = (formValue: any) =>
    this.http.post('oauth/forgot-password', formValue);

  confirmPasswordResetOtp = (formValue: any) =>
    from(Preferences.get({key: PASSWORD_RESET_IDENTIFIER})).pipe(
      map(({value: identifier}) => JSON.parse(identifier).identifier),
      switchMap((identifier) =>
        this.http.post<IResponse<any>>('oauth/reset-password', {...formValue, identifier})),
      switchMap((res) => from(Preferences.set({
        key: TOKEN_KEY, value: JSON.stringify(
          res.data
        )
      })).pipe(map(() => res))),
      switchMap((res) => from(this.loadStoredToken()).pipe(map(() => res))),
      switchMap((res) => this.authUserRequest$.pipe(map(() => res))),
      switchMap((res) => from(this.loadStoredUser()).pipe(map(() => res))),
    );

  passwordChange = (formValue: any) =>
    this.http.post('oauth/password-change', formValue);

  loadStoredToken() {
    return from(Preferences.get({key: TOKEN_KEY})).pipe(
      map(({value: token}) => JSON.parse(token)?.access_token),
      tap((token) => {
        if (token) {
          this.token = token;
          this.isAuthenticated.next(true);
        } else {
          this.isAuthenticated.next(false);
        }
      }),
    );
  }

  loadStoredUser() {
    return from(Preferences.get({key: USER_KEY})).pipe(
      map(({value: user}) => JSON.parse(user)),
      tap((user) => {
        if (user) {
          this.auth$.next(user);
        }
      }),
    );
  }

  login = ({email: username, ...credentials}: { email; password }): Observable<any> =>
    this.http.post<any>('oauth/token', {
      username,
      ...credentials,
      ['grant_type']: this.passportClient.grantType,
      ['client_id']: this.passportClient.clientId,
      ['client_secret']: this.passportClient.clientSecret,
      scope: ''
    }).pipe(
      switchMap(token => from(Preferences.set({key: TOKEN_KEY, value: JSON.stringify(token)}))),
      switchMap(() => this.loadStoredToken()),
      switchMap(() => this.authUserRequest$),
      switchMap(() => this.loadStoredUser()),
      tap(_ => {
        this.isAuthenticated.next(true);
        this.refreshAuthSubject$.next(null);
      }),
      catchError(error => throwError(error))
    );

  logout(): Observable<any> {
    this.isAuthenticated.next(false);
    return this.http.get('oauth/revoke').pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return of(null);
        }
        return throwError(() => err);
      }),
      switchMap(() => this.localLogout()),
      tap(() => this.token = '')
    );
  }

  localLogout() {
    return from(
      Promise.all([
        Preferences.remove({key: TOKEN_KEY}),
        Preferences.remove({key: USER_KEY}),
      ])
    ).pipe(map(() => true));
  }
}
