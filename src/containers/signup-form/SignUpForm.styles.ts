export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: { sm: '340px' }
  },
  input: {
    maxWidth: '343px'
  },
  loginButton: {
    width: '100%',
    py: '14px'
  },
  halfWidth: {
    width: 'calc(50% - 10px)'
  },
  nameFieldsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  forgotPass: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'primary.900',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: '2px solid',
      borderRadius: '2px'
    },
    mb: '20px',
    alignSelf: 'end'
  },
  submitButton: {
    minWidth: '148px',
    display: 'block',
    m: '32px auto 0'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  link: {
    textDecoration: 'underline',
    color: '#263238'
  }
}
