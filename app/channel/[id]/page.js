'use client'
import React, { useEffect, useMemo, useState } from 'react'
import "../../(styles)/channel.css"
import { allContext } from '@/app/layout'
import { baseurl } from '@/app/(navbar)/constant'
import Home from '@/app/(home)/Home'
import Channelposts from '@/app/(channelposts)/channelposts'
export default function page(props) {
  const {title,settitle, content,setcontent, imgpost,setimgpost, blackscreen2, setblackscreen2, toggle, settoggle, routetouserpage, uppercase,imagepicker,inputpicuploader, imagestorediv, handleFileSelection, setuppercase } = allContext();
  const { themecheck } = allContext()
  const [channeldata, setchanneldata] = useState();
  const [channelpostsdata,setchannelpostsdata]=useState();

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
    <div className={`channelroute mr30 ml30`}>


      <div className={`blurdiv flexj`} ></div>
      <div className={`upperimg`}></div>
      <div className={`mainbodychannelpage pl30 pr30`}>
        <img className={`profilechannelimage`} src={channeldata.image} alt='' />
        <div className={`w100per flex`}>
          <div className={`flex flexc flexjsb`}>
           {channeldata.name && <h1 className={`channelusername txtrpnone txt7`}>{channeldata.name}</h1>}
           {channeldata.description && <p className={`txt10 fnt12`}>{channeldata.description}</p>}
          </div>
          <div className={``}>
            <button></button>
          </div>
        </div>
        <div className={`userpostsdiv mt30 flexa flexc`}>

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
              {channelpostsdata && channelpostsdata.length<=0 &&<div className={`flexa flexc`}><div className={`emptypostsmessage`}></div><p className={`${themecheck("txt8", "txt7")}`}>You haven't shared, answered or posted anything yet.</p></div>}
        </div>
      </div>
    </div>
  }
  </>
  )
}
