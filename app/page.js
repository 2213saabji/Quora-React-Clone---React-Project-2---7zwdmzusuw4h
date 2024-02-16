'use client'
import Link from "next/link"
import "./(styles)/home.css"
import Leftdivforspaces from "./(leftmaindiv)/Leftdivforspaces";
import { allContext } from "./layout";
import { baseurl, copypencilicon, downvoteicon, messageicon, pencilicon, roundmessageicon, upvoteicon } from "./(navbar)/constant";
import { useEffect, useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import SwipeableTextMobileStepper from "./(carousal)/carousalone";

export default function Home() {
  const router=useRouter();
  const { theme, settheme, logintoken, setlogintoken, loader, setloader, blackscreen2, setblackscreen2, themecheck } = allContext();
  const [data, setdata] = useState();
  const [toggle,settoggle]=useState(false);
  const fetchdata = useMemo(async () => {
    try {
      const response = await (await fetch(`${baseurl}/quora/post?limit=500`,
        {
          method: "GET",
          headers: {
            projectID: "7zwdmzusuw4h",
          }
        }
      )).json();
      setdata(response.data)
      console.log(response);
    } catch (error) {
      alert(error);
    }
  }, [toggle])
  useEffect(() => {
    fetchdata;
  }, [])
  
  const likefun = async (val) => {
    try {
      const response = await (await fetch(`${baseurl}/quora/like/${val}`,
        {
          method: "POST",
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
          method: "POST",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }
      )).json();
      settoggle(!toggle)
      console.log(response)
    } catch (error) {
      alert(error);
    }
  }

  function routetouserpage(userid){
    router.push(`/profile/${userid}`)
    console.log(userid)
  }

  function clicklike(like,id){
    if(like==false){
      likefun(id);
    }
  }
  function clickdislike(dislike,id){
    if(dislike==false){
      dislikefun(id);
    }
  }
  
  return <div id="App" className="mainflex">
{data &&<>
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
            <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`}>{messageicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Ask</p></div>
            <p className={`brdrl1 ${themecheck("brdrlightgray", "brdrllgray")}`} style={{ height: "20px", alignSelf: "center" }}></p>
            <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`}>{copypencilicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Answer</p></div>
            <p className={`brdrl1 ${themecheck("brdrlightgray", "brdrllgray")}`} style={{ height: "20px", alignSelf: "center" }}></p>
            <div className={`w100per flexja p5 brdr-r50 ml5 mr5 csrpntr ${themecheck("darkbghvr", "bghvr")}`}>{pencilicon}<p className={`fnt13 ml5 ${themecheck("txt5", "txt1")}`}>Post</p></div>
          </div>
        </div>







        {data && data.map((item,index) => (
          <div className={` brdr-r3 mt10 ${themecheck("bkwhite", "bklightblack")}`}>

            <div className={`p10`}>
              <div className={`flex`}>
                <img className={`profileimage mr10 csrpntr`} src={item.author.profileImage} alt="profile" onClick={()=>{routetouserpage(item.author._id)}} />
                <h4 className={`w600 mt5 csrpntr ${themecheck("txt8", "txt7")}`} onClick={()=>{routetouserpage(item.author._id)}}>{item.author.name}</h4>
                {/* <h4 className={`ml10 mt5 w400 fnt13 txtblue`} onClick={()=>{}}>Follow</h4> */}
              </div>
              <h4 className={`${themecheck("txt8", "txt7")} mt10 mb10`}>{item.title}</h4>
              <p className={`homecontent w400 ${themecheck("txt8", "txt7")}`}>{item.content}</p>
            </div>
            <img className={`w100per`} style={{height:"100%"}} src={item.images[0]} alt="image"/>
            <div className={`flex pl20 pr20 pb5 mt5`}>
              <div className={`brdr-r50 csrpntr flex brdr1 ${themecheck("brdrlightgray", "brdrllgray")} `}>
                <p className={`flexa bghvr brdrr1 upvotebtn pt5 pl10 pr10 pb5 fnt13 ${themecheck("brdrlightgray", "brdrllgray")}`} onClick={()=>{clicklike(item.isLiked,item._id)}}>{upvoteicon}&nbsp;Upvote . &nbsp;{item.likeCount}</p>
                <p className={`pl10 pr10  bghvr downvotebtn flexja`} onClick={()=>{clickdislike(item.isDisliked,item._id)}}>{downvoteicon}</p>
                </div>
              <div className={`bghvr csrpntr brdr-r12 flexja ml20`}>{roundmessageicon}&nbsp;{item.commentCount}</div>
              </div>
          </div>
        ))}








      </div>
      <div className={`mainflexrightadd flexa flexc pt30`}>
          <SwipeableTextMobileStepper/>
          <SwipeableTextMobileStepper/>
          
      </div>
    </div>
    </>
}
  </div>

}
