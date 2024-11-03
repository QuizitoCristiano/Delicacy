import { Stack, Box } from '@mui/material'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Frutasft from '../imgLogomarca/NweImagfrutasft.png'
import Frutas from '../imgLogomarca/frutas1pr.png'
import Frotas43 from '../imgLogomarca/NweImagfrutasft.png'
import Newdellicasse from '../imgLogomarca/fruta233.jpg'
import { MyEmptyCrad } from './empty/emptyCrad'

// Array com as informações do carrossel
const ArrowImgs = [
  {
    img: Frutasft,
    labelText: 'First slide label 1',
    description: 'First slide content',
  },
  {
    img: Frutas,
    labelText: 'Second slide label 2',
    description: 'Second slide content',
  },
  {
    img: Frotas43,
    labelText: 'Third slide label 3',
    description: 'Third slide content',
  },
  {
    img: Newdellicasse,
    labelText: 'Fourth slide label 4',
    description: 'Fourth slide content',
  },
]

export const MainFolder = () => {
  return (
    <Stack
      sx={{
        top: '1em',
        width: '100%',
        transition:' all 0.3s ease',

        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '10px',
        bgcolor: '#FFFF',
        // bgcolor: 'red',
        '@media (max-width: 768px)': { height: 'auto', top: '1rem', },
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: '940px',
          alignItems: 'center',
          justifyContent: 'center',
          // bgcolor: 'purple',
          position: 'relative',
          '@media (max-width: 768px)': { height: '490px' },
        }}
      >
        <Box
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
          data-bs-wrap="true"
          sx={{
            height: '70%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',

            '@media (max-width: 768px)': { height: '490px' },
          }}
        >
          <Box className="carousel-indicators">
            {ArrowImgs.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </Box>

          <div
            className="carousel-inner"
            style={{ height: '100%', width: '100%' }}
          >
            {ArrowImgs.map(({ img, labelText, description }, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                data-bs-interval="3000"
                style={{
                  height: '100%',
                  position: 'relative',
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    maxHeight: '100%',
                    objectFit: 'contain',
                    '@media (max-width: 768px)': {
                      maxWidth: '989px',
                      maxHeight: '100%',
                    },
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{labelText}</h5>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'transparent',
            }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'transparent',
            }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </Box>
      </Stack>

      <Stack
        sx={{
          width: '100%',
          height: 'auto',
          // backgroundColor: 'green',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '50px',
            // backgroundColor: 'blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Box>
        <MyEmptyCrad />
      </Stack>
    </Stack>
  )
}
