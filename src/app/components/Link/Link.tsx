import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

type URL = {
  pathname: string
  query?: {
    [key: string]: string
  }
}

type LinkProps = {
  href: string | URL
  children: string | React.ReactNode
}

const Link = (props: LinkProps) => {
  const { href, children } = props

  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
