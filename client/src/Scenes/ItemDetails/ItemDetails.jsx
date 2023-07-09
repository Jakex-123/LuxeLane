import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material"
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react"
import { shades } from "../../theme";
import Item from "../../Components/Item";
import { addToCart } from "../../state/cartSlice";

const ItemDetails = () => {
    const dispatch=useDispatch()
    const {itemId}=useParams()
    const [item,setItem]=useState(null)
    const [items,setItems]=useState([])
    const [count,setCount]=useState(1);
    const [value,setValue]=useState('description')

    async function getItem(){
        const item=await fetch(`${import.meta.env.VITE_BACKENDURL}/api/items/${itemId}?populate=image`,{method:'GET'})
        const itemJson=await item.json()
        setItem(itemJson.data)
        console.log(itemJson.data)
    }
    async function getItems(){
        const items=await fetch(`${import.meta.env.VITE_BACKENDURL}/api/items?populate=image`,{method:'GET'})
        const itJSON=await items.json()
        setItems(itJSON.data)
    }
    useEffect(()=>{
        getItem();
        getItems();
    },[])
    return (
       <Box width='80%' m='80px auto'>
            <Box display='flex' flexWrap='wrap' columnGap='40px'>
            <Box flex='1 1 40%' mb='40px'>
                <img style={{objectFit:'contain'}} width='100%' height='100%' src={`${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} alt="" />
            </Box>
            <Box flex='1 1 50%' mb='40px'>
                <Box display='flex' justifyContent='space-between'>
                    <Box>
                        Home/Item
                    </Box>
                    <Box>
                        Prev/Next
                    </Box>
                </Box>
                <Box m='65px 0 25px 0'>
                    <Typography variant='h3'>{item?.attributes?.name}</Typography>
                    <Typography>${item?.attributes?.price}</Typography>
                    <Typography sx={{mt:'20px'}}>{item?.attributes?.lDescription}</Typography>
                </Box>
                <Box display='flex' minHeight="40px">
                <Box display='flex' justifyContent='space-between' width='90px' mr='20px' alignItems='center' sx={{border:'1px solid rgba(157, 157, 157, 0.77)'}} >
                <IconButton onClick={()=>setCount(Math.max(1,count-1))}>
                    <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                <IconButton onClick={()=>setCount(count+1)}>
                    <AddIcon />
                </IconButton>
                </Box>
                <Button sx={{backgroundColor:'black',color:'white',borderRadius:'0',p:'10px 40px',minWidth:'150px'}} onClick={()=>{dispatch(addToCart({item:{...item,count}}))}}>
                    Add to Cart
                </Button>
            </Box>
            <Box display='flex' alignItems='center' m="20px 0 5px 0">
            <IconButton sx={{p:'0 !important'}}>
                <FavoriteBorderIcon/>
            </IconButton>
            <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.attributes?.categories}</Typography>
            </Box>
            </Box>

            <Box m='20px 0'>
                <Tabs value={value} onChange={(event,newValue)=>{setValue(newValue)}}>
                    <Tab label='Description' value='description'/>
                    <Tab label='Reviews' value='reviews'/>
                </Tabs>
            </Box>
            <Box display='flex' flexWrap='wrap' gap='15px'>
                {value==='description' && <div>{item?.attributes?.lDescription}</div>}
                {value==='reviews' && <div>Reviews</div>}
            </Box>
            <Box mt='50px'>
                <Typography variant='h3' fontWeight='bold'>RELATED PRODUCTS</Typography>
                <Box mt="20px" display="flex" flexWrap="wrap" gap='20px' justifyContent="space-between">
                    {items.slice(0,4).map((item,i)=> (<Item item={item} width={'280px'} key={i}/>)
                    )}
                </Box>
            </Box>
       </Box>
    )
}

export default ItemDetails
