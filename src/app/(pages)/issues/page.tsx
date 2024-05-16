'use client'
import React, { useEffect, useState } from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios'
import { Spinner } from '@/app/components'

type issue = {
  id: number
  title: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<issue[]>()

  const getIssues = async () => {
    try {
      const response = await axios.get('/api/issues')
      response?.data.map((issue: any) => {
        issue.createdAt = new Date(issue.createdAt).toDateString()
        issue.updatedAt = new Date(issue.updatedAt).toDateString()
      })
      setIssues(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getIssues()
  }, [])

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      {issues ? (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues?.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  {issue.title}
                  <div className="block md:hidden">{issue.status}</div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.status}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <div className="flex items-center justify-center gap-x-2">
          <Spinner styles="!text-blue-600 !size-6">
            <p className="text-2xl font-normal text-blue-600">Loading...</p>
          </Spinner>
        </div>
      )}
    </div>
  )
}

export default IssuesPage
