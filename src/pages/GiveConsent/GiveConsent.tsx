import { PageLayout } from '../../layout/Page/Page'

import './styles.scss'

export const GiveConsent = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const parsedData = Object.fromEntries(formData.entries())
  }

  return (
    <PageLayout>
      <section className='give-consent'>
        <form className='give-consent__form' onSubmit={handleSubmit}>
          <fieldset className='give-consent__form-user-data'>
            <input type='text' id='name' name='name' placeholder='Name' />
            <input type='email' id='email' name='email' placeholder='Email address' />
          </fieldset>

          <p>I agree to:</p>

          <fieldset className='give-consent__form-consents'>
            <div>
              <input type='checkbox' id='consent1' name='consent1' value='Receive newsletter' />
              <label htmlFor='consent1'>Receive newsletter</label>
            </div>

            <div>
              <input type='checkbox' id='consent2' name='consent2' value='Be shown targeted ads' />
              <label htmlFor='consent2'>Be shown targeted ads</label>
            </div>

            <div>
              <input type='checkbox' id='consent3' name='consent3' value='Contribute to anonymous visit statistics' />
              <label htmlFor='consent3'>Contribute to anonymous visit statistics</label>
            </div>
          </fieldset>

          <button type='submit' className='give-consent__form-submit'>
            Give consent
          </button>
        </form>
      </section>
    </PageLayout>
  )
}
