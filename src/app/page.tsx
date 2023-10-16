'use client'

import Button from "@/components/Button"
import Layaut from "@/components/Layout"
import Table from "@/components/Table"
import Client from "@/core/Client"

export default function Home() {
  const clients = [
    new Client('Ana', 34, '1'),
    new Client('Bia', 45, '2'),
    new Client('Carlos', 50, '3'),
    new Client('Pedro', 20, '4'),
  ]

  function clientSelected(client: Client) {
    console.log(client.name)
  } 

  function clientDeleted(client: Client) {
    console.log(client.name)
  } 

  return (
    <main className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layaut title="Cadastro Simples">
        <div className="flex justify-end">
          <Button className="mb-4" color="green">Novo Cliente</Button>
        </div>
        <Table
          clients={clients}
          clientSelected={clientSelected}
          clientDeleted={clientDeleted}
        ></Table>
      </Layaut>
    </main>
  )
}