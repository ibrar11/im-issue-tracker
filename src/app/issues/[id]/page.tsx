'use client'
import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  params: { id: string }
}

const IssueDetailPage = ({ params }: Props) => {
  const [issue, setIssue] = useState<Issue>()
  const router = useRouter()
  const prevPath = useSearchParams().get('prevPath')

  const findIssue = async (id: string) => {
    try {
      const response = await axios.get(`/api/issues/${id}`)
      setIssue({
        ...response.data?.issue,
        createdAt: new Date(response.data?.issue?.createdAt),
      })
    } catch (error: any) {
      if (error?.response?.status === 404 || error?.response?.status === 400) {
        router.push(`/not-found?prevPath=${prevPath}`)
      }
      console.log(error)
    }
  }

  useEffect(() => {
    findIssue(params?.id)
  }, [])

  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue?.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue?.description}</p>
      </Card>
    </div>
  )
}

export default IssueDetailPage
