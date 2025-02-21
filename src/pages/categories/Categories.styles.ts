import { commonShadow } from '~/styles/app-theme/custom-shadows'
import { ButtonVariantEnum } from '~/types'

export const styles = {
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'basic.white',
    borderRadius: '70px',
    padding: '29px 45px 29px 45px',
    boxShadow: commonShadow,
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
    marginTop: '30px',
    marginBottom: '30px',
    display: 'flex',
    alighItems: 'center',
    justifyContent: 'center'
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
  },

  navigation: {
    textAlign: 'right'
  }
}
