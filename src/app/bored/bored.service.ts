import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface suggestedTask {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoredService {

  constructor(private httpService: HttpClient) { }

  generateTask() {
    return this.httpService.get<suggestedTask>('https://www.boredapi.com/api/activity');
  }

}
