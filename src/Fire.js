/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCKSbaUliODMxMLz_wBuF9dXOYBDb1d9xc",
    authDomain: "todoapp-362d3.firebaseapp.com",
    projectId: "todoapp-362d3",
    storageBucket: "todoapp-362d3.appspot.com",
    messagingSenderId: "584235051695",
    appId: "1:584235051695:web:8b9fc8f87f16aac16fc25a",
};

class Fire {
    constructor(callback) {
        this.init(callback);
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            }
            else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy('name');

        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach( doc => {
                lists.push({id: doc.id, ...doc.data()});
            });
            callback(lists);
        });
    }

    addList(list) {
        let ref = this.ref;
        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase.firestore().collection('users').doc(this.userId).collection('lists');
    }

    detach() {
        this.unsubscribe();
    }
}

// eslint-disable-next-line eol-last
export default Fire;