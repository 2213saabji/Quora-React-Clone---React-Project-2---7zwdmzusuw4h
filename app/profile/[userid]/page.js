'use client'
import "../../(styles)/user.css"
import { baseurl, calendericon, designationicon, educationicon, followicon, followingicon, locationicon, messageicon, months } from "@/app/(navbar)/constant";
import { allContext } from "@/app/layout";
import { useEffect, useMemo, useState } from "react";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Work Experience', 'Education', 'Skills', "Address"];

export default function YourComponent(props) {
  const { blackscreen2, setblackscreen2 } = allContext();
  const { themecheck } = allContext();
  const [data, setdata] = useState();
  const [userfound, setuserfound] = useState(true);
  const [following, setfollowing] = useState(false);
  const [moredetails, setmoredetails] = useState(false)
  const [blackscreen3, setblackscreen3] = useState(false);


  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ?
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };








  const fetchdata = useMemo(async () => {
    try {
      const response = await (await fetch(`${baseurl}/quora/user/${props.params.userid}`,
        {
          method: "GET",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }
      )).json();
      setdata(response.data)
      if (response.status == "success") {
        setuserfound(true)
        if (response.data.isFollowed == true) {
          setfollowing(true);
        }
      }
      else {
        setuserfound(false)
      }
    } catch (error) {
      alert(error);
    }
  }, [])
  useEffect(() => {
    fetchdata;
  }, [])

  const postfollow = async (userid) => {
    try {
      const response = await (await fetch(`${baseurl}/quora/follow/${userid}`,
        {
          method: "POST",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }
      )).json();
      setfollowing(true);
    } catch (error) {
      alert(error);
    }
  }
  const postunfollow = async (userid) => {
    try {
      const response = await (await fetch(`${baseurl}/quora/follow/${userid}`,
        {
          method: "DELETE",
          headers: {
            projectID: "7zwdmzusuw4h",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        }
      )).json();
      setfollowing(false);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className='usermaindiv flexja w100per'>
      {userfound && data &&
        <>
          <div className={`userpageleft p20`}>
            <div className={`flex`}>
              <img className={`userPageProfileImg brdr-r-per mr20`} src={data.profileImage} alt="profileimg" />
              <div className={`pt20 pb5 flexc flexjsb flex`}>
                <div>
                  <h1 className={`${themecheck("txt8", "txt7")}`}>{data.name}</h1>
                  <p className={` fnt12 ${themecheck("txt4", "txt1")}`}>({data.email})</p>
                </div>
                <div className={`followbuttondiv flex g20`}>
                  <button onClick={() => { following ? postunfollow(data._id) : postfollow(data._id) }} className={`w600 pl20 pr20 pt5 pb5 brdr2 brdr-r50 flexa brdrpureblue fnt15   ${following ? "txtblue" : "txt7"} ${following ? "bktransparent" : "bkpureblue"}`}>
                    {following ? followingicon : followicon}&nbsp; {following ? `Following` : `Follow`}
                  </button>
                  <button className={`askbuttonuser w600 pl10 pr10 brdr2 brdr-r50 flexa fnt14 bktransparent flexa g5 ${themecheck("brdrlgray", "brdrllgray")} ${themecheck("txt5", "txt1")} `}>
                    <div className={`iscale08`}>{messageicon}</div><p> Ask</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`userpageright`}>
            <div className={`brdrb1 pb10 pt20 pl5 pr5 flexa flexjsb ${themecheck("brdrlgray", "brdrllgray")}`}><h3 className={`txtrpnone w400 ${themecheck("txt8", "txt7")}`}>Credentials & highlights</h3><p className={`csrpntr ${themecheck("txt5", "txt1")}`} onClick={() => { setmoredetails(true), setblackscreen3(true) }}>More</p></div>
            {data.workExperience[0].designation && <div className={`flexa mt20`}><div className={`iscale08 brdr-r50 pt5 pl5 pr5 ${themecheck("bklightgray", "bkllgray")}`}>{designationicon}</div><p className={`ml10 fnt14 ${themecheck("txt5", "txt1")}`}>{data.workExperience[0].designation}</p></div>}
            {data.education[0].degree && <div className={`flexa mt5`}><div className={`iscale08 brdr-r50 pt5 pl5 pr5 ${themecheck("bklightgray", "bkllgray")}`}>{educationicon}</div><p className={`ml10 fnt14 ${themecheck("txt5", "txt1")}`}>{data.education[0].degree}</p></div>}
            {data.address[0].country && data.address[0].state && <div className={`flexa mt5`}><div className={`iscale08 brdr-r50 pt5 pl5 pr5 ${themecheck("bklightgray", "bkllgray")}`}>{locationicon}</div><p className={`ml10 fnt14 ${themecheck("txt5", "txt1")}`}>Live in {data.address[0].state}, {data.address[0].country}</p></div>}
            {data.createdAt && <div className={`flexa mt5`}><div className={`iscale08 brdr-r50 pt5 pl5 pr5 ${themecheck("bklightgray", "bkllgray")}`}>{calendericon}</div><p className={`ml10 fnt14 ${themecheck("txt5", "txt1")}`}>Joined {months[parseInt(data.createdAt[5] == 1 ? 10 : 0) + parseInt(data.createdAt[6])]} {data.createdAt[0]}{data.createdAt[1]}{data.createdAt[2]}{data.createdAt[3]}</p></div>}
          </div>
        </>
      }
      {blackscreen3 && <div className={`blackscreen3`} onClick={() => { setblackscreen3(false); setmoredetails(false) }}></div>}
      {data && 
      <div className={`moredetialspop brdr-r20 p20 flex flexc ${moredetails ? "zoomin" : "zoomout"} ${themecheck("bkwhite", "bklightblack")} `}>
        <Box sx={{ width: '100%', position: "relative" }}>
          <Stepper nonLinear activeStep={activeStep} sx={{ fontSize: "10px", marginTop: 1, width: "100%", position: "absolute", top: "0", left: "0" }}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]} sx={{ width: "100%" }}>
                <StepButton color="inherit" onClick={handleStep(index)} className={`stepBtnMoreDetials`}>
                  <div className={`${themecheck("txt5", "txt1")}`}>{label}</div>
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <React.Fragment>
              <Typography sx={{ mt: 10, mb: 1, py: 1 }}>
                {activeStep == 0 && <div className={`ml30`}>
                  <h1 className={`${themecheck("txt5", "txt1")}`}>Work Experience</h1>
                  <div className={`ml30 mt30 moredetailstxtupperdiv flex flexc g5`}>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Designation:</h3><p className={`fnt13`}>{data.workExperience[0].designation}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Company Name:</h3><p className={`fnt13`}>{data.workExperience[0].companyName}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Location:</h3><p className={`fnt13`}>{data.workExperience[0].location}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Description:</h3><p className={`fnt13`}>{data.workExperience[0].description}</p></div>
                  </div>
                </div>}
                {activeStep == 1 && <div className={`ml30`}>
                  <h1 className={`${themecheck("txt5", "txt1")}`}>Education</h1>
                  <div className={`ml30 mt30 moredetailstxtupperdiv flex flexc g5`}>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>School Name:</h3><p className={`fnt13`}>{data.education[0].schoolName}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Degree:</h3><p className={`fnt13`}>{data.education[0].degree}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Description:</h3><p className={`fnt13`}>{data.education[0].description}</p></div>
                  </div>
                </div>}
                {activeStep == 2 && <div className={`ml30`}>
                  <h1 className={`${themecheck("txt5", "txt1")}`}>Skills</h1>
                  <div className={`ml30 mt30 moredetailstxtupperdiv flex flexc g5`}>
                    {data.skills.map((item) => (<h3 className={`${themecheck("txt5", "txt1")}`}>{item}</h3>))}

                  </div>
                </div>}
                {activeStep == 3 && <div className={`ml30`}>
                  <h1 className={`${themecheck("txt5", "txt1")}`}>Address</h1>
                  <div className={`ml30 mt30 moredetailstxtupperdiv flex flexc g5`}>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Street:</h3><p className={`fnt13`}>{data.address[0].street}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>City:</h3><p className={`fnt13`}>{data.address[0].city}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Country:</h3><p className={`fnt13`}>{data.address[0].country}</p></div>
                    <div className={`flex g20 ${themecheck("txt5", "txt1")}`}><h3>Zip Code:</h3><p className={`fnt13`}>{data.address[0].zipCode}</p></div>
                  </div>
                </div>}

              </Typography>

            </React.Fragment>
          </div>
        </Box>
      </div>
}
      {!userfound && <div className={`errormessage`}></div>}
    </div>


  )
}
