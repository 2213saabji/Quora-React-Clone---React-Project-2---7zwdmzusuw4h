'use client'
import React, { useEffect, useMemo, useState } from 'react'
import "../../(styles)/channel.css"
import { allContext } from '@/app/layout'
import { baseurl, dot3icon } from '@/app/(navbar)/constant'
import Home from '@/app/(home)/Home'
import Channelposts from '@/app/(channelposts)/channelposts'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation'

export default function page(props) {
  const router=useRouter()
  const {title,settitle, content,setcontent, imgpost,setimgpost, blackscreen2, setblackscreen2, toggle, settoggle, routetouserpage, uppercase,imagepicker,inputpicuploader, imagestorediv, handleFileSelection, setuppercase } = allContext();
  const { themecheck } = allContext()
  const [channeldata, setchanneldata] = useState();
  const [channelpostsdata,setchannelpostsdata]=useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [modify, setmodify] = useState(false);
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


  const channeldatafun = useMemo(async () => {
    try {
      const response = await (await fetch(`${baseurl}/quora/channel/${props.params.id}`,
        {
          method: "GET",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          },
        }
      )).json();
      setchanneldata(response.data)
    } catch (error) {
      alert(error);
    }
  }, [])

  const deletechannel = async () => {
    try {
      const response = await fetch(`${baseurl}/quora/channel/${props.params.id}`,
        {
          method: "DELETE",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          },
        }
      )
      router.push("/")
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    channeldatafun;
  })
  const channeluserpostfun = useMemo(async () => {
    try {
      const response = await (await fetch(`${baseurl}/quora/post?limit=500`,
        {
          method: "GET",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          },
        }
      )).json();
      const filtereddata=response.data.filter((item)=>{return item.channel?item.channel._id == props.params.id:""})
      setchannelpostsdata(filtereddata)
    } catch (error) {
      alert(error);
    }
  }, [toggle])

  useEffect(() => {
    channeldatafun;
    channeluserpostfun
  })

  return (<>{channeldata &&
    <div className={`${(channelpostsdata && channelpostsdata.length<=0)?"":"channelroute"} mr30 ml30`}>


      <div className={`blurdiv flexj`} ></div>
      <div className={`upperimg`}></div>
      <div className={`mainbodychannelpage pl30 pr30`}>
        <img className={`profilechannelimage`} src={channeldata.image} alt='' />
        <div className={`w100per flex flexjsb`}>
          <div className={`channelprofileleftdiv flex flexc flexjsb`}>
           {channeldata.name && <h1 className={`channelusername txtrpnone txt7`}>{channeldata.name}</h1>}
           {channeldata.description && <p className={`txt10 fnt12`}>{channeldata.description}</p>}
          </div>
          <div className={`channelprofilerightdiv flex flexc`}>
          {channeldata && JSON.parse(localStorage.getItem("userdetails"))._id == channeldata.owner._id &&
           <div style={{alignSelf:"flex-end"}} className={`bkllwhite brdr-r-per`}>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ borderRadius: "50%", minWidth: "40px", height: "40px", }}

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
                        >
                            <MenuItem 
                            >
                            <React.Fragment>
                            
                            <div onClick={()=>{handleClosee(),handleClickOpenn()}} className={`flexja`}>Delete Channel</div>
                            <Dialog
                                open={openn}
                                onClose={handleClosee}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure to delete this channel"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={()=>{handleClosee(),handleClose()}}>Disagree</Button>
                                    <Button onClick={(e)=>{handleClosee();handleClose(), deletechannel()}} autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                            </MenuItem>


                        </Menu>
                        
                    </div>}
          </div>
        </div>
        <div className={`userpostsdiv mt20 flexa flexc`}>

              {channelpostsdata && channelpostsdata.map((item, index) => (
                <Channelposts title={title} settitle={settitle} 
                content={content} setcontent={setcontent} 
                imgpost={imgpost} setimgpost={setimgpost} 
                setuppercase={setuppercase} 
                handleFileSelection={handleFileSelection} 
                imagestorediv={imagestorediv} 
                inputpicuploader={inputpicuploader} 
                imagepicker={imagepicker} 
                uppercase={uppercase} 
                delpostaccess={true} 
                index={index} 
                toggle={toggle} settoggle={settoggle} 
                themecheck={themecheck} 
                item={item} 
                routetouserpage={routetouserpage} />
              ))}
              {channelpostsdata && channelpostsdata.length<=0 &&<div className={`emptychannelpostsmessage flexa flexc`}><div className={`emptypostsmessage`}></div><p className={`${themecheck("txt5", "txt1")}`}>You haven't shared posted anything yet.</p></div>}
        </div>
      </div>
    </div>
  }
  </>
  )
}
