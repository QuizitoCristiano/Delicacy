// import React from 'react'
// import { Typography, Stack, Box } from '@mui/material'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// import manga from '../../images/manga.jpg'
// import morango from '../../images/morango.jpg'
// import Uva1 from '../../images/Uva1.png'
// import abacate from '../../images/abacate.jpg'
// import papaia from '../../images/papaia.png'

// const categoryData = [
//   {
//     nome: 'Abacate e Manga',
//     descricao: '22 Item',
//     img: manga,
//     backgroundColor: '#fef4ea',
//   },
//   {
//     nome: 'Morango',
//     descricao: '19 Item',
//     img: morango,
//     backgroundColor: '#e9f4e3',
//   },
//   {
//     nome: 'Uva',
//     descricao: '13 Item',
//     img: Uva1,
//     backgroundColor: '#faeaea',
//   },
//   {
//     nome: 'Abacate',
//     descricao: '9 Item',
//     img: abacate,
//     backgroundColor: '#eeeef9',
//   },
//   {
//     nome: 'Mamão ou Papaia',
//     descricao: '22 Item',
//     img: papaia,
//     backgroundColor: '#f7f6d7',
//   },
// ]

// export const Category = () => {
//   return (
//     <Stack
//       sx={{
//         width: '100%',
//         padding: '3rem',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//       }}
//     >
//       <Stack
//         sx={{
//           '& h1 ': {
//             fontSize: '2.5rem',
//             color: 'var(--text-color)',
//             fontWeight: 600,
//             letterSpacing: '-0.015em',
//           },

//           '& span': {
//             fontSize: '2rem',
//             color: '#3cb815',
//             fontWeight: 800,
//             letterSpacing: '-0.01em',
//           },

//           '& a': {
//             textDecoration: 'none',
//             color: '#fff',
//             fontSize: '1.4rem',
//             fontWeight: 600,
//             letterSpacing: '-0.01em',
//             marginTop: '2rem',
//             '&:hover': {
//               color: 'var(--light-orange-color)',
//               transition: '0.4s all linear',
//             },
//           },

//           '@media only screen and (max-width: 355px)': {
//             '& h1 ': {
//               fontSize: '1.5rem',
//               color: 'var(--text-color)',
//               fontWeight: 600,
//               letterSpacing: '-0.015em',
//             },
//           },
//         }}
//       >
//         <h1>
//           Explorando a Diversidade da Natureza <br />
//           <span>Frutas</span>
//         </h1>
//         <a href="#" className="btnMyButton">
//           Ver tudo <ArrowForwardIcon className="bx" />
//         </a>
//       </Stack>

//       <Stack
//         sx={{
//           display: 'grid',
//           bgcolor: 'Highlight',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gridTemplateColumns: 'repeat(5, 1fr)', // 5 itens por linha em telas grandes
//           gap: '1rem',
//           marginTop: '2rem',
//           '@media (max-width: 900px)': {
//             gridTemplateColumns: 'repeat(3, 1fr)', // 3 itens por linha em telas médias
//           },
//           '@media (max-width: 500px)': {
//             gridTemplateColumns: 'repeat(2, 1fr)', // 2 itens por linha em telas pequenas
//           },
//         }}
//       >
//         {categoryData.map((item, index) => (
//           <Box
//             key={index}
//             sx={{
//               backgroundColor: item.backgroundColor,
//               borderRadius: '0.5rem',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
            
//               // bgcolor: 'red',
//               height: '159px',
//               width: '190px',
//               padding: '1rem',
              
//               '& .textName': {
//                 fontSize: '0.75rem', // Reduzi o tamanho do texto
//                 fontWeight: 500,
//                 marginTop: '0.5rem',
//                 textAlign: 'center',
//               },
//               '@media (max-width: 930px)': {
//                 width: '165px', 
//               },
//               '@media (max-width: 830px)': {
//                 width: '245px', 
//               },
//               '@media (max-width: 769px)': {
//                 width: '225px', 
//               },
             
//               '@media (max-width: 500px)': {
//                 width: '175px', 
//               },
//               '@media (max-width: 360px)': {
               
//                 width: '156px', 
//               },
//             }}
//           >
//             <img style={{
              
//                 width: '90%',
//                 height: '90px',
//                 objectFit: 'contain',
              
//             }} src={item.img} alt={`Imagem de ${item.nome}`} />
//             <Typography
//               sx={{
//                 fontWeight: '900',
//                 fontSize: '1.2rem', // Reduzi o tamanho do texto
//                 color: 'var(--text-color)',
//               }}
//             >
//               {item.nome}
//             </Typography>
//             <ArrowForwardIcon
//               sx={{
//                 color: 'var(--bg-color)',
//                 fontSize: '1.5rem',
//                 marginTop: '0.5rem',
//                 display: 'none',
//                 '&:hover': {
//                   display: 'block',
//                 },
//               }}
//             />
//           </Box>
//         ))}
//       </Stack>
//     </Stack>
//   )
// }
