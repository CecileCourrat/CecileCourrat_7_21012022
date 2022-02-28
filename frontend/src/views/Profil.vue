<template>
 <div>
    <HeaderPost/>
     <div class="profil">
        <div class="page__profil">
           <div>
            <p class="utilisateur">{{ prenom }} {{ nom }}</p>
            </div>
            <img  src="../assets/icon-avatar.png" class="avatar__profil" alt="photo de profil">
            <p>Modifier la photo de profil</p>
            <input type="file" accept="image/*"  id="image" class="input__image">
            <button @click="uploadImage($event)" class="modif__photo">Modifier la photo</button>
            <p class="desactivate" @click="deleteUser()">Désactiver mon compte</p>
        </div>
      </div>     
 </div> 
</template>

<script>
import axios from 'axios';
import HeaderPost from '../components/HeaderPost.vue';


export default { 
    name: 'Profil',
    components: {
    HeaderPost,
  },
  data () {
    return {
        prenom: '',
        nom: '',
        image: ''
    }
 },
mounted () {
     const id = localStorage.getItem('userId')
     axios
     .get(`http://localhost:3000/api/user/${id}`)
     .then((response) => {
       this.prenom = response.data.prenom
       this.nom = response.data.nom
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
        fd.append('image', this.image);
        axios.
        put(`http://localhost:3000/api/user/${id}`, fd,{
           headers: {
           'Content-Type': 'multipart/form-data',
             Authorization: 'Bearer ' + localStorage.getItem('token')
          }
         })
         .then((response) => {
           console.log(response);
        })
          .catch((error) => {
           console.log(error)
       });
       },
     deleteUser() {
      const id = localStorage.getItem('userId')
     axios
      .delete(`http://localhost:3000/api/user/${id}`, {
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



</script>


<style scoped lang="scss">
.profil {
    display: flex;
    justify-content: center;
    button {
      border-radius: 20px;
      height: 40px;
      border: none;
      box-shadow: 5px 5px 10px #d4d4d4;
    }
} 

.utilisateur {
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
}

#image {
  padding: 5px;
}

.desactivate {
  cursor: pointer;
  padding: 50px;
}

.page__profil {
    box-shadow: 5px 5px 10px #d4d4d4;
    border-radius: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;  
    .avatar__profil {
      margin: 10px;
      border-radius: 50%;
      width: 90px;
      height: 90px;
      object-fit: cover;
    }
}
</style>