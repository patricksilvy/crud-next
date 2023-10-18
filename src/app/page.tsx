'use client'

import ClientsCollection from "@/backend/db/ClientsCollection"
import Button from "@/components/Button"
import Form from "@/components/Form"
import Layaut from "@/components/Layout"
import Table from "@/components/Table"
import Client from "@/core/Client"
import ClientRepo from "@/core/ClientRepo"
import { useEffect, useState } from "react"

export default function Home() {
  const repo: ClientRepo = new ClientsCollection()

  const [client, setClient] = useState<Client>(Client.empty())
  const [clients, setClients] = useState<Client[]>([])
  const [visible, setVisible] = useState<'table' | 'form'>('table')

  useEffect(getAll, [])
  
  function getAll() {
    repo.getAll().then(clients => {
      setClients(clients)
      setVisible('table')
    })
  }

  function clientSelected(client: Client) {
    setClient(client)
    setVisible('form')
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
    setVisible('form')
  }

  return (
    <main className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layaut title="Cadastro Simples">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button className="mb-4" color="green"
                onClick={newClient}>
                Novo Cliente
              </Button>
            </div>
            <Table
              clients={clients}
              clientSelected={clientSelected}
              clientDeleted={clientDeleted}
            ></Table>
          </>
        ) : (
          <Form 
            client={client}
            canceled={() => setVisible('table')} 
            clientModified={saveClient}
          />
        )}
      </Layaut>
    </main>
  )
}