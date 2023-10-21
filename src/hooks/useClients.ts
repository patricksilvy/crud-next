import ClientsCollection from "@/backend/db/ClientsCollection"
import Client from "@/core/Client"
import ClientRepo from "@/core/ClientRepo"
import { useEffect, useState } from "react"
import useTableAndForm from "./useTableAndForm"

export default function useClients() {
    const repo: ClientRepo = new ClientsCollection()

    const {
        tableVisible,
        formVisible,
        displayTable,
        displayForm
    } = useTableAndForm()

    const [client, setClient] = useState<Client>(Client.empty())
    const [clients, setClients] = useState<Client[]>([])

    useEffect(getAll, [])

    function getAll() {
        repo.getAll().then(clients => {
            setClients(clients)
            displayTable()
        })
    }

    function clientSelected(client: Client) {
        setClient(client)
        displayForm()
    }

    async function clientDeleted(client: Client) {
        await repo.delete(client)
        getAll()
    }

    async function saveClient(client: Client) {
        await repo.save(client)
        getAll()
    }

    function newClient() {
        setClient(Client.empty())
        displayForm()
    }

    return {
        client,
        clients,
        newClient,
        saveClient,
        clientDeleted,
        clientSelected,
        getAll,
        tableVisible,
        displayTable
    }
}