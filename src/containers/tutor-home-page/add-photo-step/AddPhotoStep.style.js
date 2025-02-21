import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: { md: '40px', sm: '20px' },
    alignItems: { md: 'normal', xs: 'center' },
    flexDirection: { md: 'row', xs: 'column' },
    height: { sm: '485px' },
    ...fadeAnimation
  },
  img: {
    width: '100%',
    maxHeight: '440px',
    borderRadius: '20px',
    objectFit: 'cover'
  },
  imgContainer: {
    order: { md: 1, xs: 2 },
    display: 'flex',
    alignItems: 'center',
    maxWidth: '440px',
    maxHeight: '440px',
    width: '100%',
    flex: 1
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    width: '100%',
    aspectRatio: '1',
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px'
  },
  activeDrag: {
    border: '2px primary',
    borderColor: 'primary.900'
  },
  rigthBox: {
    order: { md: 2, xs: 1 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '432px',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    pb: { xs: '30px', sm: '0' }
  },
  description: {
    mb: '20px'
  },
  fileUploader: {
    button: {
      textAlign: 'center'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '5px',
      maxWidth: '270px',
      overflow: 'auto'
    }
  }
}
