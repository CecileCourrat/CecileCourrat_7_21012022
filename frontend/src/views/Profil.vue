<template>
 <div>
   <Header />
     <div class="profil">
        <div class="page__profil">
           <div>
             <p class="utilisateur">{{ prenom }} {{ nom }}</p>
             <p class="admin" v-if="userId ==='8'">Administrateur</p>
           </div>
             <img :src="image" class="avatar__profil" alt="photo de profil">
             <label for="file" class="label__file">Modifier la photo de profil</label>
             <input type="file" accept="image/*" id="file" class="input__image" v-on:change="uploadImage">
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