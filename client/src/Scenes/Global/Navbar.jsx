import { useSelector, useDispatch } from 'react-redux'
import { Badge, Box, IconButton } from '@mui/material'
import { PersonOutlined, MenuOutlined, ShoppingBagOutlined, SearchOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { shades } from '../../theme'
import { setCartOpen } from '../../state/cartSlice'

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => { return state.cart.cart }) //the first cart signifies name in the store and the second the state from initialState

    return (
        <Box display="flex" alignItems="center" width="100%" height="60px" backgroundColor="rgba(255,255,255,0.95)" color="black" position="fixed" left="0" top="0" zIndex="1">
            <Box width="80%" margin="auto" display="flex" justifyContent="space-between" alignItems="center">
                <Box onClick={() => { navigate('/') }} sx={{ '&:hover': { cursor: "pointer" } }} color={shades.secondary[500]} fontSize={30}>LuxeLane</Box>
                <Box display="flex" justifyContent="space-between" columnGap="20px" zIndex="2">
                    <IconButton sx={{ color: "black" }}>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton sx={{ color: "black" }}>
                        <PersonOutlined />
                    </IconButton>
                    <Badge badgeContent={cart.length} sx={{
                        "& .MuiBadge-badge": { right: 5, top: 5, padding: "0 4px", height: "14px", minWidth: "13px" }
                    }} color="secondary" invisible={cart.length === 0}>
                        <IconButton sx={{ color: "black" }} onClick={() => { return dispatch(setCartOpen({})) }}>
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>
                    <IconButton sx={{ color: "black" }}>
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar