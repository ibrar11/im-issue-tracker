'use client'
import { Button, Container } from '@radix-ui/themes'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const prevPath = useSearchParams().get('prevPath')

  return (
    <div>
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-y-5">
          <h2 className="kumbh-font text-7xl font-bold leading-normal text-yellow-600 md:text-8xl">
            404
          </h2>
          <p className="text-grey-300 max-w-[550px] text-center text-base font-normal md:text-xl">
            The page you are looking for might have been removed had its name
            changed or it is temporarily unavailable.
          </p>
          <Button>
            <Link href={prevPath ? prevPath : '/'}>Go back</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
