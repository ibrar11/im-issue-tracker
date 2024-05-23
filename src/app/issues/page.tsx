'use client'
import React, { useEffect, useState } from 'react'
import { Table } from '@radix-ui/themes'
import axios from 'axios'
import { IssueStatusBadge, Spinner } from '@/app/components'
import { Issue } from '@prisma/client'
import AddIssueButton from './AddIssueButton'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>()
  const pathname = usePathname()

  const getIssues = async () => {
    try {
      const response = await axios.get('/api/issues')
      response?.data.map((issue: any) => {
        issue.createdAt = new Date(issue.createdAt)
        issue.updatedAt = new Date(issue.updatedAt)
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
      <AddIssueButton />
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
                <Link
                  href={{
                    pathname: `/issues/${issue.id}`,
                    query: { prevPath: pathname },
                  }}
                >
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage
