import { ButtonVariantEnum } from '~/types'

export const styles = {
  container: {
    margin: '0 auto',
    maxWidth: 1176,
    width: '100%',
    padding: 3,
    textAlign: 'center'
  },
  heading: {
    marginBottom: '16px',
    variant: 'h4'
  },
  subtitle: {
    marginBottom: '16px',
    variant: 'Subtitle1'
  },
  linkWrapper: {
    textAlign: 'right',
    marginBottom: '16px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: '8px 16px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    width: 'calc(100% - 32px)',
    minWidth: '50vw'
  },
  searchIcon: {
    color: 'gray',
    marginRight: '8px'
  },
  searchInput: {
    flex: 1
  },
  searchButton: {
    marginLeft: '16px',
    variant: ButtonVariantEnum.Contained
  },
  infoText: {
    marginTop: '16px'
  }
}
