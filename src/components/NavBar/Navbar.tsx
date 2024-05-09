import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { navBarLinks } from './navBarLinks'

const Navbar = () => {
  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {navBarLinks.map((item) => (
          <li key={item.id}>
            <Link
              className="text-zinc-500 transition-colors hover:text-zinc-800"
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
