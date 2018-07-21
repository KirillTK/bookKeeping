import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {Bill} from "../models/bill.model";
import {HttpClient} from "@angular/common/http";
import {AngularFirestore} from "angularfire2/firestore";

@Injectable()
export class BillService {
    constructor(private http: HttpClient, private db: AngularFirestore) {
    }

    getBill(): Observable<any> {
        return this.db.collection('bill').valueChanges();
    }

    updateBill(bill: Bill){
        this.db.doc('bill/4sVbfyngILNLSArLcZK4').update(<Bill>bill.getData());
    }

    getCurrency(): Observable<any> {
        return this.http.get('http://data.fixer.io/api/latest?access_key=bb1697827d0f7f2e5083809a5df7568c');
    }
}