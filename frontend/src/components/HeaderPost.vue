<template>
 <header class='header__post'> 
    <img @click="accueil()" src='../assets/logo-copy.png' class='header__logo' alt='logo Groupomania'>
    <nav>
      <div class="image__profil">
       <img @click="profil()" src="../assets/icon-avatar.png" class='avatar' alt="photo de profil">
      </div>
      <div class="image__deconnexion">
       <img @click="logout()" src="../assets/icon-deconnexion.png" class='deconnexion' alt='icone deconnexion'>
      </div>
    </nav>
  </header>
</template>

<script>

export default {
    name: 'HeaderPost',
    methods: {
        logout() {
           // this.$store.commit('logout')
            this.$router.push('/');
        },
        profil() {
            this.$router.push('/profil');
        },
        accueil() {
            this.$router.push('/post');
        }
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
    width: 60px;
    height: 60px;
    object-fit: cover;
}

.deconnexion {
    height: 60px;
    padding: -20px;
}
</style>