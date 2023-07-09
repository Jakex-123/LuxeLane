import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import {Box,Button,Divider,Icon,IconButton,InputBase,Typography} from '@mui/material'
import { shades } from '../../theme';

function Subscribe() {
  return (
    <Box display='flex' alignItems='center' flexDirection='column' width='80%' textAlign='center' margin='80px auto' mt='60px'>
        <IconButton sx={{color:`${shades.primary[300]}`,}} >
            <MarkEmailReadOutlinedIcon fontSize="large"/>
        </IconButton>
        <Typography variant='h4' fontSize={20} mt='5px' mb='3px'>SUBSCRIBE TO OUR NEWSLETTER</Typography>
        <Typography>and receive a ₹500 coupon for your first order when you checkout</Typography>
        <Box display='flex' m='15px auto' alignItems='center' width='75%' p='2px 4px' borderRadius='2px' backgroundColor='rgba(0,0,0,0.1)'>
        <InputBase sx={{flex:1,ml:1}} placeholder='Enter Email'/>
        <Divider sx={{height:28 ,m:0.5}} orientation='vertical'/>
        <Button sx={{textTransform: 'capitalize !important'}}>
            <Typography>Subscribe</Typography>
        </Button>
        </Box>
    </Box>
  )
}

export default Subscribe