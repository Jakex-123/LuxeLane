import { useState } from "react"
import { useDispatch } from "react-redux"
import { Box, IconButton, Typography, useTheme, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from "../theme"
import { addToCart } from "../state/cartSlice"
import { useNavigate } from "react-router-dom"

function Item({ item, width }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const { palette: { neutral } } = useTheme()

    const { categories, price, name, image } = item.attributes
    const {
        data: {
            attributes: {
                formats: {
                    medium: { url }
                }
            }
        }
    } = image

    return (
        <Box width={width}>
            <Box position='relative' onMouseOver={() => { setIsHovered(true) }} onMouseOut={() => { setIsHovered(false) }}>
                <img style={{ cursor: "pointer" }} src={`https://strapi-ecom-he9e.onrender.com$${url}`} alt={item.name} width='300px' height='400px' onClick={() => { navigate(`/item/${item.id}`) }} />
                <Box display={isHovered ? 'block' : 'none'} position='absolute' bottom='10%' left='0' width='100%' padding='0 5%'>
                    <Box display='flex' justifyContent='space-between'>
                        <Box display='flex' alignItems='center' backgroundColor={shades.neutral[100]} borderRadius='3px'>
                            <IconButton onClick={() => { setCount(Math.max(count - 1, 1)) }}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <IconButton onClick={() => { setCount(Math.max(count + 1)) }}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button onClick={() => { dispatch(addToCart({ item: { ...item, count } })) }} sx={{ backgroundColor: shades.primary[300], color: 'white' }}>
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box mt='3px'>
                <Typography variant="subtitle2" color={neutral.dark}>
                {categories
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <Typography>{name}</Typography>
                <Typography fontWeight='bold'>₹{price}</Typography>
            </Box>
        </Box>
    )
}

export default Item
