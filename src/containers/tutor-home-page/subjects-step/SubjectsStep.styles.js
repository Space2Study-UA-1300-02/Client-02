import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: { md: 'normal', xs: 'center' },
    flexDirection: { md: 'row', xs: 'column' },
    gap: { md: '40px', sm: '0' },
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: { md: '432px', sm: '300px', xs: '300px' },
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    mt: { md: '4px', xs: '20px' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  }
}
