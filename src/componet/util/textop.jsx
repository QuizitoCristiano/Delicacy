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