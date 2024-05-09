'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { AiFillBug } from 'react-icons/ai'
import { navBarLinks } from './navBarLinks'

const Navbar = () => {
  const currentPath = usePathname()
  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {navBarLinks.map((item) => (
          <li key={item.id}>
            <Link
              className={classnames({
                'text-zinc-900': item.href === currentPath,
                'text-zinc-500': item.href !== currentPath,
                'transition-colors hover:text-zinc-800': true,
              })}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
