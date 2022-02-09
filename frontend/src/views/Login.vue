<template>
 <div>
  <Header/>
   <div class='authentification'>
    <h1 v-if='mode == "login"'>Connexion</h1>
    <h1 v-else>Inscription</h1>
    <div class='form' v-if='mode == "create"'>
      <input v-model='prenom' type='text' placeholder='Prénom'>
      <input v-model='nom' type='text' placeholder='Nom'>
    </div>
    <div class='form'>
      <input v-model='email' type='email' placeholder='Adresse email'>
      <input v-model='password' type='password' placeholder='Mot de passe'>
      <button  v-if='mode == "login"'>Connexion</button>
      <button  v-else>Inscription</button>
      <p v-if='mode == "login"'>Vous n'avez pas encore de compte ? <span class='login' @click='switchToAccount()'>Créer un compte</span></p>
      <p v-else>Vous avez déjà un compte ? <span class='login' @click='switchToLogin()'>Se connecter</span></p>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
//import { mapState } from 'vuex'

export default {
  name: 'Login',
  components: {
    Header
  },
    data () {
     return {
      mode: 'login',
      email: '',
      prenom: '',
      nom: '',
      password: ''
      }
  },
  //mounted() {
   // if (this.$store.state.user.userId != -1) {
   //  this.self.$router.push('/post');
   //  return
   // }
  //},
  //computed: {
    // validatedFields() {
     // if (this.mode == 'create') {
      //  if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != "") {
       //   return true;
        //} else {
        //  return false;
       // }
      //} else {
       // if (this.email != "" && this.password != "") {
        //  return true;
       // } else {
        //  return false;
        //}
      // }
    // },
     //  ...mapState(['status'])
  //},
  methods: {    
    switchToAccount() {
      this.mode = 'create';
    },
    switchToLogin() {
      this.mode = 'login';
    },
//     login() {
//     //  if ( this.email != '' && this.password !='') {
//      //   if(this.email == this.$parent.mockAccount.email && this.password == this.$parent.mockAccount.password) {
//       //      this.$emit("authenticated", true);
//       //      this.$router.replace({ name: "post" });
//       //  } else {
//       //      console.log("The username and / or password is incorrect");
//        // }
//    // } else {
//        // console.log("A username and password must be present");
//   //  }

      
//       const self = this;
//       this.$store.dispatch('login', {
//         email: this.email,
//         password: this.password,
//       }).then(function () {
//        self.$router.push('/post');
//       }, function (error) {
//         console.log(error);
//     })
//     },
//     createAccount() {
      
//       const self= this;
//       this.$store.dispatch('createAccount', {
//        email: this.email,
//         nom: this.nom,
//         prenom: this.prenom,
//         password: this.password,
//       }).then(function () {
//         self.login();
//       }, function (error) {
//         console.log(error);
//       })
    
   }  
 }
</script>


<style scoped lang="scss">

.authentification {
  box-shadow: -1px 6px 18px 8px #d4d4d4;
  border-radius: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}

.form {
    display: flex;
    flex-direction: column;
    width: 80%;
    input {
        margin: 10px;
        height: 30px;
        padding: 5px;
    }
    button {
        border-radius: 20px;
        height: 50px;
        border: none;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 5px 5px 10px #d4d4d4;
    }
    .login {
     text-decoration:underline;
    }
}

</style>
