'use client'
import React from 'react'
import Leftdivforspaces from "../(leftmaindiv)/Leftdivforspaces";
import { allContext } from '../layout';
import { baseurl } from "../(navbar)/constant";


export default function page() {
  const { theme, settheme, logintoken, setlogintoken, loader, setloader, blackscreen2, setblackscreen2, themecheck } = allContext();

  return (
    <div className='mainflex'>
      <div className={`mainflexleft mt10 pl10 pt20 pb10 pr10`}>
      <Leftdivforspaces baseurl={baseurl} theme={theme} settheme={settheme} loader={loader} setloader={setloader} blackscreen2={blackscreen2} setblackscreen2={setblackscreen2} themecheck={themecheck} />
      </div>
      <div className="mainflexright">

        notification
      </div>

    </div>
  )
}
