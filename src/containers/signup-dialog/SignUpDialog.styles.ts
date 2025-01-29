import { SxProps, Theme } from '@mui/material'
import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    justifyContent: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    alignItems: 'center',
    gap: { lg: '122px', md: '40px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 24px)' }
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: { lg: '96px', md: '30px' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '64px' },
    pl: { xs: '8px', sm: '96px', md: '16px' }
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: '20px',
    lineHeight: 1
  },
  form: {
    overflow: 'auto',
    maxWidth: { xs: '315px', md: '343px' },
    pt: '16px',
    pr: { xs: '8px', sm: '96px', md: '80px', lg: '96px' },
    pb: { xs: '24px', sm: '64px' },
    ...scrollbar
  }
}
