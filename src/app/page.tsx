'use client'

import Button from "@/components/Button"
import Form from "@/components/Form"
import Layaut from "@/components/Layout"
import Table from "@/components/Table"
import useClients from "@/hooks/useClients"

export default function Home() {
  const {
    saveClient,
    clientDeleted,
    clientSelected,
    newClient,
    client,
    clients,
    tableVisible,
    displayTable
  } = useClients()

  return (
    <main className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layaut title="Cadastro Simples">
        {tableVisible ? (
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
            canceled={displayTable}
            clientModified={saveClient}
          />
        )}
      </Layaut>
    </main>
  )
}