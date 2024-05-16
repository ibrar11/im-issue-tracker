import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'
import { createIssueSchema } from '../../validationSchemas'

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const validateIssueSchema = createIssueSchema.safeParse(body)
  if (!validateIssueSchema.success) {
    return NextResponse.json(validateIssueSchema.error.format(), {
      status: 400,
    })
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })
  return NextResponse.json(newIssue, { status: 201 })
}

export const GET = async () => {
  try {
    const issues = await prisma.issue.findMany()
    if (!issues.length) {
      return NextResponse.json('No record to show', { status: 404 })
    }
    return NextResponse.json(issues, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
