import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type Gender = 'male' | 'female';

export interface Policy {
  number: number;
  holder: {
    name: string;
    age: number;
    gender: Gender;
  };
}

@Injectable()
export class PolicyService {
  private readonly url = 'http://localhost:3000/policies';
  private readonly http = inject(HttpClient);

  getAll = this.http.get<Policy[]>(this.url);

  get(number: number) {
    return this.http.get<Policy>(this.url + '/' + number);
  }

  add(policy: Policy) {
    return this.http.post<Policy>(this.url, policy);
  }

  update(number: number, policy: Policy) {
    return this.http.put<unknown>(this.url + '/' + number, policy);
  }

  delete(number: number) {
    return this.http.delete<unknown>(this.url + '/' + number);
  }
}
