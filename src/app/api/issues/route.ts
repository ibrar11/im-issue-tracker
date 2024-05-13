import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'
import { z } from 'zod'

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
})

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const validateIssueSchema = createIssueSchema.safeParse(body)
  if (!validateIssueSchema.success) {
    return NextResponse.json(validateIssueSchema.error.errors, { status: 400 })
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })
  return NextResponse.json(newIssue, { status: 201 })
}
