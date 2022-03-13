<template>
 <div>
   <Header />
     <div class="profil">
        <div class="page__profil">
           <div>
             <p class="utilisateur">{{ prenom }} {{ nom }}</p>
             <p class="admin" v-if="userId ==='1'">Administrateur</p>
           </div>
             <img :src="image" class="avatar__profil" alt="photo de profil">
             <label for="file" class="label__file">Modifier la photo de profil</label>
             <input type="file" accept="image/*" id="file" class="input__image" v-on:change="uploadImage">
            <form class="update">
             <ul>
              <li>
             <label class="update__prenom" for="prenom">Modifier le prénom</label>
             <input type="text" v-model="newPrenom">
              </li>
              <li>
             <label class="update__nom" for="nom">Modifier le nom</label>
             <input type="text" v-model="newNom">
              </li>
             </ul>
            </form>
             <button class="update__button" @click="updateUser()">Enregistrer les modifications</button>
             <p class="desactivate" @click="deleteUser()">Désactiver mon compte</p>
        </div>
     </div>     
 </div> 
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';

export default { 
    name: 'Profil',
    components: {
    Header
  },
  data () {
    return {
        prenom: '',
        nom: '',
        image: '',
        userId: localStorage.getItem('userId'),
        newPrenom: '',
        newNom: ''
    }
},

beforeMount () {
  if (!localStorage.getItem('userId')) {
    this.$router.push('/');
    }
},

mounted () {
     const id = localStorage.getItem('userId')
     axios.get(`http://localhost:3000/api/user/${id}`)
     .then((response) => {
       this.prenom = response.data.prenom
       this.nom = response.data.nom
       this.image = response.data.image  
 })
     .catch((error ) => {
      console.log(error);
    });
},

methods : {
    uploadImage(event) {
        const id = localStorage.getItem('userId')
        this.image = event.target.files[0];
        const fd = new FormData()
        fd.append('image', this.image)
        axios.put(`http://localhost:3000/api/user/${id}`, fd,{
           headers: {
           'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
         })
         .then((response) => {
           this.image = response.data.image
           window.location.reload();
        })
         .catch((error) => {
          console.log(error)
       });
    },

    updateUser() {
      const id = localStorage.getItem('userId')
      const fd = new FormData()
      fd.append('prenom', this.newPrenom)
      fd.append('nom', this.newNom)
      axios.put(`http://localhost:3000/api/user/${id}`, fd,{
         headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => {
          this.newPrenom = response.data.prenom
          this.newNom = response.data.nom
          window.location.reload();
        })
         .catch((error) => {
          console.log(error)
       });
    },
    
    deleteUser() {
      if (confirm('Voulez vous vraiment désactiver votre compte') == true) {
      const id = localStorage.getItem('userId')
      axios.delete(`http://localhost:3000/api/user/${id}`, {
        headers: {
           Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
       .then((response) => {
         console.log(response);
      })
      .catch((error) => {
          console.log(error)
       });
      localStorage.clear()
      alert('Votre compte a été désactivé');
      this.$router.push( '/')
    }   
  } 
 }
}
</script>


<style scoped lang="scss">
.profil {
    display: flex;
    justify-content: center;
} 

.page__profil {
    box-shadow: 5px 5px 10px #d4d4d4;
    border-radius: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;  
    @media screen and ( max-width: 550px ) {
    width: 80%;
    }
    .utilisateur {
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
    }
    .admin {
      text-align: center;
    }
}

.update {
  ul {
    list-style-type: none;
    @media screen and ( max-width: 710px ) {
    padding: 0;
    }
  }
  input {
    width: 150px;
    height: 20px;
    margin-bottom: 5px;
  }
  .update__prenom {
    margin: 5px;
  }
  .update__nom {
    margin: 16px;
  }
  @media screen and ( max-width: 710px ) {
    text-align: center;;
  }
}

.update__button {
  border-radius: 20px;
  border:none;
  width: 46%;
  padding: 15px;
  margin: 5px;
  box-shadow: 5px 5px 10px #d4d4d4;
  font-size: 14px;
  font-weight: bold;
  background-color: rgb(172, 208, 226);
}

.avatar__profil {
    margin: 10px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.label__file {
  cursor: pointer;
  padding: 10px;
  @media screen and ( max-width: 440px ) {
    text-align: center;
  }
  &:hover {
    color: rgb(172, 208, 226);
  }
}

.input__image {
    display: none;
 }

.desactivate {
  cursor: pointer;
  padding: 50px;
  @media screen and ( max-width: 560px ) {
    text-align: center;
  }
  &:hover {
    color: rgb(236, 181, 181);
  }
}  
</style>