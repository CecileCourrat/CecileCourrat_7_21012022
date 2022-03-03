<template>
 <header class="header__post"> 
    <router-link to="/post"><img src="../assets/logo-copy.png" class="header__logo" alt="logo Groupomania"></router-link>
    <nav>
      <div class="image__profil">
       <router-link to="/profil"><img :src="image" class="avatar" alt="photo de profil"></router-link>
      </div>
      <div class="image__deconnexion">
        <router-link to="/"><img src="../assets/icon-deconnexion.png" class="deconnexion" alt="icone deconnexion"></router-link>
      </div>
    </nav>
  </header>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Header',
    data () {
    return {
        image: '',
    }
 },
 mounted()  {
     const id = localStorage.getItem('userId')
     axios
     .get(`http://localhost:3000/api/user/${id}`)
     .then((response) => {
       this.image = response.data.image    
 })
      .catch((error ) => {
          console.log(error);
     });
 }
}
</script>


<style scoped lang='scss'>

.header__post {
    display: flex;
    justify-content: space-around;
    .header__logo {
        width: 220px;
        
    }
    nav {
        display: flex;
        align-items: center;
    }
}

.image__profil {
    height: 60px; 
    width: 60px;
    margin: 15px;
}

.avatar {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
}

.deconnexion {
    height: 63px;
    padding: -20px;
}
</style>