'use client'
import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Heading, Flex, Card, Text, Box, Button, Grid } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

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
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex className="space-x-3" my="2">
          <IssueStatusBadge status={issue?.status} />
          <Text>{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue?.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
