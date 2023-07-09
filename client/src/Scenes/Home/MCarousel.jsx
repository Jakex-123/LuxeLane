import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { shades } from '../../theme'
import Img1 from '../../assets/1.jpeg'
import Img2 from '../../assets/2.jpeg'
import Img3 from '../../assets/3.jpeg'
import Img4 from '../../assets/4.jpeg'
import Img5 from '../../assets/5.jpeg'

export default function MCarousel() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const heroTextureImports = [Img1,Img2,Img3,Img4,Img5];

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      autoPlay={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{ position: 'absolute', left: '0', top: '50%', color: 'white', padding: '5px', zIndex: '10' }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{ position: 'absolute', right: '0', top: '50%', color: 'white', padding: '5px', zIndex: '10' }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {heroTextureImports.map((texture, index) => (
        <Box key={index}>
          <img src={texture} alt='carousel-image' style={{ width: '100%', height: '700px', objectFit: 'cover', backgroundAttachment: 'fixed' }} />
          <Box
            color='white'
            padding='20px'
            borderRadius='1px'
            textAlign='left'
            backgroundColor='rgba(0,0,0,0.4)'
            position='absolute'
            top='46%'
            left={isNonMobile ?'10%' : '0'}
            right={isNonMobile ? 'undefined' : '0'}
            margin={isNonMobile ? 'undefined' : '0 auto'}
            maxWidth={isNonMobile ? 'undefined' : '240px'}
          >
            <Typography color={shades.secondary[200]}>-- New Items</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography fontWeight="bold" color={shades.secondary[300]} sx={{ textDecoration: "underline" }}>
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  )
}