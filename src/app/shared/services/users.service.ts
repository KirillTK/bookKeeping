import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

@Injectable()
export class UsersService {

    itemsCollection: AngularFirestoreCollection<User>;
    items: Observable<User[]>;

    constructor(private db: AngularFirestore) {
        this.itemsCollection = this.db.collection('users');
    }

    getUserByEmail(email: string): Observable<any> {
        return this.db.collection('users', ref => ref.where('email', '==', email)).snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                })
            })
            .map((user) => user[0] ? user[0] : undefined);

    }

    createNewUser(user: User): void {
        this.itemsCollection.add(<User>user.getData());
    }

}
