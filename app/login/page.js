'use client'
import React,{useEffect} from "react";
import { allContext } from "../layout";
import { useState, useRef } from "react";
import { logoicon, googleicon, facebookicon, crossicon, baseurl, projectid } from "../(navbar)/constant";
import { styled } from "@mui/material/styles";
import { useRouter } from 'next/navigation'
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function page() {
    const router = useRouter()
    const logininputemail = useRef();
    const logininputpassword = useRef();
    const signupinputname = useRef();
    const signupinputemail = useRef();
    const signupinputpassword = useRef();
    const [loginemailinput, setloginemailinput] = useState();
    const [loginpasswordinput, setloginpasswordinput] = useState();
    const [signupnameinput, setsignupnameinput] = useState();
    const [signupemailinput, setsignupemailinput] = useState();
    const [signuppasswordinput, setsignuppasswordinput] = useState();
    const { theme, settheme, logintoken, setlogintoken } = allContext();
    const [signup, setsignup] = useState(false);

    function emailcorrectsyntex() {
            return /^[^\s@]+@[^\s@]+\.(?:com)$/.test(loginemailinput);
    }

    function emailcorrectsyntexsignup() {
            return /^[^\s@]+@[^\s@]+\.(?:com)$/.test(signupemailinput);
    }

    function themechanger() {
        settheme(theme === "light" ? "dark" : "light")
        localStorage.setItem("theme",localStorage.getItem("theme")=="light"?"dark":"light");
    }

    function themecheck(val1, val2) {
        return theme === "light" ? val1 : val2
    }

    function onfocuslogininputdark(val) {
        val.style.outline = "0.2px solid #2e65ff";
        val.style.boxShadow = "0px 0px 18px 4px rgb(40,45,65)";
    }

    function onfocuslogininputlight(val) {
        val.style.outline = "0.2px solid #2e65ff";
        val.style.boxShadow = "0px 0px 3px 3px #2e66ff44";
    }

    function onblurlogininput(val) {
        val.style.outline = "0px";
        val.style.boxShadow = "none";
    }

    useEffect(()=>{
        if(!localStorage.getItem("theme")){
            localStorage.setItem("theme","light");
        }
    },[])
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
            width: 32,
            height: 32,
            "&::before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            borderRadius: 20 / 2,
        },
    }));

    async function fetchsignup(){
        try{
            const response=await( await fetch(`${baseurl}/user/signup`,
            {
                method: "POST",
                headers: {
                    'projectID': {projectid},
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: signupnameinput,
                    email: signupemailinput,
                    password: signuppasswordinput,
                    appType: 'quora'
                })

            })).json()
            if(response.status=="success"){
                localStorage.setItem("token",JSON.stringify(response.token));
                setlogintoken(response.token);
                localStorage.setItem("userdetails",JSON.stringify(response.data.user))
                router.push("/");
            }
            else if(response.status=="fail" && response.message=="User already exists"){
                alert(response.message);
                setsignupnameinput("");
                setsignupemailinput("");
                setsignuppasswordinput("");
            }
        }
        catch(error){
            alert(error);
        }
    }

    async function fetchlogin(){
        try{
            const response=await( await fetch(`${baseurl}/user/login`,
            {
                method: "POST",
                headers: {
                    'projectID': {projectid},
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginemailinput,
                    password: loginpasswordinput,
                    appType: 'quora'
                })

            })).json()
            if(response.status=="success"){
                localStorage.setItem("token",JSON.stringify(response.token));
                setlogintoken(response.token);
                localStorage.setItem("userdetails",JSON.stringify(response.data))
                router.push("/");

            }
            else if(response.status=="fail" && response.message=="Incorrect EmailId or Password"){
                alert(response.message);
                setloginemailinput("")
                setloginpasswordinput("")
            }
        }
        catch(error){
            alert(error);
        }
    }

    return (
        <div className="login_main_div">
            <div className={`login_card ${themecheck("bkwhite", "bklightblack")}`}>
                <div className="logincard_main">
                    <div className="logoiconouterdiv g20">
                        <div className="logoiconquora"> {logoicon}</div>
                        <div className={`${themecheck("txt5", "txt1")}`}>A place to share knowledge and better understand the world</div>
                    </div>
                    <div className={`logincenterdiv flex flexjsb`}>
                        <div className="logincenterleftdiv flexa flexc g20">
                            <p className={`fnt13 ${themecheck("txt4", "txt6")}`}>By continuing you indicate that you agree to <br /> Quora’s Terms of Service and Privacy Policy.</p>
                            <div className="flex flexc g10">
                                <div className={`onlinesignin flexa g10 ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("bkwhite", "bkblack")} ${themecheck("txt8", "txt7")}`}>{googleicon} <p className="fnt14">Continue with Google(coming soon)</p></div>
                                <div className={`onlinesignin flexa g10 ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("bkwhite", "bkblack")} ${themecheck("txt8", "txt7")}`}>{facebookicon} <p className="fnt14">Continue with Facebook(coming soon)</p></div>
                            </div>
                            <p className={`signupbutton flexja ${themecheck("txt5", "txt1")}`} onClick={() => { setsignup(true) }}>Sign up with email</p>
                            <div className={`flexja flexc ${themecheck("txt8", "txt7")}`}>
                                <p>{themecheck("LightMode", "DarkMode")}</p>
                                <FormControlLabel style={{ transform: "translate(13px)" }} control={<MaterialUISwitch sx={{ m: 1 }} checked={theme=="dark"} />} onChange={themechanger} checked={theme === "dark"} />
                            </div>
                        </div>
                        <p className={`${themecheck("brdrlightgray", "brdrllgray")}`}></p>
                        <div className="logincenterrightdiv flexa flexc g20 ml5">
                            <h3 className={` w90per w400 pb10 ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("txt8", "txt7")}`}>Login</h3>
                            <form className={`w100per ml20`} onSubmit={(e)=>{e.preventDefault(); fetchlogin()}}>
                            <div className={`w95per  flex flexc g20`}>
                                <div className={`w90per flex flexc g10`}>
                                    <h4 className={`${themecheck("txt8", "txt7")}`}>Email</h4>
                                    <input value={loginemailinput} onChange={(e) => { setloginemailinput(e.target.value)}} ref={logininputemail} onFocus={() => { theme == "dark" ? onfocuslogininputdark(logininputemail.current) : onfocuslogininputlight(logininputemail.current) }} onBlur={() => { onblurlogininput(logininputemail.current) }} className={`pl10 fnt16 ${themecheck("bkwhite", "bkblack")} ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("txt8", "txt7")} inputborderhover`} type="email" placeholder="Your email" />
                                </div>
                                <div className={`w90per flex flexc g10`}>
                                    <h4 className={`${themecheck("txt8", "txt7")}`}>Password</h4>
                                    <input value={loginpasswordinput} onChange={(e) => { setloginpasswordinput(e.target.value) }} ref={logininputpassword} onFocus={() => { theme == "dark" ? onfocuslogininputdark(logininputpassword.current) : onfocuslogininputlight(logininputpassword.current) }} onBlur={() => { onblurlogininput(logininputpassword.current) }} className={`pl10 fnt16 ${themecheck("bkwhite", "bkblack")} ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("txt8", "txt7")} inputborderhover`} type="password" placeholder="Your password" />
                                </div>
                            </div>
                            <button className={`dfnt16 mr30 bklightblue ${loginpasswordinput && emailcorrectsyntex() && loginpasswordinput.length >= 8 ? "bkblue" : ""} `} disabled={(loginpasswordinput) ? (!emailcorrectsyntex() && !loginpasswordinput.length >= 8) ? true : false : true}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`logincard_bottom w300 ${themecheck("bklightwhite txt4", "bkblack txt1")}`}>About.Careers.Privacy.Terms.Contact.Languages. Your Ad Choices.Press.© Quora, Inc. 2024</div>
            </div>
            
            {signup && <div className="blackscreen" onClick={() => { setsignup(false) }}></div>}
            {signup && <div className={`signupform p30 flex flexc g10 ${themecheck("bkwhite", "bklightblack")}`}>
                <div className={`crossiconsignuppage`} onClick={() => { setsignup(false) }}>{crossicon}</div>
                <h2 className={` w500 ${themecheck("txt8", "txt7")}`}>Sign up</h2>
                <form onSubmit={(e)=>{e.preventDefault(); fetchsignup()}}>
                <div className={`w100per  flex flexc g10`}>
                    <div className={`w100per flex flexc g10`}>
                        <h4 className={`${themecheck("txt8", "txt7")}`}>Name</h4>
                        <div>
                        <input value={signupnameinput} onChange={(e) => { setsignupnameinput(e.target.value)}} ref={signupinputname} onFocus={() => { theme == "dark" ? onfocuslogininputdark(signupinputname.current) : onfocuslogininputlight(signupinputname.current) }} onBlur={() => { onblurlogininput(signupinputname.current) }} className={`pl10 fnt16 ${themecheck("bkwhite", "bkblack")} ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("txt8", "txt7")} inputborderhover`} type="text" placeholder="What would you like to be called?" />
                        <p className={`${themecheck("txt8", "txt6")} error signupnameerror`}>Name must be min. 3 characters</p>
                        </div>
                    </div>
                    <div className={`w100per flex flexc g10`}>
                        <h4 className={`${themecheck("txt8", "txt7")}`}>Email</h4>
                        <div>
                        <input value={signupemailinput} onChange={(e) => { setsignupemailinput(e.target.value)}} ref={signupinputemail} onFocus={() => { theme == "dark" ? onfocuslogininputdark(signupinputemail.current) : onfocuslogininputlight(signupinputemail.current) }} onBlur={() => { onblurlogininput(signupinputemail.current) }} className={`pl10 fnt16 ${themecheck("bkwhite", "bkblack")} ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("txt8", "txt7")} inputborderhover`} type="email" placeholder="Your email" />
                        <p className={`${themecheck("txt8", "txt6")} error signupemailerror`}>Email must be in correct format</p>
                        </div>
                    </div>
                    <div className={`w100per flex flexc g10`}>
                        <h4 className={`${themecheck("txt8", "txt7")}`}>Password</h4>
                        <div>
                        <input value={signuppasswordinput} onChange={(e) => { setsignuppasswordinput(e.target.value) }} ref={signupinputpassword} onFocus={() => { theme == "dark" ? onfocuslogininputdark(signupinputpassword.current) : onfocuslogininputlight(signupinputpassword.current) }} onBlur={() => { onblurlogininput(signupinputpassword.current) }} className={`pl10 fnt16 ${themecheck("bkwhite", "bkblack")} ${themecheck("brdrlightgray", "brdrllgray")} ${themecheck("txt8", "txt7")} inputborderhover`} type="password" placeholder="Your password" />
                        <p className={`${themecheck("txt8", "txt6")} error signuppassworderror`}>Password must be min. 8 characters</p>
                        </div>
                    </div>
                </div>
                <button className={`fnt16 mr30 bklightblue ${signuppasswordinput && signupnameinput && emailcorrectsyntexsignup() && signuppasswordinput.length >= 8 && signupnameinput.length>2 ? "bkblue" : ""} `} disabled={(signuppasswordinput && signupnameinput) ? (!emailcorrectsyntexsignup() && !signuppasswordinput.length >= 8 && !signupnameinput.length>2) ? true : false : true} >Signup</button>
                </form>
            </div>
            }
        </div>
    )
}







