import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  card: { 
    display: 'flex', 
    gap: '50px',
    maxWidth: '1200px',
    width: '100%',
    margin: '20px auto'
  },
  authorContainer: {
    width: '110px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  imageButton: {
    padding: 0,
    borderRadius: '50%',
    marginBottom: '8px',
    alignSelf: 'center'
  },
  image: {
    width: '93px',
    height: '93px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  fullName: { marginBottom: '4px', color: palette.basic.blueGray },
  rating: { backgroundColor: palette.basic.grey, marginBottom: '4px' },
  reviews: { color: palette.basic.blueGray },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: '1'
  },
  subjectInfo: { display: 'flex', gap: '4px' },
  languages: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: palette.basic.blueGray
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '200px',
    flexShrink: 0
  },
  currencyBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '14px'
  }
}
