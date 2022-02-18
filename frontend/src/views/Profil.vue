<template>
 <div>
    <HeaderPost/>
     <div class='profil'>
        <div class='page__profil'>
            <img src='../assets/icon-avatar.png' class='avatar__profil' alt='photo de profil'>
          <div>
            <p>Modifier la photo</p>
           </div>
           <div>
            <p>{{ this.user.prenom }}</p>
            </div>
            <div>Dernières publications</div>
            <div>Modifier mon mot de passe</div>
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
      user: '',
    }
 },
  methods: {
    getUser() {
      axios
      .get(`http://localhost:3000/api/user/${this.userId}`,  {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((response) => {
          this.user = response.data[0];
      })
      .catch((error) => {
          console.log(error)
      });
  },

    deleteUser() {
      axios
      .delete(`http://localhost:3000/api/user/${this.userId}`)
      .then(() => {
        localStorage.removeItem('userId');
        alert('Votre compte a été désactivé');
          this.$router.replace('/');
        });
    },
  }
}
</script>


<style scoped lang="scss">

.profil {
    display: flex;
    justify-content: center;
}  

.desactivate {
  cursor: pointer;
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
    }
}
</style>