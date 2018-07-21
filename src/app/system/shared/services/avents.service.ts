import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";
import {WFMEvent} from "../models/event.model";
import {Category} from "../models/category.model";

@Injectable()
export class EventsService {

    constructor(public db: AngularFirestore) {
    }

    addEvent(event: WFMEvent) {
        this.db.collection('events').add(<WFMEvent>event.getData());
    }

    getEvents(): Observable<any[]> {
        return this.db.collection('events').valueChanges();
    }

    getEventsForPlanning(category: Category): Observable<any> {
        return this.db.collection('events', ref => ref.where('category','==',category.id)).valueChanges();
    }
}