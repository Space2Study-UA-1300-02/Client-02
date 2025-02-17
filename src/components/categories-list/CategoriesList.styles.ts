export const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'white',
    boxShadow: '0px 3px 16px 2px #90A4AE1F',
    borderRadius: '6px',
    p: '25px 30px',
    maxHeight: 112,
    maxWidth: 360,
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0px 3px 16px 2px #90A4AE8F',
      transform: 'translateY(-4px)'
    }
  },
  iconContainer: {
    width: 62,
    height: 62,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: 500,
    fontSize: '20px'
  },
  subtitle: {
    color: 'text.secondary',
    fontSize: '14px'
  }
}
