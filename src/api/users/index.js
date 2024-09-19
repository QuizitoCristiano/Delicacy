import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    getDoc,
    doc,
    getFirestore
  } from "firebase/firestore";
  import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import { db } from "../../../firebaseconfig/firebaseconfig";
  
  export const get_users = {
    user: {
      get: async (id) => {
        if (id) {
          const docSnap = await getDoc(doc(db, "users", id));
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such document!");
            return {};
          }
        }
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ ...doc.data(), id: doc.id });
        });
        return usersData;
      },
      post: async (payload) => {
        const { email, password, name, lastName } = payload;
        const auth = getAuth();
  
        try {
          // Cria o usuário no Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
  
          // Atualiza o perfil do usuário com o nome completo
          await updateProfile(user, { displayName: `${name} ${lastName}` });
  
          const firestore = getFirestore();
          const usersCollection = collection(firestore, "users");
  
          // Verifica se o email já está em uso
          const emailQuery = query(usersCollection, where("email", "==", email));
          const emailQuerySnapshot = await getDocs(emailQuery);
          if (!emailQuerySnapshot.empty) {
            alert("O email já está sendo usado por outro usuário.");
            return;
          }
  
          // Adiciona o usuário na coleção "users" do Firestore
          const userDocRef = await addDoc(usersCollection, {
            id: user.uid,
            email,
            password,
            name,
            lastName
          });
          console.log("Usuário criado com sucesso:", userDocRef.id);
          window.location.replace("/");
        } catch (error) {
          alert("Erro ao criar usuário e vincular perfil:", error);
        }
      },
      editPhoto: async (id, newUrl) => {
        if (!id || !newUrl) {
          console.log("ID ou nova URL não fornecidos.");
          return;
        }
        try {
          const userDocRef = doc(db, "users", id);
          await updateDoc(userDocRef, { photoUrl: newUrl });
          console.log("Foto atualizada com sucesso");
        } catch (error) {
          console.error("Erro ao atualizar a foto:", error);
          alert("Erro ao atualizar a foto.");
        }
      }
    }
  };
  