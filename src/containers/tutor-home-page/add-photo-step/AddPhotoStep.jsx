import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material'
import { useState } from 'react'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CancelIcon from '@mui/icons-material/Cancel'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { useAppSelector } from '~/hooks/use-redux'
import { URLs } from '~/constants/request'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png']

const AddPhotoStep = ({ btnsBox, data, handleDataChange, userRole }) => {
  const { t } = useTranslation()
  const [preview, setPreview] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const { userId } = useAppSelector((state) => state.appMain)

  const showError = (message) => {
    setErrorMessage(message)
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleFileChange = async ({ files }) => {
    if (preview || !files || files.length === 0) return

    const file = files[0]

    if (!ALLOWED_TYPES.includes(file.type)) {
      showError(t('becomeTutor.photo.typeError'))
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      showError(t('becomeTutor.photo.fileSizeError'))
      return
    }

    if (!userId) {
      showError(t('becomeTutor.photo.userIdError'))
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('id', userId)
    formData.append('type', 'user')
    formData.append('userRole', userRole)

    try {
      const response = await fetch(URLs.upload.photo, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(t('becomeTutor.photo.uploadError'))
      }

      const { photo } = await response.json()
      setPreview(photo)
      handleDataChange({ ...data, photo: photo })
    } catch (error) {
      showError(error.message)
    }
  }

  const handleCancelUpload = () => {
    setPreview(null)
    handleDataChange({ ...data, photo: '' })
  }

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <DragAndDrop
          emitter={!preview ? handleFileChange : () => {}}
          initialState={[]}
          style={{
            root: {
              ...style.uploadBox,
              border: preview ? 'none' : '2px dashed',
              pointerEvents: preview ? 'none' : 'auto'
            },
            activeDrag: style.activeDrag
          }}
          validationData={{
            maxQuantityFiles: 1,
            filesTypes: ALLOWED_TYPES
          }}
        >
          {preview ? (
            <Box position='relative'>
              <img alt='Preview' src={preview} style={style.img} />
              <IconButton
                onClick={handleCancelUpload}
                size='small'
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  pointerEvents: 'auto'
                }}
              >
                <CancelIcon fontSize='small' />
              </IconButton>
            </Box>
          ) : (
            <Typography variant='body2'>
              {t('becomeTutor.photo.placeholder')}
            </Typography>
          )}
        </DragAndDrop>
      </Box>

      <Box sx={style.rigthBox}>
        <Typography sx={style.description} variant='body1'>
          {t('becomeTutor.photo.description')}
        </Typography>

        <label htmlFor='upload-photo'>
          <input
            accept={ALLOWED_TYPES.join(',')}
            disabled={!!preview}
            id='upload-photo'
            onChange={(e) => handleFileChange({ files: e.target.files })}
            style={{ display: 'none' }}
            type='file'
          />
          <Button
            component='span'
            disabled={!!preview}
            startIcon={<CloudUploadIcon />}
            sx={style.fileUploader.button}
            variant='outlined'
          >
            {t('becomeTutor.photo.button')}
          </Button>
        </label>

        <Typography sx={{ mt: '10px' }} variant='body2'>
          {t('becomeTutor.photo.maxFileSize')}
        </Typography>

        <Box sx={{ mt: 'auto', display: { md: 'block', xs: 'none' } }}>
          {btnsBox}
        </Box>
      </Box>
      <Box
        sx={{
          display: { md: 'none', xs: 'block' },
          order: 3,
          width: { sm: '80%', xs: '100%' },
          pb: { sm: '20px', xs: '0' }
        }}
      >
        {btnsBox}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        open={openSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AddPhotoStep
