import React, { useEffect, useState } from 'react'
import { baseurl, dot3icon } from '../(navbar)/constant';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle';

export default function Userdetails({ refreshcommentdiv, toggle, settoggle, fetchcomment, itempost, itemid, authorid, marginstatus, routetouserpage, themecheck, itemcontent }) {
    const [authordetails, setauthordetails] = useState();

    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [openn, setOpenn] = React.useState(false);

    const handleClickOpenn = () => {
        setOpenn(true);
    };

    const handleClosee = () => {
        setOpenn(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchdetails = async () => {
        try {

            const response = await (await fetch(`${baseurl}/quora/user/${authorid}`,
                {
                    method: "GET",
                    headers: {
                        projectID: "7zwdmzusuw4h",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    }
                }
            )).json();
            setauthordetails(response.data);
        } catch (error) {
            alert(error);
        }
    }

    const deletecomment = async () => {
        try {

            const response = await fetch(`${baseurl}/quora/comment/${itemid}`,
                {
                    method: "DELETE",
                    headers: {
                        projectID: "7zwdmzusuw4h",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    }
                }
            )
            fetchcomment();
            refreshcommentdiv()


        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchdetails()
    }, [])

    return (<>{authordetails &&<div  className={` w100per flex flexjsb`}>
        <div className={`authordetailsdiv ${marginstatus ? "mt20" : ""} w100per flexa`}>
            {authordetails.profileImage ? (<img className={`profileimage mr10 csrpntr ml10  ${marginstatus ? "marginleftwithcondition" : ""}`} src={authordetails.profileImage} alt="profile" onClick={() => { routetouserpage(authordetails.profileImage) }} />) : (<h2 className={`postimg w500 mr10 ml10 fnt20  flexja ${themecheck("bkgray", "bklightgray")} ${themecheck("txt7", "txt8")}`}>{authordetails.name.charAt(0)}</h2>)}
            <div className={`w100per`}>
                <div>
                    <h4 className={`fnt13 w600 mt10 ${themecheck("txt8", "txt7")}`}>{authordetails.name}</h4>
                    <p className={`w400 fnt13 mt5 csrpntr ${themecheck("txt5", "txt1")}`}>{itemcontent}</p>
                </div>
            </div>
        </div>
        { 
                JSON.parse(localStorage.getItem("userdetails"))._id == authordetails._id && 
                <>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ borderRadius: "50%", minWidth: "40px", height: "40px", marginRight: "10px" }}
                        >
                            {dot3icon}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            PaperProps={{
                                style: {
                                    boxShadow: '2px 2px 8px #d3d3d320',
                                    border:"1px solid lightgray"
                                },
                            }}
                        >
                            <MenuItem  >
                                <React.Fragment>

                                    <div onClick={() => { handleClosee(), handleClickOpenn() }} className={`flexja`}>Delete comment</div>
                                    <Dialog
                                        open={openn}
                                        onClose={handleClosee}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        sx={{backgroundColor:"transparent"}}

                                    >
                                        <DialogTitle id="alert-dialog-title"
                                        >
                                            {"Are you sure to delete this post"}
                                        </DialogTitle>
                                        <DialogActions
                                        >
                                            <Button onClick={() => { handleClosee(), handleClose() }}>Disagree</Button>
                                            <Button onClick={(e) => { handleClosee(); handleClose();deletecomment() }} autoFocus>
                                                Agree
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </React.Fragment>
                            </MenuItem>
                        </Menu>
                    </>}
        </div>

    }
    </>
    )
}
