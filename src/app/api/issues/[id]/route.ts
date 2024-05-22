import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/client'

type IssueProps = {
  params: { id: string }
}

export const GET = async (request: NextRequest, { params }: IssueProps) => {
  try {
    const { id } = params
    const checkId = Number.isNaN(Number(id))
    if (checkId) {
      return NextResponse.json({ message: 'Id is not valid' }, { status: 400 })
    }
    const issueId = parseInt(id)
    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
    })
    if (!issue) {
      return NextResponse.json({ message: 'issue not found' }, { status: 404 })
    }
    return NextResponse.json({ issue }, { status: 201 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
