'use client'
import { Issue } from '@prisma/client'
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
      setIssue(response.data?.issue)
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
      <p>{issue?.title}</p>
      <p>{issue?.description}</p>
      <p>{issue?.status}</p>
      {/* <p>{issue?.createdAt.toDateString()}</p> */}
    </div>
  )
}

export default IssueDetailPage
