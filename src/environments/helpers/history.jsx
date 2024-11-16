import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Stack, Typography, Box } from '@mui/material'
import { ContainerCarousel } from './sagas'
import { MyFooter } from '../../componets/footer/Footer'

import Azeitona from '../../images/Azeitona.png'
import morangos from '../../images/morangos.png'
import Ervilha from '../../img/Ervilha.png'
import abacate from '../../images/Ameixa.png'

const ArrayWImags = [
  {
    img: Azeitona,
    labelText: 'Frutas doces e legumes fresquinhos te esperam!',
    description: 'Não deixe para depois, garanta já o seu bedido no Delicacy',
  },
  {
    img: morangos,
    labelText: 'Não perca essa oportunidade',
    description: 'Frutas e legumes de qualidade estão a apenas um clique de você.',
  },
  {
    img: Ervilha,
    labelText: 'Promoção imperdível no Delicacy! Venha conferir',
    description: 'E leve frescor e saúde para o seu lar',
  },
  {
    img: abacate,
    labelText: 'Quer frutas frescas e legumes de qualidade ?',
    description: 'É fácil, rápido tudo por aqui no Delicacy!',
  },
]

const ArryHistory = [
  {
    description: `Bem-vindo(a) ao Delicacy - onde a delicadeza encontra a 
    conveniência. Somos uma equipe dedicada e apaixonada em fornecer 
    uma solução de compras online acessível para todos, especialmente 
    para aqueles que podem achar difícil ou impossível ir às compras 
    pessoalmente.
    `,
    descriptionText: `Nosso objetivo é simples: queremos tornar a compra de 
    frutas e legumes uma experiência fácil, conveniente e agradável para 
    pessoas de todas as idades. Reconhecemos que muitos idosos e idosas,
     assim como pessoas com mobilidade limitada, podem enfrentar desafios 
     ao fazer suas compras diárias. É por isso que nos esforçamos para oferecer 
     um serviço que atenda às suas necessidades específicas.
    `,
    myText: `
    No Delicacy, acreditamos na importância de fornecer
     produtos frescos e de alta qualidade diretamente para a sua porta. 
     Trabalhamos em estreita colaboração com produtores locais e fornecedores 
     confiáveis para garantir que você receba os melhores produtos sempre que fizer
      um pedido conosco.

    `,
    mytitle: `Além disso, nossa plataforma foi projetada para ser fácil 
    de usar para pessoas de todas as idades. Quer você seja um jovem navegando na web 
    pela primeira vez ou uma pessoa mais experiente em tecnologia, estamos aqui
     para garantir que sua experiência de compra seja simples e sem complicações.
    `,
    mytitle2: `
    Ao escolher o Delicacy, você não está apenas fazendo uma compra - você
     está se tornando parte de uma comunidade que se preocupa com o bem-estar
      de todos os seus membros. Estamos comprometidos em fornecer um serviço 
      excepcional e em ajudar a melhorar a vida de nossos clientes, um pedido 
      de cada vez.

    `,

    myNewdescription: `
        Obrigado por nos escolher como seu destino de compras online. Juntos, 
        podemos tornar o ato de comprar frutas e legumes uma experiência 
        verdadeiramente delicada.

        Se tiver alguma dúvida ou precisar de assistência, não hesite em 
        entrar em contato conosco. Estamos sempre aqui para ajudar.
`,
  },
]


export const HomePage = () => {
  return (
    <>
      <Stack
        sx={{
          top: '1rem',
          width: '100%',
          transition: 'all 0.3s ease',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '10px',
          bgcolor: '#fff',
          '@media (max-width: 768px)': {
            height: 'auto',
            top: '1rem',
            padding: '10px 5px',
          },
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
              {ArrayWImags.map((_, index) => (
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
              {ArrayWImags.map(({ img, labelText, description }, index) => (
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
                  <div style={{
                       color: '#000',
                       fontSize: '1.4rem',
                       fontWeight: 'bold'
                    }} className="carousel-caption d-none d-md-block">
                    <h5 style={{
                       color: '#000',
                       fontSize: '1.4rem',
                       fontWeight: 'bold'
                    }}>{labelText}</h5>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                maxWidth: '1200px',
                width: '100%',
                fontWeight: '7000',
                padding: '10px 20px',
                color: '#f75f1d',
              }}
            >
              <h2>Quem somos e por que os clientes nos amam</h2>
            </Box>
          </Box>

          <Stack
            sx={{
              display: 'flex',
              maxWidth: '1290px',
              marginLeft: 'auto',
              marginRight: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              padding: '20px 20px',
              '@media (max-width: 768px)': {
                height: 'auto',
                top: '1rem',
              
                width: '100%',
                padding: '0px 0px',
              },
            }}
          >
            {ArryHistory.map((item, index) => (
              <Stack key={index}>
                <ContainerCarousel.wrapper>
                  {item.description}
                </ContainerCarousel.wrapper>
                <ContainerCarousel.wrapper>

                  {item.descriptionText}
                </ContainerCarousel.wrapper>
                <ContainerCarousel.wrapper>
                  {item.myText}
                </ContainerCarousel.wrapper>
                <ContainerCarousel.wrapper>
                  {item.mytitle}
                </ContainerCarousel.wrapper>
                <ContainerCarousel.wrapper>
                  {item.mytitle2}
                </ContainerCarousel.wrapper>

                <ContainerCarousel.wrapper>
                  {item.myNewdescription}
                </ContainerCarousel.wrapper>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <MyFooter />
    </>
  )
}
