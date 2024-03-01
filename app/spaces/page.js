'use client'
import React, { useEffect, useMemo, useState } from 'react'
import "../(styles)/spaces.css"
import Leftdivforspaces from "../(leftmaindiv)/Leftdivforspaces";
import { allContext } from '../layout';
import { SPACE_BACKGROUND_IMAGES, baseurl, plusicon } from "../(navbar)/constant";
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export default function page() {
  const router = useRouter();
  const { theme, settheme, logintoken, setlogintoken, loader, setloader, blackscreen2, setblackscreen2, themecheck, blackscreen3, setblackscreen3, toggle, settoggle } = allContext();
  const [spacesdata, setspacesdata] = useState();

  //----------------------fetch all the channel's----------------------

  const fetchsearchdata = useMemo(async () => {
    try {
      const response = await (await fetch(`${baseurl}/quora/channel`,
        {
          method: "GET",
          headers: {
            projectID: "7zwdmzusuw4h",
          }
        }
      )).json();
      setspacesdata(response.data)
    } catch (error) {
      console.log(error);
    }
  }, [toggle])

  //-------------------------push to particular space-------------------------
  function pushtochannel(val) {
    router.push(`/channel/${val}`)
  }

  useEffect(() => {
    fetchsearchdata;
  }, [toggle])

  return (<>{spacesdata &&
    <div className='mainflex spaceoutercontiner'>

      <div className={`brdr2 csrpntr spacecreatebutton brdrpureblue flexa brdr-r50 pl10 pr10 pt5 pb5 mt20 mb20 bktransparent`} onClick={() => { setblackscreen3(true) }}>
        <p className={`flexa`} >{plusicon}</p>
        <p className={`txtblue`}>Create Space</p>
      </div>

      <div className={`gridboxspaces w100per`} >
        {spacesdata.map((item, index) => (
          <div key={index} className={`spacescard brdr-r20 flexa flexc csrpntr`} style={{ boxShadow: `${themecheck("0px 0px 10px rgba(0, 0, 0, 0.409)", "0px 0px 12px rgba(0, 0, 0, 0.659)")}` }} onClick={() => { pushtochannel(item._id) }}>
            <div className={`cardbkimage`} style={{ position: "relative" }}>
              <Image src={`/${SPACE_BACKGROUND_IMAGES[index % 6]}`} alt='image' layout='fill' style={{ borderRadius: "20px 20px 0px 0px", boxSizing: "border-box" }} />
            </div>
            <img className={`profilespace brdr-r5 brdr2 ${themecheck("brdrwhite2", "brdrblack")}`} src={item.image} alt='profileImgage' />
            <div className={` w100per spacecardcontent flexj pr10 pl10 fnt13 ${themecheck("txt5", "txt1")}`}>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  }</>
  )
}
