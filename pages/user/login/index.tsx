import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginForm } from '../../../models/forms/login.form'
import { useRouter } from 'next/dist/client/router'
import { UserContext } from '../../../context/user.context'
import { getUser } from '../../../services/user.service'
import { LanguageContext } from '../../../context/language.context'
import { login } from '../../../services/auth.service'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
  const router = useRouter()
  const { _, setUser } = useContext<any>(UserContext)
  const [loading, setLoading] = useState(false)
  const { t } = useContext<any>(LanguageContext)
  const onSubmit = async (data: LoginForm) => {
    if (Object.keys(errors).length) {
      return
    }
    setLoading(true)
    const res = await login(data.email, data.password)
    if (res?.token) {
      localStorage.setItem('auth-token', res.token)
      const user = await getUser()
      setUser(user)
      setInvalidCredentials(false)
      router.push('/')
    } else {
      setInvalidCredentials(true)
    }
    setLoading(false)
  }
  return (
    <div className="bg-blue-primary-light">
      <div className="container mx-auto flex items-center justify-center py-20">
        <div className="p-10 bg-white shadow-lg rounded-md">
          <div className="flex items-center gap-4 justify-center mb-4">
            <h2 className="text-3xl font-semibold text-gray-700">
              {t.loginForm.title}
            </h2>

          </div>
          <h3 className="text-gray-600 text-center">{t.loginForm.subtitle}</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 pt-8 mb-4"
          >
            {invalidCredentials && (
              <span className="text-red-600 text-center">
                {t.loginForm.loginError}
              </span>
            )}
            <span>
              <label className="block text-gray-500" htmlFor="email_field">
                {t.loginForm.email}
              </label>
              <input
                className="block border border-gray-200 rounded-md p-2 w-full"
                type="text"
                id="email_field"
                placeholder="johndoe@gmail.com"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {t.loginForm.emailRequired}
                </span>
              )}
            </span>
            <span>
              <span className="flex justify-between">
                <label className="block text-gray-500" htmlFor="password_field">
                  {t.loginForm.password}
                </label>
                <Link href="recover-password">
                  <a className="text-blue-800">{t.loginForm.forgotPassword}</a>
                </Link>
              </span>
              <input
                className="block border border-gray-200 rounded-md p-2 w-full"
                type="password"
                id="password_field"
                placeholder="*********"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {t.loginForm.passwordRequired}
                </span>
              )}
            </span>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">{t.loginForm.rememberMe}</label>
            </div>

            <button
              disabled={loading}
              className={`${loading ? 'bg-gray-400' : 'bg-blue-primary'
                } text-white rounded-md py-2`}
            >
              {t.loginForm.login}
            </button>
          </form>

          <div className="text-center">
            <p className="mb-2 text-gray-600">{t.loginForm.newHere}</p>
            <Link href="/user/registration">
              <a className="text-blue-800 text-lg">{t.loginForm.register}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
