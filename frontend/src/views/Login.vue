<template>
 <div>
  <Header/>
   <div class="authentification">
    <h1 v-if="mode == 'login' ">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <div class="form" v-if="mode == 'create'">
      <input v-model="prenom" type="text" placeholder="Prénom" required>
      <input v-model="nom" type="text" placeholder="Nom" required>
    </div>
    <div class="form">
      <input v-model="email" type="email" placeholder="Adresse email" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <button  @click="login()" v-if="mode == 'login'">Connexion</button>
      <button  @click="createAccount()" v-else>Inscription</button>
      <p v-if="mode == 'login' ">Vous n'avez pas encore de compte ? <span class="login" @click="switchToCreateAccount()">Créer un compte</span></p>
      <p v-else>Vous avez déjà un compte ? <span class="login"  @click="switchToLogin()">Se connecter</span></p>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import axios from 'axios';


export default {
  name: 'login',
  components: {
    Header
  },
  data () {
       return {
       mode: 'login',
       prenom: '',
       nom: '',
       email: '',
       password: ''
      };
},
  methods: {   
    switchToCreateAccount() {
      this.mode = 'create';
    },
    switchToLogin() {
      this.mode = 'login';
    }, 
    createAccount() {
      if 
        ( this.prenom !== null || this.nom !== null || this.email !== null || this.password !== null ) 
      {
      const self = this;
      axios
      .post('http://localhost:3000/api/user/signup', {
        prenom: this.prenom,
        nom: this.nom,
        email: this.email,
        password: this.password
      })
      .then(() => {
        self.login();
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
    login () {
      const self = this;
      axios
      .post('http://localhost:3000/api/user/login', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('token', response.data.token);
        self.$router.push('/post')
        })
        .catch(error => {
        console.log(error);
      });
    },
  }
}  
</script>


<style scoped lang="scss">
.authentification {
  box-shadow: -1px 6px 18px 8px #d4d4d4;
  border-radius: 20px;
  width: 400px;
  @media screen and (max-width: 430px) {
    width: 250px;
  }
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
