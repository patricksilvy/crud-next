'use client'

import Button from "@/components/Button"
import Form from "@/components/Form"
import Layaut from "@/components/Layout"
import Table from "@/components/Table"
import Client from "@/core/Client"
import { useState } from "react"

export default function Home() {
  const [client, setClient] = useState<Client>(Client.empty())
  const [visible, setVisible] = useState<'table' | 'form'>('table')

  const clients = [
    new Client('Ana', 34, '1'),
    new Client('Bia', 45, '2'),
    new Client('Carlos', 50, '3'),
    new Client('Pedro', 20, '4'),
  ]

  function clientSelected(client: Client) {
    setClient(client)
    setVisible('form')
  }

  function clientDeleted(client: Client) {
    console.log(client.name)
  }

  function saveClient(client: Client) {
    console.log(client)
    setVisible('table')
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