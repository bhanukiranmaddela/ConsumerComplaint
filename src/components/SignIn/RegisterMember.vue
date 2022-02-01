<template>
    <div class="login-form">
    <form @submit.prevent="register">
        <h1 v-if="!isUser">Register as Admin</h1>
        <h1 v-else>Register as User</h1>
        <div class="content">
        <div class="input-field">
            <input type="text" placeholder="Username" autocomplete="nope" :class="{'border-danger':!hasName}" v-model="name" @blur="checkName">
            <p  v-if="!hasName" class="text-danger font-weight-bold text-left"> * UserName Required</p>
        </div>
        <div class="input-field">
            <input type="email" placeholder="Email" autocomplete="nope" :class="{'border-danger':!hasEmail}" v-model="email" @blur="checkEmail">
            <p v-if="!hasEmail" class="text-danger font-weight-bold text-left"> * EmailRequired</p>
        </div>
        <div class="input-field">
            <input type="password" placeholder="Password" autocomplete="new-password" :class="{'border-danger':!hasPassword}" v-model="password" @blur="checkPassword">
            <p v-if="!hasPassword" class="text-danger font-weight-bold text-left"> *Password Required</p>
        </div>
        </div>
        <div>
            <p>Already registered? <router-link  to="/login">Login</router-link> instead</p>
        </div>
        <div class="action  p-2 m-2">
        <button type="submit">Register</button>
        </div>
    </form>
    <div class="d-flex justify-content-around login-form1">
        <button class="btn btn-outline-info p-2 m-2" @click="registerUser">As User</button>
        <button class="btn btn-outline-warning p-2 m-2"  @click="registerAdmin">As Admin</button>
    </div>
    <div class="card text-success"  v-if="registerdUserCard">
        <p class="font-weight-bold">Registration Success</p>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            name:"",
            password:"",
            email:'',
            count:5,
            user:true,
            registerdUserCard:false,
            hasName:null,
            hasPassword:null,
            hasEmail:null,

        }
    },
    computed:{
        isUser(){
           return this.user
        }
        ,showCard(){
            return this.showCard
        }
    },
    methods:{
        checkName(){
            if(this.name.trim===""){
                this.hasName=false
            }else{
                this.hasName=true
            }
            console.log(this.hasName)
        },
        checkEmail(){
            if(this.email.trim===""){
                this.hasEmail=false
            }else{
                this.hasEmail=true
            }
            console.log(this.hasEmail)
        },
        checkPassword(){
            if(this.password.trim===""){
                this.hasPassword=false
            }else{
                this.hasPassword=true
            }
            console.log(this.hasPassword)
        },
        registerUser(){
            this.user=true
            console.log("UserRegi")
        },
        registerAdmin(){
            this.user=false
            console.log("adminRegi")
        },
        disappearCard(){
            this.$router.push("/login")
            this.registerdUserCard=false
        },
       async register(){
           let newData={
               Name:this.name,
               Email:this.email,
               Password:this.password,
           }
           if(this.user){ 
               if(this.hasName==true&&this.hasEmail==true&&this.hasPassword==true){
                     await axios.post('http://localhost:6569/api/auth/register-user',newData).then(resp=>{
               if(resp.data=="User Added"){
                   this.$router.push("/login")
               }
           });
               }else{
                   console.log("No")
                   return null;
               }
               
           }else{
               if(this.hasName&&this.hasEmail&&this.hasPassword){
                   await axios.post('http://localhost:6569/api/auth/register-admin',newData).then(resp=>{
               if(resp.data=="User Added"){
                   this.$router.push("/login")
               }
               
           });
               }else{
                   return null;
               }
           }
           this.registerdUserCard=true
           this.name=""
           this.email=""
           this.password=""
           setTimeout(this.disappearCard,3000);
       },
    },
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  background: #e35869;
  font-family: 'Rubik', sans-serif;
}

.login-form {
  background: #fff;
  width: 500px;
  margin: 65px auto;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
}
.login-form1 {
  background: #fff;
  display: -webkit-box;
  display: flex;
  border-radius: 4px;
}
.login-form h1 {
  padding: 35px 35px 0 35px;
  font-weight: 300;
}
.login-form .content {
  padding: 35px;
  text-align: center;
}
.login-form .input-field {
  padding: 12px 5px;
}
.login-form .input-field input {
  font-size: 16px;
  display: block;
  font-family: 'Rubik', sans-serif;
  width: 100%;
  padding: 10px 1px;
  border: 0;
  border-bottom: 1px solid #747474;
  outline: none;
  -webkit-transition: all .2s;
  transition: all .2s;
}
.login-form .input-field input::-webkit-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::-moz-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input:-ms-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::-ms-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::placeholder {
  text-transform: uppercase;
}
.login-form .input-field input:focus {
  border-color: #222;
}
.login-form a.link {
  text-decoration: none;
  color: #747474;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  display: inline-block;
  margin-top: 20px;
}
.login-form .action {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
          flex-direction: row;
}
.login-form .action button {
  width: 100%;
  border: none;
  padding: 18px;
  font-family: 'Rubik', sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  background: #e8e9ec;
  color: #777;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 0;
  letter-spacing: 0.2px;
  outline: 0;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.login-form .action button:hover {
  background: #d8d8d8;
}
.login-form .action button:nth-child(2) {
  background: #2d3b55;
  color: #fff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 4px;
}
.login-form .action button:nth-child(2):hover {
  background: #3c4d6d;
}
</style>