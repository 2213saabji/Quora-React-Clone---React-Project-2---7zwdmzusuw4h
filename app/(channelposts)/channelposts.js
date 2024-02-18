import React, { useEffect, useState } from 'react'
import "../(styles)/home.css"
import { baseurl, dot3icon, downvoteicon, imagesicon, roundmessageicon, upvoteicon } from '../(navbar)/constant'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle';

export default function Channelposts({ title, settitle, content, setcontent, imgpost, setimgpost, setuppercase, handleFileSelection, imagepicker, imagestorediv, inputpicuploader, uppercase, delpostaccess, index, toggle, settoggle, themecheck, item,  routetouserpage }) {

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


    const deletepost = async (val) => {
        try {

            const response = await fetch(`${baseurl}/quora/post/${val}`,
                {
                    method: "DELETE",
                    headers: {
                        projectID: "7zwdmzusuw4h",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    },

                }
            )

            settoggle(!toggle)
        } catch (error) {
            alert(error);
        }
    }

    const modifypost = async (val) => {
        try {
            if (title != "" && content != "" && imgpost) {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('content', content);
                formData.append('images', imgpost);
                const response = await (await fetch(`${baseurl}/quora/post/${val}`,
                    {
                        method: "PATCH",
                        headers: {
                            projectID: "7zwdmzusuw4h",
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                        },
                        body: formData
                    }
                )).json();
                settitle("");
                setcontent("");
                setimgpost("");
                imagestorediv.current.innerHTML = "";
                settoggle(!toggle)
                setmodify(false)
            }
        } catch (error) {
            alert(error);
        }
    }

    const likefun = async (val) => {
        try {
          const response = await (await fetch(`${baseurl}/quora/like/${val}`,
            {
              method: item.isLiked?"DELETE":"POST",
              headers: {
                projectID: "7zwdmzusuw4h",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
              }
            }
          )).json();
          settoggle(!toggle)
        } catch (error) {
          alert(error);
        }
      }
      
      const dislikefun = async (val) => {
        try {
          const response = await (await fetch(`${baseurl}/quora/dislike/${val}`,
            {
              method: item.isDisliked?"DELETE":"POST",
              headers: {
                projectID: "7zwdmzusuw4h",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
              }
            }
          )).json();
          settoggle(!toggle)
        } catch (error) {
          alert(error);
        }
      }
    
      function clicklike(like, id) {
          likefun(id);
      }
      function clickdislike(dislike, id) {
          dislikefun(id);
      }

    return (
        <div key={index} className={` brdr-r3 w100per mt10 ${themecheck("bkwhite", "bklightblack")}`}>
            {!modify && <>
                <div className={`p10`}>
                    <div className={`flex`}>
                        {item.channel.image ?
                            <img className={`profileimage mr10 csrpntr`} src={item.channel.image} alt="profile" onClick={() => { routetouserpage(item.author._id) }} />
                            :
                            <h2 className={`postimg w500 mr10 fnt20  flexja ${themecheck("bkgray", "bklightgray")} ${themecheck("txt7", "txt8")}`}>{item.author.name.charAt(0)}</h2>
                        }
                        <h4 className={`w600 mt5 csrpntr ${themecheck("txt8", "txt7")}`} onClick={() => { routetouserpage(item.author._id) }}>{item.channel.name}</h4>
                    </div>
                    <h4 className={`${themecheck("txt8", "txt7")} mt10 mb10`}>{item.title}</h4>
                    <p className={`homecontent w400 ${themecheck("txt8", "txt7")}`}>{item.content}</p>
                </div>
                {item.images[0] && <div><img className={`w100per`} style={{ height: "100%" }} src={item.images[0]} alt="image" /></div>}

                <div className={`flexa flexjsb w100per`}>
                    <div className={`flex w100per pl20 pr20 pb5 mt5`}>
                        <div className={`brdr-r50 csrpntr flex brdr1 ${themecheck("brdrlightgray", "brdrllgray")} `}>
                            <p className={`flexa bghvr brdrr1 upvotebtn pt5 pl10 pr10 pb5 fnt13 ${item.isLiked ? "upvotebtncolor" : ""} ${themecheck("brdrlightgray", "brdrllgray")}`} onClick={() => { clicklike(item.isLiked, item._id) }}>{upvoteicon}&nbsp;Upvote . &nbsp;{item.likeCount}</p>
                            <p className={`pl10 pr10 fnt13 bghvr downvotebtn flexja ${item.isDisliked ? "downvotebtncolor" : ""}`} onClick={() => { clickdislike(item.isDisliked, item._id) }}>{downvoteicon}&nbsp;Downvote . &nbsp;{item.dislikeCount}</p>
                        </div>
                        <div className={`bghvr csrpntr brdr-r12 flexja ml20`}>{roundmessageicon}&nbsp;{item.commentCount}</div>
                    </div>
                    {delpostaccess && JSON.parse(localStorage.getItem("userdetails"))._id == item.author._id && <>
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
                        >
                            <MenuItem >
                            <React.Fragment>
                            
                            <div onClick={()=>{handleClosee(),handleClickOpenn()}} className={`flexja`}>Delete Post</div>
                            <Dialog
                                open={openn}
                                onClose={handleClosee}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure to delete this post"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={()=>{handleClosee(),handleClose()}}>Disagree</Button>
                                    <Button onClick={(e)=>{handleClosee();handleClose(), deletepost(item._id)}} autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(), setmodify(true) }}>Modify Post</MenuItem>


                        </Menu>
                        
                    </>}
                </div>
            </>}
            {modify && <>
                <div className={`p10 modifyboxdiv`}>
                    <div className={`flex`}>
                        {item.author.profileImage ?
                            <img className={`profileimage mr10 csrpntr`} src={item.author.profileImage} alt="profile" onClick={() => { routetouserpage(item.author._id) }} />
                            :
                            <h2 className={`postimg w500 mr10 fnt20  flexja ${themecheck("bkgray", "bklightgray")} ${themecheck("txt7", "txt8")}`}>{item.author.name.charAt(0)}</h2>
                        }
                        <h4 className={`w600 mt5 csrpntr ${themecheck("txt8", "txt7")}`} onClick={() => { routetouserpage(item.author._id) }}>{item.author.name}</h4>
                    </div>

                    <input value={title} onChange={(e) => { settitle(e.target.value) }} className={`w100per brdrbx pl10 pb20 pr10 pt10 brdrb1 ${themecheck("brdrlightgray", "brdrllgray")} ${uppercase ? "uppercase" : ""}  ${themecheck("bkwhite", "bklightblack")} ${themecheck("txt8", "txt7")}`} placeholder='Title...' />
                    <textarea rows={4} value={content} onChange={(e) => { setcontent(e.target.value) }} className={`w100per brdrbx pl10 pr10 pt10 h100per ${uppercase ? "uppercase" : ""}  ${themecheck("bkwhite", "bklightblack")} ${themecheck("txt8", "txt7")}`} placeholder='Say something...' />
                    <div className={`flexa flexjsb createpostdowndiv pr10 pl10 brdrt1 ${themecheck("brdrlightgray", "brdrllgray")}`}>
                        <div className={`flexa`}><div className={`fnt20 w600 mr10 csrpntr ${themecheck("txt5", "txt1")}`} onClick={() => { setuppercase(!uppercase) }}>Aa</div>
                            <div className={`csrpntr flex`} onClick={() => { imagepicker() }} >{imagesicon}<input type='file' ref={inputpicuploader} style={{ display: "none" }} onChange={(e) => { handleFileSelection(e) }} />
                                <div ref={imagestorediv}></div>
                            </div>
                        </div>
                        <div>
                            <button className={` pt10 pb10 pl30 pr30 brdr-r50 w500 csrpntr fnt15 txt7 bghvr mr20  ${themecheck("txt8", " txt7")}`} onClick={(e) => {e.stopPropagation(); setmodify(false) }} >cancel</button>
                            <button className={` pt10 pb10 pl30 pr30 brdr-r50 w500 fnt15 txt7  ${!title || !content || !imgpost ? "bkblue nodrop" : "bkpureblue csrpntr"}`} onClick={() => { modifypost(item._id) }} disabled={!title || !content || !imgpost}>Modify</button>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}
