import { PageLayout } from '../../layout/Page/Page'

import './styles.scss'

export const GiveConsent = () => {
  return (
    <PageLayout>
      <section className='give-consent'>
        <form action='' className='give-consent__form'>
          <fieldset className='give-consent__form-user-data'>
            <input type='text' id='name' placeholder='Name' />
            <input type='text' id='email' placeholder='Email address' />
          </fieldset>

          <p>I agree to:</p>

          <fieldset className='give-consent__form-consents'>
            <div>
              <input type='checkbox' id='consent1' />
              <label htmlFor='consent1'>Receive newsletter</label>
            </div>

            <div>
              <input type='checkbox' id='consent2' />
              <label htmlFor='consent2'>Be shown targeted ads</label>
            </div>

            <div>
              <input type='checkbox' id='consent3' />
              <label htmlFor='consent3'>Contribute to anonymous visit statistics</label>
            </div>
          </fieldset>

          <button className='give-consent__form-submit'>Give consent</button>
        </form>
      </section>
    </PageLayout>
  )
}
