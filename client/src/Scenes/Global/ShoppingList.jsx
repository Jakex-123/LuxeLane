import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Box, Typography,Tabs,Tab,useMediaQuery } from '@mui/material'
import Item from "../../Components/Item"
import { setItems } from "../../state/cartSlice"

function ShoppingList() {
    const dispatch=useDispatch();
    const [value,setValue]=useState('all')
    const items=useSelector(state=>state.cart.items)
    const isNonMobile=useMediaQuery('(min-width:600px)')

    const handleChange=(event,newValue)=>{
        setValue(newValue)
    }

    async function getItems(){
        const items=await fetch(`${import.meta.env.VITE_BACKENDURL}/api/items?populate=image`,{method:'GET'})
        const itJSON=await items.json()
        dispatch(setItems(itJSON.data))
    }

    useEffect(() => {
      getItems()
    }, [])
    
    const topRated=items.filter((item)=>item.attributes.categories==='topRated')
    console.log(topRated)
    const newArrivals=items.filter((item)=>item.attributes.categories==='newArrivals')
    const bestSellers=items.filter((item)=>item.attributes.categories==='bestSellers')

  return (
    <Box width='80%' margin='40px auto'>
        <Typography variant="h3" textAlign='center'><b>Featured Products</b></Typography>
        <Tabs sx={{m:'25px','& .MuiTabs-flexContainer':{flexWrap:'wrap'}}} textColor='primary' indicatorColor="primary" value={value} onChange={handleChange} centered TabIndicatorProps={{sx:{display:isNonMobile?'block':'none'}}}>
            <Tab label='all' value='all'></Tab>
            <Tab label='New Arrivals' value='newArrivals'></Tab>
            <Tab label='Best Sellers' value='bestSellers'></Tab>
            <Tab label='Top Rated' value='topRated'></Tab>
        </Tabs>
        <Box display='grid' gridTemplateColumns="repeat(auto-fill, 300px)" rowGap='20px' margin='0 auto' justifyContent='space-around' columnGap='1.33%'>
            {value==='all'&& items.map((item)=>{
                return <Item item={item} key={item.id}/>
            })}
            {value==='newArrivals'&& newArrivals.map((item)=>{
                        return <Item item={item} key={item.id}/>
            })}
            {value==='bestSellers'&& bestSellers.map((item)=>{
                        return <Item item={item} key={item.id}/>
            })}
            {value==='topRated'&& topRated.map((item)=>{
                        return <Item item={item} key={item.id}/>
            })}
        </Box>
    </Box>
  )
}

export default ShoppingList