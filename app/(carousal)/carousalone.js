import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://cdn.flashtalking.com/xre/588/5887012/4413971/image/4413971.gif?568302313',
  },
  {
    label: 'Bird',
    imgPath:
      'https://cdn.flashtalking.com/183076/4533783/FY23Q4_CC_Student_CCIAllApps_sea_en_PsGenAI_ST_300x250.jpg?233279719',
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
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 300,
                  overflow: 'hidden',
                  width: '100%',
                }}
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