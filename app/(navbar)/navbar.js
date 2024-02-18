"use client"
import React, { useEffect, useState, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation'
import { baseurl, logoicon, navicon } from './constant';
import { allContext } from '../layout';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';


function Navbar() {
    const router = useRouter()
    const { theme, settheme,activePostOrQueDiv,setactivePostOrQueDiv, logintoken, setlogintoken, themecheck, blackscreen2, setblackscreen2 } = allContext();
    const [serachdata, setsearchdata] = useState();
    const [searchinput, setsearchinput] = useState("");
    const [anchorElNav, setAnchorElNav] = useState();
    const [anchorElUser, setAnchorElUser] = useState();
    const [searchinputstate, setsearchinputstate] = useState();
    const [anchorEl, setAnchorEl] = useState();
    const [anchorEll, setAnchorEll] = useState();

    const open = Boolean(anchorEl);
    const openn = Boolean(anchorEll);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickk = (event) => {
        setAnchorEll(event.currentTarget);
    };
    const handleClosee = () => {
        setAnchorEll(null);
    };

    function logoutuser() {
        router.push(`/login`);
        localStorage.removeItem("token");
        setlogintoken("");
        localStorage.removeItem("useremail");
    }

    function themechanger() {
        settheme(theme === "light" ? "dark" : "light")
        localStorage.setItem("theme", localStorage.getItem("theme") == "light" ? "dark" : "light");
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    function routetonext(item) {
        router.push(`/${item}`)
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function focussearchinput() {
        setsearchinputstate("active")
    }
    function blursearchinput() {
        setTimeout(() => {
            setsearchinputstate("");
        }, 300)
    }

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
            width: 32,
            height: 32,
            "&::before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            borderRadius: 20 / 2,
        },
    }));

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}

        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    const fetchsearchdata = useMemo(async () => {
        try {
            const response = await (await fetch(`${baseurl}/quora/post?search={"title":"${searchinput}"}`,
                {
                    method: "GET",
                    headers: {
                        projectID: "7zwdmzusuw4h",
                    }
                }
            )).json();
            setsearchdata(response.data)
        } catch (error) {
            alert(error);
        }
    }, [searchinput])
    useEffect(() => {
        fetchsearchdata;
    }, [])

    function userprofile(){
        router.push(`/profile/${JSON.parse(localStorage.getItem("userdetails"))._id}`)
    }
    function gotologin() {
        router.push(`/login`);
    }
    useEffect(() => {
        if (typeof (localStorage.getItem("token")) != "string") {
            gotologin();
        }

    }, [])

    return (<>{logintoken &&
        <AppBar position="sticky" top="0" className={`${themecheck("bkwhite", "bklightblack")}`} sx={{ backgroundColor: "white", boxShadow: "none", height: "60px" }}>
            <Container className='helo' sx={{ height: "20px" }} maxWidth="xl">
                <Toolbar sx={{ minHeight: "60px !important" }} disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>{logoicon}</Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navicon.map((page,index) => (
                                <MenuItem key={index} onClick={() => { handleCloseNavMenu, routetonext(page.link) }}>
                                    <Typography textAlign="center">{page.svg}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>{logoicon}</Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {navicon.map((page,index) => (
                            <Button disableRipple
                                key={index}
                                onClick={() => { handleCloseNavMenu, routetonext(page.link) }}
                                sx={{ my: 2, color: 'white', display: 'block', margin: "0px", padding: "0px", backgroundColor: router.pathname === `/${page.link}` ? 'red' : 'transparent', }}
                            >
                                {page.svg}
                            </Button>
                        ))}

                        <div className='searchinput'>
                            <SearchIcon className={`${themecheck("svgfill5", "svgfill1")}`} style={{ scale: "1.2" }} />
                            <input type='text' className={`w300 ${themecheck("bkwhite", "bklightblack")} ${themecheck("txt8", "txt7")}`} onFocus={focussearchinput} onBlur={blursearchinput} value={searchinput} onChange={(e) => { setsearchinput(e.target.value), focussearchinput() }} />
                            {searchinputstate && <div className={`serachinputpop ${themecheck("bkwhite", "bklightblack")} ${themecheck("boxshadowlgray","boxshadowblack")}`}>
                                <h2 className={`pb10 mb5 brdrb2 ${themecheck("brdrlightgray", "brdrllgray")}  ${themecheck("txt5", "txt1")}`}>Contents</h2>
                                {serachdata &&
                                    serachdata.map((item,index) => (<p key={index} style={{ color: "black" }} className={`${themecheck("txt5", "txt1")}`}>{item.title}</p>))
                                }
                            </div>}
                        </div>
                    </Box>
                    <Box sx={{ flexGrow: 0 }} className="flexa">

                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClickk}
                        >
                            <h2 className={`userlogo w500 fnt23 flexja ${themecheck("bkgray", "bklightgray")} ${themecheck("txt7", "txt8")}`}>{JSON.parse(localStorage.getItem("userdetails")).name.charAt(0)}</h2>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEll}
                            open={openn}
                            onClose={handleClosee}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: 'center',
                            }}
                            PaperProps={
                                theme == "light" ? {
                                    style: {
                                        backgroundColor: ``
                                    },
                                } : {
                                    style: {
                                        backgroundColor: "#262626",
                                    },
                                }
                            }
                        >
                            <h2 className={`userlogo ml10 w500 flexja ${themecheck("bkgray", "bklightgray")} ${themecheck("txt7", "txt8")}`}>{JSON.parse(localStorage.getItem("userdetails")).name.charAt(0)}</h2>
                            <h3 className={`useremailmainbar w500 mt10 pl10 pr20 mb20 pb5 ${themecheck("brdrwdth1", "brdrwdth1")} ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("txt5", "txt1")}`}>{JSON.parse(localStorage.getItem("userdetails")).email}</h3>
                            <h5 className={`flexa flexjsb pl10 csrpntr pt10 pb10 ${themecheck("bghvr", "llbghvr")} ${themecheck("txt5", "txt1")}`} onClick={()=>{userprofile(),handleClosee()}}>Profile Setting</h5>
                            <div className={`flexa flexjsb pl10 pb10 brdrb1 mb10 ${themecheck("brdrlightgray", "brdrllgray")}`}><h5 className={`${themecheck("txt5", "txt1")}`}>Dark mode</h5><FormControlLabel style={{ transform: "translate(13px)" }} control={<MaterialUISwitch sx={{ m: 1 }} checked={theme == "dark"} />} onChange={themechanger} checked={theme === "dark"} /></div>
                            <h5 onClick={() => { logoutuser() }} className={`flexa flexjsb pl10 csrpntr pt10 pb10 ${themecheck("bghvr", "llbghvr")} ${themecheck("txt5", "txt1")}`} onclick={()=>{handleClosee()}}>Logout</h5>
                        </Menu>
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                            sx={{ ml: "10px",textTransform:"capitalize" }}
                            className='addpostbutton'
                            style={{ textTransform: 'capitalize' }} 
                        >
                            Create Post
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { handleClose(); setblackscreen2(true),setactivePostOrQueDiv(false) }} disableRipple>
                                <EditIcon />
                                Create post
                            </MenuItem>
                        </StyledMenu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>}
    </>
    );
}

export default Navbar;