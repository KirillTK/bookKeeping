import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Category} from "../models/category.model";
import {Observable} from "rxjs/Rx";

@Injectable()
export class CategoriesService {

    constructor(private db: AngularFirestore) {
    }

    addCategory(category: Category) {
        this.db.collection('categories').add(<Category>category.getData());
    }

    getCaterodies(): Observable<any[]> {
        return this.db.collection('categories').snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                })
            });
    }

    updateCategory(category: Category) {
        console.log(category);
        this.db.doc('categories/' + category.id).update(<Category>category.getData());
    }

}