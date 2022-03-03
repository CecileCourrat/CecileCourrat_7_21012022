<template>
 <div>
  <Header />
   <div class="accueil__post">
     <div class="publication">
      <img :src="image" class="avatar" alt="photo de profil"><span class="user"> {{ prenom }} {{ nom }}</span>
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
           <div><img  class="post__image"  :src="post.User.image" alt='photo de profil'></div>
            <div class="post__user">{{ post.User.prenom }} {{ post.User.nom }}<br>
                 Publié le {{ postDate(post.createdAt)}}
            </div>
           </div>
        </div>  
        <div class='comment'>
            <div class='comment__post'>
              
              <p>{{ post.content }}</p>
              <span>
              
              <i  @click="deletePost(post.id)" class="fa fa-trash"></i>
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
import Header from '../components/Header.vue';
import axios from 'axios';
import moment from 'moment';



export default { 
    name: 'Post',
    components: {
    Header,
  },
  data() {
    return {
     content: '',
     image: '',
     user : {},
     prenom: '',
     nom: '',
     userId: localStorage.getItem('userId'),
     posts: []
    }
  },
  mounted () {
     const id = localStorage.getItem('userId')
     axios
     .get(`http://localhost:3000/api/user/${id}`)
     .then((response) => {
       this.prenom = response.data.prenom
       this.nom = response.data.nom
       this.image = response.data.image    
 })
      .catch((error ) => {
          console.log(error);
     });


    axios
    .get('http://localhost:3000/api/post/', {
       headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
   .then((response) => {
     this.posts = response.data.post;
    })
    .catch((error) => {
        console.log(error)
    });
  },
  
  methods: {
    postDate(date) {
    return moment(date).format('DD/MM/YYYY hh:mm')
  },

  deletePost (id) {
    axios
    .delete(`http://localhost:3000/api/post/${id}`,  {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(() => {
              window.location.reload();
          })
          .catch((error) => {
              console.log(error)
          });
  },

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
      .then(() => {
          window.location.reload();
      })
      .catch((error) => {
          console.log(error)
      });
    }
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
    width: 50%;
    padding: 15px;
}

.avatar { 
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: -5px;
}

.user {
  padding: 12px;
}

.publication__post {
   input {
       width: 70%;
       padding: 15px;
       border-radius:20px;
       border: 1px solid rgb(194, 194, 194);
       margin: 5px;
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

.post__image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px;
}

.post__user {
  padding: 5px;
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