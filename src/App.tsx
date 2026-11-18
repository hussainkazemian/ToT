import { FormEvent, useState } from 'react'

type FormErrors = {
  email?: string
  password?: string
}

function SparkleMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-sparkle brand-sparkle-large">✦</span>
      <span className="brand-sparkle brand-sparkle-small">✦</span>
    </span>
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    if (!email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      nextErrors.password = 'Password is required'
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(nextErrors)
  }

  function clearFieldError(field: keyof FormErrors) {
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient-shape ambient-shape-top" />
      <div className="ambient-shape ambient-shape-bottom" />

      <section className="login-card" aria-labelledby="welcome-heading">
        <div className="brand">
          <SparkleMark />
          <span>promptly</span>
        </div>

        <div className="intro">
          <p className="eyebrow">AI prompt engineering assistant test</p>
          <h1 id="welcome-heading">Welcome</h1>
          <p className="intro-copy">
            This is an AI prompt engineering assistant test environment to test Few-shot prompting.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                clearFieldError('email')
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={`email-helper${errors.email ? ' email-error' : ''}`}
            />
            <p className="field-helper" id="email-helper">
              Enter a valid email address
            </p>
            {errors.email && (
              <p className="field-error" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                clearFieldError('password')
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={`password-helper${errors.password ? ' password-error' : ''}`}
            />
            <p className="field-helper" id="password-helper">
              Minimum 8 characters
            </p>
            {errors.password && (
              <p className="field-error" id="password-error" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit">Sign In</button>
        </form>
      </section>

      <footer className="page-footer">
        <span>© 2024 Promptly</span>
        <span className="footer-divider" aria-hidden="true">·</span>
        <span>Secure access to your prompt workspace</span>
      </footer>
    </main>
  )
}

export default App
