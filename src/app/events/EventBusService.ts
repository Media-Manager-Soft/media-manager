import {Injectable} from "@angular/core";
import {Subject, Subscription, filter, map} from "rxjs";
import {EventData} from "./EventData";

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject();

  emit(event: EventData) {
    this.subject$.next(event)
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: any) => e.name === eventName),
        map((e: any) => e['data'])
      ).subscribe(action);
  }
}
