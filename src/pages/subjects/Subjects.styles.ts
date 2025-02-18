export const styles = {
  page: {
    width: 'calc(90% - 32px)',
    justifyContent: 'center',
    margin: 'auto'
  },
  categoryInput: {
    width: '90%',
    maxWidth: { sm: '160px', md: '220px' },
    mr: '30px',
    mb: { xs: '20px', sm: '0' },
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchToolbar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 7,
    padding: '8px 16px',
    boxShadow: '0px 3px 5px rgba(0,0,0,0.1)',
    width: 'calc(90% - 32px)',
    minWidth: '50vw',
    margin: 'auto'
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    m: '0 45px 20px 0'
  },
  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  }
}
