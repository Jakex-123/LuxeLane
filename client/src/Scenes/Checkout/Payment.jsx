import { Box, Typography,TextField } from '@mui/material'

function Payment({values ,errors, touched, handleBlur, handleChange ,setFieldValue}) {
    return (
    <Box margin='30px auto'>
        <Box>
            <Typography sx={{mb:'15px'}} fontSize='18px'>
                Contact Info
            </Typography>
            <TextField fullWidth type='text' label='Email' onBlur={handleBlur} onChange={handleChange} 
        value={values.email} name='email' error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} sx={{gridColumn:'span 4',mb:'15px'}} />
        <TextField fullWidth type='text' label='Phone Number' onBlur={handleBlur} onChange={handleChange} 
        value={values.phoneNumber} name='phoneNumber' error={!!touched.phoneNumber && !!errors.phoneNumber} helperText={touched.phoneNumber && errors.phoneNumber} sx={{gridColumn:'span 4'}} />
        </Box>
    </Box>
  )
}

export default Payment