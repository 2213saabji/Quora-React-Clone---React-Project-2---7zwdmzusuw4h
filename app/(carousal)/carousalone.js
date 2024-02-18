import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Height } from '@mui/icons-material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-9435010515680227&output=html&h=250&slotname=OX_Quora_Catchall&adk=2743185049&adf=3493768507&pi=t.ma~as.OX_Quora_Catchall&w=300&lmt=1708178584&url=https%3A%2F%2Fwww.quora.com%2F&wgl=1&uach=WyJXaW5kb3dzIiwiMTUuMC4wIiwieDg2IiwiIiwiMTIxLjAuNjE2Ny4xODUiLG51bGwsMCxudWxsLCI2NCIsW1siTm90IEEoQnJhbmQiLCI5OS4wLjAuMCJdLFsiR29vZ2xlIENocm9tZSIsIjEyMS4wLjYxNjcuMTg1Il0sWyJDaHJvbWl1bSIsIjEyMS4wLjYxNjcuMTg1Il1dLDBd&dt=1708178583955&bpp=145&bdt=8&idt=219&shv=r20240214&mjsv=m202402120101&ptt=5&saldr=sd&cookie=ID%3D614f323a0f8863ad%3AT%3D1703671118%3ART%3D1708178556%3AS%3DALNI_MaQZzF0Z3uGKD1sfSuupSixgIwQqg&gpic=UID%3D00000cc6e400b082%3AT%3D1703671118%3ART%3D1708178556%3AS%3DALNI_Mb0A8LKwMcMvdJ_KNmlHfmBK08ZUQ&eo_id_str=ID%3Df0e7b30bbb9a60a3%3AT%3D1706630112%3ART%3D1708178556%3AS%3DAA-AfjaH2TaDay6uEW2zOx8rrJCZ&correlator=991168929762&frm=23&ife=4&pv=2&ga_vid=766792716.1707727448&ga_sid=1708178584&ga_hid=65452013&ga_fc=1&nhd=1&u_tz=330&u_his=2&u_h=864&u_w=1536&u_ah=816&u_aw=1536&u_cd=24&u_sd=1.25&dmc=8&adx=804&ady=75&biw=1165&bih=695&isw=300&ish=250&ifk=766442899&scr_x=0&scr_y=0&eid=44759875%2C44759926%2C44808397%2C31081141%2C31081186%2C95323739%2C95324581%2C95325068%2C31081168%2C95320870%2C95321866%2C95324154%2C95324161%2C95324435%2C21065725%2C31078663%2C31078665%2C31078668%2C31078670%2C31081168&oid=2&pvsid=19774760334091&tmod=123573810&uas=0&nvt=1&fc=640&brdim=0%2C0%2C0%2C0%2C1536%2C0%2C1536%2C816%2C300%2C250&vis=1&rsz=%7C%7CeE%7C&abl=CS&pfx=0&fu=4&bc=31&bz=1.3&td=1&psd=W251bGwsbnVsbCxudWxsLDNd&nt=1&ifi=1&uci=1.3hij5r17sl7r&fsb=1&dtd=229',
  },
  {
    label: 'Bird',
    imgPath:
      'https://s0.2mdn.net/sadbundle/12492554015069590311/index.html?ev=01_250',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://cdn.flashtalking.com/183076/4450520/FY23Q4_CC_Individual_CCIAllApps_xy_en_ECGenFilV2_ST_300x250.jpg?184889395',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://s0.2mdn.net/simgad/10511041011593118159',
  },
  
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 300, maxHeight:280,marginLeft:1, flexGrow: 1 }}>
      
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <iframe
                component="img"
                style={{width:"100%",maxWidth:"300px",height:"300px",overflow:"hidden"}}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      
    </Box>
  );
}

export default SwipeableTextMobileStepper;