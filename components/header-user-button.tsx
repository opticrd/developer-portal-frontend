import React, { useState } from 'react'
import { User } from '../models/user.model'
import Image from 'next/image'
import Dropdown from './dropdown'
import Link from 'next/link'

export default function HeaderUserButton({ user }: { user: User }) {
  const [imageUrl, setImageUrl] = useState<string>(user._links.avatar)
  const [isOpen, setIsOpen] = useState(false)
  const defaultImageSrc = '/images/no-avatar.png'

  const onImageError = (e: any) => {
    e.preventDefault()
    if (imageUrl !== defaultImageSrc) {
      setImageUrl(defaultImageSrc)
    }
  }

  const options = [
    { path: '/account/', text: 'Mi cuenta' },
    {
      path: '/account/password',
      text: 'Contraseña',
    },
    {
      path: '/account/apis',
      text: 'APIs',
    },
  ]

  const signOut = () => {
    window.localStorage.removeItem('auth-token')
    setIsOpen(false)
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 ml-6 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col">
          <span className="text-white capitalize">{user.display_name}</span>
        </div>
        <Image
          className="rounded-full"
          src={imageUrl}
          alt={`${user.display_name} profile`}
          height={40}
          width={40}
          onError={onImageError}
        />
      </div>

      {isOpen && (
        <Dropdown onClose={() => setIsOpen(false)} padding={false}>
          <div className="w-60">
            <div className="flex gap-4 p-2">
              <Image
                className="rounded-full"
                src={imageUrl}
                alt={`${user.display_name} profile`}
                height={40}
                width={40}
                onError={onImageError}
              />
              <div>
                <h3 className="capitalize text-sm">{user.display_name}</h3>
                <span className="text-xs text-gray-600">{user.email}</span>
              </div>
            </div>

            <ul>
              {options.map((o) => (
                <li key={o.path}>
                  <Link href={o.path}>
                    <a
                      className="hover:bg-blue-400 w-full block py-1 px-6"
                      onClick={() => setIsOpen(false)}
                    >
                      {o.text}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={signOut}
              className="w-full border-t text-yellow-600 py-2 mt-3"
            >
              Cerrar sesion
            </button>
          </div>
        </Dropdown>
      )}
    </div>
  )
}