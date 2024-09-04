import { Box, Stack, Button, styled, Input } from '@mui/material'


const avatarInput = document.getElementById("avatar");
avatarInput.addEventListener("change", handleAvatarChange);

function handleAvatarChange() {
  const file = avatarInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;
      myAvatar.innerHTML = `<img class="profileIgmAvatar" src="${imageSrc}" alt="Avatar">`;
      myAvatar.style.display = "flex";
      profile.style.display = "none";
      photoURL = imageSrc;
    };
    reader.readAsDataURL(file);
  }
}




export const Ubtada = () => {

  return(
    <div>
      
      <div class="profile">
         {/* <img src="./image/Quizito.jpeg" alt="" />  */}
      </div>
      <div class="isNoAvatar"></div>

      <form id="profileEditForm">
        <label for="avatar">Editar Avatar:</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onchange="handleAvatarChange()"
        />
        <button
          type="button"
          class="mybuttonAvatar"
          onclick="saveProfileChanges()"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}



<Stack
  sx={{
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'column',
  }}
>
  <h2>Minha Sacola de Compras</h2>
  
  {/* Renderiza o carrinho apenas se o modal não estiver aberto */}
  {!openModal && (
    <Stack
      sx={{
        width: '100%',
        margin: '10px',
        height: '71%',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '10px',
        overflowX: 'hidden',
      }}
    >
      {renderizarItensCarrinho()}
    </Stack>
  )}

  <Box
    sx={{
      width: '100%',
      position: 'sticky',
      bottom: '0',
      margin: '10px',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      bgcolor: '#fff',
      padding: '10px',
      zIndex: 10,
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography
      sx={{
        fontWeight: '700',
        fontSize: '1.4rem',
        color: 'var(--light-orange-color)',
      }}
    >
      Total: R${' '}
      {carinho
        .reduce((total, item) => total + item.price * item.quantidade, 0)
        .toFixed(2)
        .toLocaleString()}
    </Typography>

    <Button
      sx={{
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '1rem',
        fontWeight: '600',
        bgcolor: 'var(--green-color)',
        ':hover': {
          backgroundColor: 'var(--orange-color)',
        },
      }}
      onClick={handleOpenModal}
    >
      Finalizar Compra
    </Button>
  </Box>

  {/* Dialog de Confirmação de Entrega */}
  <Dialog
    open={openModal}
    onClose={handleCloseModal}
    fullWidth
    maxWidth="md"
    PaperProps={{
      sx: {
        zIndex: 1300,
      },
    }}
  >
    <DialogTitle>Confirmar Dados da Entrega</DialogTitle>
    <DialogContent>
      <SearchItem />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal} color="primary">
        Fechar
      </Button>
    </DialogActions>
  </Dialog>





// leticiajosealbino@gmail.com
// Leticia29

// felipemario@gmail.com
// agostinho@25


// anaclaudia@gmail.com
// AnaClaudia28

// biancamario29@gmail.com

// bianca25


// lisaniatharciso18@gmail.com
// 1983628lT


// marjory@gmai.com
// 1903647


// emerina@gmail.com
// ncvhsakid8



// andoni6743@uorak.com
// 1524380



// delicacy10@gmail.com
// delicaclly19


// quizitocritiano@10gmail.com
// Agostinho@10