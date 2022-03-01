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
     <div class="fil__post" v-for="post in posts" v-bind:key="post.id"> 
        <div class='post'>
          <div class='post__details'>
           <div class='post__image'><img src='../assets/icon-avatar.png' class='avatar' alt='photo de profil'></div>
            <div>{{ prenom }} {{ nom }}<br>
                 Publié le 00/00/0000
            </div>
           </div>
        </div>  
        <div class='comment'>
            <div class='comment__post'>
              
              <p>{{ content }}</p>
              <span>
              
              <i  @click="deletePost" class="fa fa-trash"></i>
              <i  @click="modifyPost" class="fa fa-pencil"></i>
                </span>
             
              </div>
              <div class='comment__icons'>
                <i class='far fa-thumbs-up' @click="like()"></i><span>J'aime</span>
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
     userId: localStorage.getItem('userId'),
     postId: '',
     prenom: '',
     nom: '',
     posts: []
    }
  },
  mounted () {
    axios
    .get('http://localhost:3000/api/post/', {
       headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
   .then((response) => {
     this.posts = response.data;
        
        // this.content = response.data.content;
        // this.prenom = response.data.prenom;
        // this.nom = response.data.nom;
    })
    .catch((error) => {
        console.log(error)
    });
  },
  
  methods: {
      createPost () {
        const fd = new FormData();
        fd.append('userId', this.userId);
        fd.append('content', this.content);
        axios
        .post('http://localhost:3000/api/post', fd, {
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
      }
  },
  deletePost () {
    axios
    .delete(`http://localhost:3000/api/post/${this.post.id}`,  {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then((response) => {
              console.log(response + 'Message supprimé');     
          })
          .catch((error) => {
              console.log(error)
          });
  },
  // modifyPost () {
  //    axios
  //   .put(`http://localhost:3000/api/post/${this.post.id}`,  {
  //           headers: {
  //             Authorization: 'Bearer ' + localStorage.getItem('token')
  //           }
  //         })
  //         .then((response) => {
  //             console.log(response + 'Message supprimé');     
  //         })
  //         .catch((error) => {
  //             console.log(error)
  //         });
  // },
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
    margin: 10px;
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
        display: flex;
        justify-content: space-between;
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