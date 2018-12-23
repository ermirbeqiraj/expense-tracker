import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class MsgService {
  private menuClickSource = new Subject<void>();
  menuStream$ = this.menuClickSource.asObservable();
  menuClickAction() {
    this.menuClickSource.next();
  }
}
