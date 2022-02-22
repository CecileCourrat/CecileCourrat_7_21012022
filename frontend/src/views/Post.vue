<template>
 <div>
  <HeaderPost/>
   <div class="accueil__post">
     <div class="publication">
      <img src="../assets/icon-avatar.png" class="avatar" alt="photo de profil">
        <div class="publication__post">
            <input v-model="content" type="text" placeholder="Quoi de neuf ?">
          <div class="publication__boutons">
            <button>Ajouter un fichier</button>
            <button @click="createPost()">Publier</button>
          </div>
        </div>
      </div>
    </div>
    <p>Publications récentes</p>
     <div class='fil__post'>
        <div class='post'>
          <div class='post__details'>
           <div class='post__image'><img src='../assets/icon-avatar.png' class='avatar' alt='photo de profil'></div>
            <div>Prénom Nom<br>
                 Publié le 00/00/0000
            </div>
           </div>
        </div>  
        <div class='comment'>
            <div class='comment__post'>blablabla</div>
              <div class='comment__icons'>
                <i class='far fa-thumbs-up'></i><span>J'aime</span>
                <i class="far fa-comment-alt"></i><span>Commenter</span>
              </div>
              <div class='comment__button'>
               <input class='button' type='text' placeholder='Ajouter votre commentaire'>
              </div>
        </div>
      </div> 
   </div>
</template>

<script>
import HeaderPost from '../components/HeaderPost.vue';
import axios from 'axios'


export default { 
    name: 'Post',
    components: {
    HeaderPost
  },
  data() {
    return {
     content: '',
     image: '',
     likes: ''
    }
  },
  methods: {
      createPost () {
        // const fd = new FormData()
        // fd.append('content', this.content);
        axios
        .post('http://localhost:3000/api/post', {
           headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
        })
      .then((response) => {
          console.log(response);
      })
      .catch((error) => {
          console.log(error)
    
      });
      }
  }
}
</script>

<style scoped lang="scss">

.accueil__post {
    display: flex;
    justify-content: center;
}
.publication {
    border: 1px solid rgb(194, 194, 194);
    width: 60%;
    padding: 15px;
}

.avatar { 
    height: 50px;
    padding: 0 10px 2px 0;
}

.publication__post {
   input {
       width: 70%;
       padding: 15px;
       border-radius:20px;
       border: 1px solid rgb(194, 194, 194);
   }
   .publication__boutons {
       display: flex;
       justify-content: space-evenly;
   }
   button {
       border-radius: 20px;
       border:none;
       width: 40%;
       padding: 15px;
       margin: 5px;
       box-shadow: 5px 5px 10px #d4d4d4;
       font-weight: bold;
   }
}

p {
    display: flex;
    justify-content: center;
}

.fil__post {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.post {
    border: 1px solid rgb(194, 194, 194);
    width: 62%;
}

.post__details {
    display: flex;
    margin: 5px;
}

.comment {
    border: 1px solid rgb(194, 194, 194);
    width: 62%;
    .comment__post {
        margin: 10px;
    }
    i {
        padding : 10px;
    }
}

.button {
    margin: 5px;
    padding: 15px;
    border-radius: 20px;
    border: 1px solid rgb(194, 194, 194);
    width: 50%
}
</style>