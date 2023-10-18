import Client from "@/core/Client";
import ClientRepo from "@/core/ClientRepo";
import firebase from "firebase/compat/app";

export default class ClientsCollection implements ClientRepo {
    #conversor = {
        toFirestore(client: Client) {
            return {
                name: client.name,
                age: client.age,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Client {
            const datas = snapshot.data(options)
            return new Client(datas.name, datas.age, snapshot.id)
        }
    }

    async save(client: Client): Promise<Client> {
        if(client?.id) {
            await this.collection().doc(client.id).set(client)
            return client
        } else {
            const docRef = await this.collection().add(client)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async delete(client: Client): Promise<void> {
        return this.collection().doc(client.id).delete()
    }

    async getAll(): Promise<Client[]> {
        const query = await this.collection().get()
        const clients = query.docs.map(doc => doc.data()) ?? []
        return clients
    }

    private collection() {
        return firebase.firestore().collection('clients')
            .withConverter(this.#conversor)
    } 
}