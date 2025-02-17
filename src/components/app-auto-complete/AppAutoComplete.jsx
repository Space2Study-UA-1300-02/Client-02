import { Fragment } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Loader from '~/components/loader/Loader'
import { TypographyVariantEnum } from '~/types'

const defaultFilterOptions = (options, state) => {
  const filterOptions = createFilterOptions()
  return filterOptions(options, state)
}

const AppAutoComplete = ({
  filterOptions = defaultFilterOptions,
  ListboxProps = { style: { maxHeight: 150 } },
  options = [],
  hideClearIcon = false,
  textFieldProps = {},
  errorMsg,
  ...props
}) => {
  const helperText = errorMsg ? (
    <Tooltip title={errorMsg}>
      <Typography
        sx={{ color: 'red', textAlign: 'center' }}
        variant={TypographyVariantEnum.Caption}
      >
        {errorMsg}
      </Typography>
    </Tooltip>
  ) : (
    ' '
  )
  return (
    <Autocomplete
      ListboxProps={ListboxProps}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option === value}
      options={options || []}
      sx={{ mb: '5px', backgroundColor: 'red' }}
      {...props}
      renderInput={(params) => (
        <TextField
          error={Boolean(errorMsg)}
          helperText={helperText}
          {...params}
          {...textFieldProps}
          InputProps={{
            ...params.InputProps,
            ...textFieldProps.InputProps,
            endAdornment: (
              <Fragment>
                {props.loading ? (
                  <Loader size={20} sx={{ color: 'primary.600' }} />
                ) : null}
                {!hideClearIcon && params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}

export default AppAutoComplete
