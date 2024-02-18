'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { plusicon } from '../(navbar)/constant'
import { useScrollTrigger } from '@mui/material'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

export default function Leftdivforspaces({ baseurl, theme, settheme, loader, setloader, blackscreen2, setblackscreen2, themecheck }) {
  let disablerepeatuser = "";
  const router=useRouter();
  const [leftdivdata, setleftdivdata] = useState();
  const fetchsearchdata = useMemo(async () => {
    try {
      const response = await (await fetch(`${baseurl}/quora/post`,
        {
          method: "GET",
          headers: {
            projectID: "7zwdmzusuw4h",
          }
        }
      )).json();
      setleftdivdata(response.data)
    } catch (error) {
      alert(error);
    }
  }, [])

  function pushtochannel(val){
    router.push(`/channel/${val}`)
  }
  useEffect(() => {
    fetchsearchdata;
  }, [])

  return (
    <div className={`leftdivforspaces flex flexc g10`}>
      <div className={`flex p10 mb10  ${themecheck("bklightgray", "bkllgray")} csrpntr`}>{plusicon}<p className={`createspacestxt txtrpnone ${themecheck("txt5", "txt1")}`}>Create Space</p></div>
      {leftdivdata &&
        leftdivdata.map((item, index) => (item.channel && (disablerepeatuser !== item.channel.name) && (disablerepeatuser = item.channel.name, <div key={index} className={`channeldivs flexa p5 brdr-r3 csrpntr ${themecheck("darkbghvr", "bghvr")}`} onClick={()=>{pushtochannel(item.channel._id)}}>
          <img className={`searchchannelimg brdr-r5 mr10`} src={item.channel.image} alt='image' />
          <p className={`fnt12 ${themecheck("txt5", "txt1")}`}>{item.channel.name}</p>
        </div>)))
      }

    </div>

  )
}
