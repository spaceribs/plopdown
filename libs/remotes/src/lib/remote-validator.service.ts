import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {
  catchError,
  switchMap,
  map,
  debounceTime,
  first,
} from 'rxjs/operators';

@Injectable()
export class RemoteValidatorService implements AsyncValidator {
  private readonly validate$: BehaviorSubject<any> = new BehaviorSubject(null);
  private readonly validator$: Observable<ValidationErrors | null>;

  constructor(private http: HttpClient) {
    this.validator$ = this.validate$.pipe(
      debounceTime(200),
      switchMap((url) => this.canConnect(url))
    );
  }

  public validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    this.validate$.next(control.value);
    return this.validator$.pipe(first());
  };

  private canConnect(url: string) {
    return this.http.get<unknown>(url).pipe(
      map((res) => {
        if (typeof res !== 'object' || res == null) {
          return {
            invalidFeed: {
              isValid: false,
              message: 'Endpoint did not return an object',
              data: res,
            },
          };
        }

        if ('version' in res) {
          return null;
        }

        return {
          invalidFeed: {
            isValid: false,
            message: 'Endpoint is not the root URL of a plopdown database.',
            data: res,
          },
        };
      }),
      catchError((err: HttpErrorResponse) =>
        of({
          invalidFeed: {
            isValid: false,
            message: err.message,
            data: err,
          },
        })
      )
    );
  }
}
