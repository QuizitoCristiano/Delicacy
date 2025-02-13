import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  getFirestore,
  updateDoc
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../../../firebaseconfig/firebaseconfig";

export const get_users = {
  user: {
      get: async (id) => {
          if (id) {
              const docSnap = await getDoc(doc(db, "useresCompany", id));
              if (docSnap.exists()) {
                  return docSnap.data();
              } else {
                  console.log("No such document!");
                  return {};
              }
          }
          const querySnapshot = await getDocs(collection(db, "useresCompany"));
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
              const firestore = getFirestore();
              const usersCollection = collection(firestore, "useresCompany");

              // Verifica se o email já está em uso
              const emailQuery = query(usersCollection, where("email", "==", email));
              const emailQuerySnapshot = await getDocs(emailQuery);
              if (!emailQuerySnapshot.empty) {
                  alert("O email já está sendo usado por outro usuário.");
                  return;
              }

              // Cria o usuário no Firebase Authentication
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;

              // Atualiza o perfil do usuário com o nome completo
              await updateProfile(user, { displayName: `${name} ${lastName}` });

              // Adiciona o usuário na coleção "useresCompany" do Firestore
              const userDocRef = await addDoc(usersCollection, {
                  id: user.uid,
                  email,
                  name,
                  lastName,
                  // Não armazene a senha por motivos de segurança
              });
              console.log("Usuário criado com sucesso:", userDocRef.id);
              window.location.replace("/");
          } catch (error) {
              console.error(" e vincular perfil:", error);
              alert("Erro ao criar usuário: " + error.message); // Mensagem de erro mais informativa
          }
      },

      editPhoto: async (id, newUrl) => {
          if (!id || !newUrl) {
              console.log("ID ou nova URL não fornecidos.");
              return;
          }
          try {
              const userDocRef = doc(db, "useresCompany", id);
              await updateDoc(userDocRef, { photoUrl: newUrl });
              console.log("Foto atualizada com sucesso");
          } catch (error) {
              console.error("Erro ao atualizar a foto:", error);
              alert("Erro ao atualizar a foto.");
          }
      }
  }
};



// delicacy10@gmail.com
// Dellicacy362@
// muffato@gmail.com
// Muffato275@
// kizitocristiano@gmail.com
