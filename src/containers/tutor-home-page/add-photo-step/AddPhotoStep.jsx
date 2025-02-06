import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useStepContext } from '~/context/step-context'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckIcon from '@mui/icons-material/Check'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox }) => {
  const [preview, setPreview] = useState(null)
  const { handleStepData } = useStepContext()

  const handleFileChange = ({ files, error }) => {
    if (!error && files.length > 0) {
      const file = files[0]
      setPreview(URL.createObjectURL(file))

      handleStepData('Photo', [file])
    }
  }

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <DragAndDrop
          emitter={handleFileChange}
          initialState={[]}
          style={{
            root: {
              ...style.uploadBox,
              border: preview ? 'none' : '2px dashed'
            },
            activeDrag: style.activeDrag
          }}
          validationData={{
            maxQuantityFiles: 1,
            filesTypes: ['image/jpeg', 'image/png']
          }}
        >
          {preview ? (
            <img alt='Preview' src={preview} style={style.img} />
          ) : (
            <Typography variant='body2'>Photo Preview</Typography>
          )}
        </DragAndDrop>
      </Box>

      <Box sx={style.rigthBox}>
        <Typography sx={style.description} variant='body1'>
          Velit officia consequat duis enim velit mollit. Exercitation veniam
          consequat sunt nostrud amet.
        </Typography>

        <label htmlFor='upload-photo'>
          <input
            accept='image/*'
            id='upload-photo'
            onChange={(e) =>
              handleFileChange({ files: e.target.files, error: null })
            }
            style={{ display: 'none' }}
            type='file'
          />
          <Button
            component='span'
            startIcon={<CloudUploadIcon />}
            sx={style.fileUploader.button}
            variant='outlined'
          >
            Upload your profile photo
          </Button>
          {preview && (
            <CheckIcon
              color='success'
              sx={{ ml: '19px', verticalAlign: 'middle' }}
            />
          )}
        </label>

        <Typography sx={{ mt: '10px' }} variant='body2'>
          Maximum file size - 10 Mb
        </Typography>

        <Box sx={{ mt: 'auto' }}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
