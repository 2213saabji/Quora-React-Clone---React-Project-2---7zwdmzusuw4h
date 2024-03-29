'use client'
import Link from "next/link"
import "./(styles)/home.css"
import Leftdivforspaces from "./(leftmaindiv)/Leftdivforspaces";
import { allContext } from "./layout";
import { AVATAR_BACKGROUND_COLORS, baseurl, copypencilicon, downvoteicon, messageicon, pencilicon, roundmessageicon, upvoteicon } from "./(navbar)/constant";
import { useEffect, useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import Home from "./(home)/Home"

export default function page() {
  const router = useRouter();
  const { theme, settheme, activePostOrQueDiv, setactivePostOrQueDiv, logintoken, setlogintoken, toggle, settoggle, loader, setloader,blackscreen3, setblackscreen3, blackscreen2, setblackscreen2, themecheck, successfullMessageAddfun } = allContext();
  const [data, setdata] = useState();

  function pushtoAnswer() {
    router.push(`/answer`);
  }
  
// -------------------------Fetch Webite Posts For Home Route------------------------------

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
      console.log(error);

    }
  }, [toggle])
  useEffect(() => {
    fetchdata;
  }, [])

  //----------------------navigate to routes page----------------------

  function routetouserpage(userid) {
    router.push(`/profile/${userid}`)
  }


  return <div id="App" className="mainflex flex g20">
    {data && <>
      <div className={`mainflexleft mt10 pl10 pt20 pb10 pr10`}>
        <Leftdivforspaces toggle={toggle} baseurl={baseurl} theme={theme} settheme={settheme} loader={loader} setloader={setloader} blackscreen3={blackscreen3} setblackscreen3={setblackscreen3} themecheck={themecheck} />
      </div>
      <div className={`mainflexright g10  flex ${themecheck("txt5", "txt1")}`}>
        <div className={`mainflexrightcenter pt30 pt10 w100per`}>
          <div className={`p10 pt20 brdr-r3 ${themecheck("bkwhite", "bklightblack")}`}>
            <div className={`flex`}>
              <h2 className={`userlogohome w500 mr10 fnt20  flexja ${themecheck("txt7", "txt8")}`} style={{backgroundColor:AVATAR_BACKGROUND_COLORS[(JSON.parse(localStorage.getItem("userdetails")).name.charCodeAt(0))%20]}}>{JSON.parse(localStorage.getItem("userdetails")).name.charAt(0)}</h2>
              <p className={`p10 pl20 brdr1 brdr-r50 fnt14 flexa w100per csrpntr ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("bkwhite", "bkblack")} ${themecheck("txt5", "txt1")}`} onClick={() => { setblackscreen2(true), setactivePostOrQueDiv(false) }}> What do you want to ask or share?</p>
            </div>
            <div className={`flexja mt5`}>
              <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`} onClick={() => { setblackscreen2(true), setactivePostOrQueDiv(true) }}>{messageicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Ask</p></div>
              <p className={`brdrl1 ${themecheck("brdrlightgray", "brdrllgray")}`} style={{ height: "20px", alignSelf: "center" }}></p>
              <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`} onClick={() => { pushtoAnswer() }}>{copypencilicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Answer</p></div>
              <p className={`brdrl1 ${themecheck("brdrlightgray", "brdrllgray")}`} style={{ height: "20px", alignSelf: "center" }}></p>
              <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`} onClick={() => { setblackscreen2(true), setactivePostOrQueDiv(false) }}>{pencilicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Post</p></div>
            </div>
          </div>

          {data && data.map((item, index) => (
            <div key={index}>
            <Home delpostaccess={false}
              index={index}
              toggle={toggle} settoggle={settoggle}
              themecheck={themecheck}
              item={item}
              routetouserpage={routetouserpage}
              successfullMessageAddfun={successfullMessageAddfun} />
              </div>
          ))}

        </div>
        <div className={`mainflexrightadd flexa flexc pt30`}>
          <iframe style={{ width: "100%", border: "none", maxWidth: "300px", height: "300px", overflow: "scroll" }} src='https://s0.2mdn.net/sadbundle/12492554015069590311/index.html?ev=01_250' />
          <iframe style={{ width: "100%", maxWidth: "300px", height: "300px", overflow: "scroll" }} src='https://s0.2mdn.net/sadbundle/12492554015069590311/index.html?ev=01_250' />
        </div>
      </div>
    </>
    }
  </div>

}
