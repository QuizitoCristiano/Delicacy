import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Carousel } from 'react-bootstrap'
import { Stack, Typography, Box } from '@mui/material'
import { ContainerCarousel } from './sagas'
import { MyFooter } from '../../componets/footer/Footer'

import Azeitona from '../../images/Azeitona.png'
import morangos from '../../images/morangos.png'
import Ervilha from '../../img/Ervilha.png'
import abacate from '../../images/Ameixa.png'

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
  const controlsMyArray = ArryHistory.map((Item, index) => (
    <Stack key={index}>
      <ContainerCarousel.wrapper>{Item.description}</ContainerCarousel.wrapper>
      <ContainerCarousel.wrapper>
        {Item.descriptionText}
      </ContainerCarousel.wrapper>
      <ContainerCarousel.wrapper>{Item.myText}</ContainerCarousel.wrapper>
      <ContainerCarousel.wrapper>{Item.mytitle}</ContainerCarousel.wrapper>
      <ContainerCarousel.wrapper>{Item.mytitle2}</ContainerCarousel.wrapper>

      <ContainerCarousel.wrapper>
        {Item.myNewdescription}
      </ContainerCarousel.wrapper>
    </Stack>
  ))

  return (
    <>
      <ContainerCarousel.containerBody>
        <Carousel
          style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',

            '@media (min-width:800px)': {
              height: '390px',
              width: '100%',
            },
          }}
          controls
        >
          <Carousel.Item
            style={{
              width: '100%',
              height: '100%',
              background: '#fff',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
              }}
              className="d-block w-100"
              src={abacate}
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item
            style={{
              width: '100%',
              height: '100%',
              background: '#fff',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
              }}
              className="d-block w-100"
              src={Azeitona}
              alt="Second slide"
            />

            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>

          <Carousel.Item
            style={{
              width: '100%',
              height: '100%',
              background: '#fff',
            }}
          >
            <img
              style={{
                width: '80%',
                height: '80%',
              }}
              className="d-block w-100"
              src={Ervilha}
              alt="Second slide"
            />

            {/* <Carousel.Caption
              style={{
                color: 'black',
              }}
            >
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
          </Carousel.Item>

          <Carousel.Item
            style={{
              width: '100%',
              height: '100%',
              background: '#fff',

              '@media only screen and (max-width: 800px)': {
                width: '97%',
                height: '290px',
                background: 'red',
              },
            }}
          >
            <img
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '390px',
              objectFit: 'cover',
            }}
            className="d-block w-100"
            src={abacate}
            alt="Abacate"
            />

            
          </Carousel.Item>
        </Carousel>

        <ContainerCarousel.content>
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

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {controlsMyArray}
          </Box>
        </ContainerCarousel.content>
      </ContainerCarousel.containerBody>
      <MyFooter />
    </>
  )
}
