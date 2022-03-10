<template>
 <div>
  <Header />
   <div class="accueil__post">
     <div class="publication">
      <img :src="image" class="avatar" alt="photo de profil"><span class="user"> {{ prenom }} {{ nom }}</span>
        <div class="publication__post">
            <input v-model="content" type="text" placeholder="Quoi de neuf ?">
          <div class="publication__boutons">
            <label for="file" class="label__publi">Ajouter un fichier</label>
            
             <input type="file" accept="image/*" id="file" class="input__image" v-on:change="uploadImage">
            <!-- <input type="file" accept="image/*" name="image" id="image" class="input__image" v-on:change="uploadImage">-->
            <button @click="createPost()">Publier</button>
          </div>
        </div>
      </div>
    </div>
     <div class="fil__post" v-for="post in posts" v-bind:key="post.id"> 
       <div class="post__content">
        <div class='post'>
          <div class='post__details'>
           <div class="user__header"><img  class="post__image"  :src="post.User.image" alt='photo de profil'>
             <p class="post__user">{{ post.User.prenom }} {{ post.User.nom }}<br>
                 Publié le {{ postDate(post.createdAt)}}</p>
            </div>
            <div>
              <i v-if="post.userId == userId || isAdmin == true " @click="deletePost(post.id)"  class="fa fa-trash"></i>
           
              </div>
           </div>
        </div>  
        <div class='comment'>
            <div class='comment__post'>
              <div class="content__publi">
              <p>{{ post.content }}</p>
              <div>
              <img class="image__publi" :src="post.image">
              </div>
              </div>
              </div>
              <div class='comment__icons'>
                <i class='far fa-thumbs-up' @click="like(post.id)"></i><span>{{likes}} J'aime</span>
               <!-- <i class="far fa-comment-alt"></i><span>Commenter</span>-->
                <div class="comment__button">
                 <input v-model="comment" class="button" type="text" placeholder="Ajouter votre commentaire">
                 <button @click="createComment()">Commenter</button>
               </div>
             <!--   <div class="commentaires" v-for="comment in comments" v-bind:key="comment.id"> -->
               <div class="commentaires">
                   <div class="comment__user">
                     <img  alt="photo de profil" class="comment__image">
                    <div class="comment__details">
                      <p class="comment__nom">Maurice Moss<i  class="fa fa-trash"></i></p>
                   <p>commentaire</p>
                    </div>
                    </div>
                    
              </div>
            </div>
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
    Header },
    
   
  data() {
    return {
     content: '',
     image: '',
     user : {},
     post : {},
     prenom: '',
     nom: '',
     userId: localStorage.getItem('userId'),
     posts: [],
     comments: [],
     comment: '',
     likes : '',
     isAdmin: ''
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

    axios
    .get('http://localhost:3000/api/comment/', {
       headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
   .then((response) => {
     this.comments = response.data.comment;
    })
    .catch((error) => {
        console.log(error)
    });
  },

 
  
  methods: {
  
    postDate(date) {
    return moment(date).format('DD/MM/YYYY à hh:mm')
  },

   createComment () {
        axios.post('http://localhost:3000/api/comment/', {
            textComment: this.comment, 
            userId: this.userId },
            {
            headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
         }
        })
      .then((response) => {
          console.log(response)
      })
      .catch((error) => {
          console.log(error)
      });
  },


  like() {
     axios.post('http://localhost:3000/api/like/',{
       userId: this.userId,
       },
       {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
     })
     .then((response) => {
        console.log(response)
        })
        .catch((error) => {
          console.log(error)
        });
  },

  modifyPost (id) {
     axios
    .put(`http://localhost:3000/api/post/${id}`,  {
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
   uploadImage(event) {
        this.image = event.target.files[0];
       
       },

    createPost () {
        const fd = new FormData();
        fd.append('userId', this.userId);
        fd.append('content', this.content);
        fd.append('image', this.image);
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
    @media screen and ( max-width: 770px ) {
      width: 70%
    }
}

.user__header {
  display: flex;
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
  font-weight: bold;
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
       background-color: rgb(172, 208, 226);
   }
}

.label__publi {
  border-radius: 20px;
       border:none;
       width: 40%;
       padding: 15px;
       margin: 5px;
       box-shadow: 5px 5px 10px #d4d4d4;
       font-weight: bold;
       background-color: rgb(172, 208, 226);
       text-align: center;
       font-size: 13px;
}

.input__image {
    display: none;
 }

.post__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  @media screen and ( max-width: 770px ) {
    width: 100%;
  @media screen and ( max-width: 390px ) {
    width: 135%;
  }
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
    justify-content: space-between;
    margin: 5px;
    i {
        padding : 10px;
    }
}

.post__image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px;
}

.post__user {
  padding: 5px;
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

.image__publi {
  width: 100%;
  max-height: 400px;
  //object-fit: cover;
}



.comment__nom {
  text-decoration: underline;
  i {
    padding-left:25px;
  }
}

.comment__user {
   display: flex;

}

.comment__image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 15px;
}

.button {
    margin: 5px;
    padding: 15px;
    border-radius: 20px;
    border: 1px solid rgb(194, 194, 194);
    width: 50%;
    @media screen and ( max-width: 550px ) {
      font-size: 11px;
    }
}

.comment__button {
       display: flex;
       justify-content: space-evenly;
   }
   button {
       border-radius: 20px;
       border:none;
       width: 35%;
       //padding: 15px;
       margin: 5px;
       box-shadow: 5px 5px 10px #d4d4d4;
       font-weight: bold;
}


</style>