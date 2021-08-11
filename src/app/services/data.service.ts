import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly API_URL = environment.github_url;

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllIssues(): void {
    this.http.get<Issue[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ': ' + error.message);
      }
    );
  }

  addIssue(issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue(id: number): void {
    console.log(id);
  }
}
