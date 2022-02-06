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
            <p>Prénom Nom</p>
            </div>
            <div>Dernières publications</div>
            <div>Modifier mon mot de passe</div>
            <div>Désactiver mon compte</div>
        </div>
      </div>     
 </div> 
</template>

<script>
import HeaderPost from '../components/HeaderPost.vue';

export default { 
    name: 'Profil',
    components: {
    HeaderPost
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
    .avatar__profil {
      margin: 10px;
    }
}

</style>