<template>
 <header class='header__post'> 
    <img src='../assets/logo copy.png' class='header__logo' alt='logo Groupomania'>
   <nav>
    <img src='../assets/icon-avatar.png' class='avatar' alt='photo de profil'>
    <img src='../assets/icon-deconnexion.png' class='deconnexion' alt='icone de deconnexion'>
    </nav>
  </header>
</template>

<style scoped lang='scss'>

.header__post {
    display: flex;
    justify-content: space-around;
    .header__logo {
        width: 200px;
    }
    .avatar { 
       height: 50px;
       padding: 0 10px 2px 0;
    }
    .deconnexion {
        height: 60px;
        padding: 5px 0 0 50px;
    }
}
</style>