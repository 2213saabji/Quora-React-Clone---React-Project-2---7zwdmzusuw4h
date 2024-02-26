'use client'
import Image from 'next/image'
import React from 'react'
import { allContext } from '../layout';
import { baseurl } from '../(navbar)/constant';
import Leftdivforspaces from '../(leftmaindiv)/Leftdivforspaces';

export default function page() {
  const { theme, settheme, logintoken, setlogintoken, loader, setloader, blackscreen2, setblackscreen2, themecheck } = allContext();


  return (
    <div className='mainflex'>
      <div className="mainflexleft">
      <Leftdivforspaces baseurl={baseurl} theme={theme} settheme={settheme} loader={loader} setloader={setloader} blackscreen2={blackscreen2} setblackscreen2={setblackscreen2} themecheck={themecheck} />
        
      </div>
      <div className="mainflexright">

      <div className={`flexja flexc emptymainflexright`}><div  style={{width:"300px",height:"250px",position:'relative'}}><Image src={"/errormessage.webp"} style={{transform:"translate(-40px)"}} layout='fill' alt='hello'/> </div><p className={`mt20 ${themecheck("txt8", "txt7")}`}>We expect this feature to be implemented shortly.</p></div>

      </div>
    </div>
  )
}
