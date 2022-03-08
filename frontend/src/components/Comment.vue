<template>
    <div class="comment__button">
        <input v-model="content" class="button" type="text" placeholder="Ajouter votre commentaire">
         <button @click="createComment(post.id)">Commenter</button>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Commentaire',
    data () {
        return {
            content: '',
            userId: localStorage.getItem('userId')
        }
    },
    
    methods : {
        createComment () {
        axios
        .post('http://localhost:3000/api/comment/', {
            textComment: this.comment, 
            userId: this.userId,}, {
            
        
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

.button {
    margin: 5px;
    padding: 15px;
    border-radius: 20px;
    border: 1px solid rgb(194, 194, 194);
    width: 50%
}

.comment__button {
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



</style>