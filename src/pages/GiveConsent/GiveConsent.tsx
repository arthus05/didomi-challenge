import { useState } from 'react'
import { PageLayout } from '../../layout/Page/Page'

import './styles.scss'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, TextField } from '@mui/material'
import { useLocation } from 'wouter'

export const GiveConsent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedConsents, setSelectedConsents] = useState<Record<string, boolean>>({})

  const [, navigate] = useLocation()

  const handleConsentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    setSelectedConsents(prev => ({ ...prev, [value]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await fetch('/consents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          consents: Object.keys(selectedConsents).filter(key => selectedConsents[key]),
        }),
      })

      setName('')
      setEmail('')
      setSelectedConsents({})
      alert('Consent submitted successfully!')

      navigate('/consents')
    } catch (err) {
      console.error('Failed to submit new consent:', err)
    }
  }

  return (
    <PageLayout>
      <section className='give-consent'>
        <form className='give-consent__form' onSubmit={handleSubmit}>
          <Box
            component='section'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <TextField type='text' id='name' name='name' placeholder='Name' onChange={e => setName(e.target.value)} />
            <TextField
              type='email'
              id='email'
              name='email'
              placeholder='Email address'
              onChange={e => setEmail(e.target.value)}
            />
          </Box>

          <p>I agree to:</p>

          <Paper variant='outlined' sx={{ padding: '1rem' }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox value='Receive newsletter' onChange={handleConsentSelect} />}
                label='Receive newsletter'
              />
              <FormControlLabel
                control={<Checkbox value='Be shown targeted ads' onChange={handleConsentSelect} />}
                label='Be shown targeted ads'
              />
              <FormControlLabel
                control={<Checkbox value='Contribute to anonymous visit statistics' onChange={handleConsentSelect} />}
                label='Contribute to anonymous visit statistics'
              />
            </FormGroup>
          </Paper>

          <Button
            type='submit'
            variant='contained'
            disabled={Object.values(selectedConsents).filter(Boolean).length === 0}
          >
            Give consent
          </Button>
        </form>
      </section>
    </PageLayout>
  )
}
