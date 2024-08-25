

const { user, carinho } = useContext(AuthContext)
const location = useLocation()
const [avatarImage, setAvatarImage] = useState(
  localStorage.getItem('avatarImage') || null
)

const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        localStorage.setItem('avatarImage', reader.result)
        setAvatarImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveAvatar = async () => {
    if (avatarImage && user) {
      const db = getFirestore()
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, { avatar: avatarImage })
    }
    handleCloseMenu()
  }

  const getInitials = (name) => {
    if (!name) return ''
    const nameParts = name.split(' ')
    return nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '')
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