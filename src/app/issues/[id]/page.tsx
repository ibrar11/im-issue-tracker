'use client'
import { Issue } from '@prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue?.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
