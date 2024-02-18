'use client'
import Link from "next/link"
import "./(styles)/home.css"
import Leftdivforspaces from "./(leftmaindiv)/Leftdivforspaces";
import { allContext } from "./layout";
import { baseurl, copypencilicon, downvoteicon, messageicon, pencilicon, roundmessageicon, upvoteicon } from "./(navbar)/constant";
import { useEffect, useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import SwipeableTextMobileStepper from "./(carousal)/carousalone";
import Home from "./(home)/Home"

export default function page() {
  const router = useRouter();
  const { theme, settheme,activePostOrQueDiv,setactivePostOrQueDiv, logintoken, setlogintoken, toggle, settoggle, loader, setloader, blackscreen2, setblackscreen2, themecheck } = allContext();
  const [data, setdata] = useState();

  function pushtoAnswer() {
      router.push(`/answer`);
  }
  const fetchdata = useMemo(async () => {
    try {
      const response = await (await fetch(`${baseurl}/quora/post?limit=500`,
        {
          method: "GET",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }
      )).json();
      setdata(response.data)
    } catch (error) {
      // alert(error);
    }
  }, [toggle])
  useEffect(() => {
    fetchdata;
  }, [])


  function routetouserpage(userid) {
    router.push(`/profile/${userid}`)
  }


  return <div id="App" className="mainflex flex g20">
    {data && <>
      <div className={`mainflexleft mt10 pl10 pt20 pb10 pr10`}>
        <Leftdivforspaces baseurl={baseurl} theme={theme} settheme={settheme} loader={loader} setloader={setloader} blackscreen2={blackscreen2} setblackscreen2={setblackscreen2} themecheck={themecheck} />
      </div>
      <div className={`mainflexright  flex ${themecheck("txt5", "txt1")}`}>
        <div className={`mainflexrightcenter pt30 pt10 w100per`}>
          <div className={`p10 pt20 brdr-r3 ${themecheck("bkwhite", "bklightblack")}`}>
            <div className={`flex`}>
              <h2 className={`userlogohome w500 mr10 fnt20  flexja ${themecheck("bkgray", "bklightgray")} ${themecheck("txt7", "txt8")}`}>{JSON.parse(localStorage.getItem("userdetails")).name.charAt(0)}</h2>
              <p className={`p10 pl20 brdr1 brdr-r50 fnt14 flexa w100per csrpntr ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("bkwhite", "bkblack")} ${themecheck("txt5", "txt1")}`}> What do you want to ask or share?</p>
            </div>
            <div className={`flexja mt5`}>
              <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`} onClick={()=>{setblackscreen2(true),setactivePostOrQueDiv(true)}}>{messageicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Ask</p></div>
              <p className={`brdrl1 ${themecheck("brdrlightgray", "brdrllgray")}`} style={{ height: "20px", alignSelf: "center" }}></p>
              <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`} onClick={()=>{pushtoAnswer()}}>{copypencilicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Answer</p></div>
              <p className={`brdrl1 ${themecheck("brdrlightgray", "brdrllgray")}`} style={{ height: "20px", alignSelf: "center" }}></p>
              <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`} onClick={()=>{setblackscreen2(true),setactivePostOrQueDiv(false)}}>{pencilicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Post</p></div>
            </div>
          </div>

          {data && data.map((item, index) => (
            <Home delpostaccess={false} 
            index={index} 
            toggle={toggle} settoggle={settoggle} 
            themecheck={themecheck} 
            item={item} 
            routetouserpage={routetouserpage} />
          ))}

        </div>
        <div className={`mainflexrightadd flexa flexc pt30`}>
          <SwipeableTextMobileStepper />
          <SwipeableTextMobileStepper />

        </div>
      </div>
    </>
    }
  </div>

}
