import { NextRequest, NextResponse } from 'next/server'
import getUniqueIssue from './getUniqueIssue'
import { issueSchema } from '../../validationSchemas'
import prisma from '../../../../../prisma/client'
import { Issue } from '@prisma/client'

type IssueProps = {
  params: { id: string }
}

export const GET = async (request: NextRequest, { params }: IssueProps) => {
  try {
    const { id } = params
    const issue = await getUniqueIssue(id)
    return NextResponse.json({ issue }, { status: 201 })
  } catch (error: any) {
    if ((error.cause && error.cause === 400) || error.cause === 404) {
      return NextResponse.json(error?.message, { status: error.cause })
    }
    return NextResponse.json(error?.message, { status: 500 })
  }
}

export const PATCH = async (request: NextRequest, { params }: IssueProps) => {
  try {
    const body = await request.json()
    const validBody = issueSchema.safeParse(body)
    if (!validBody.success) {
      return NextResponse.json(validBody.error.format(), {
        status: 400,
      })
    }
    const issue: Issue = await getUniqueIssue(params.id)

    const updatedIssue = await prisma.issue.update({
      where: {
        id: issue.id,
      },
      data: {
        title: body.title,
        description: body.description,
      },
    })
    return NextResponse.json(updatedIssue, { status: 200 })
  } catch (error: any) {
    if ((error.cause && error.cause === 400) || error.cause === 404) {
      return NextResponse.json(error?.message, { status: error.cause })
    }
    return NextResponse.json(error?.message, { status: 500 })
  }
}
