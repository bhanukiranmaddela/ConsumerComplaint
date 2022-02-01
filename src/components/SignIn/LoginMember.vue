<template>
    <div class="login-form" v-if="isUser">
    <form @submit.prevent="register">
        <h1>User LogIn</h1>
        <div class="content">
        <div class="input-field">
            <input type="text" placeholder="Username" autocomplete="nope" v-model="name" @blur="checkName">
            <p v-if="!hasName" class="text-left text-danger">*Name Required</p>
        </div>
        <div class="input-field">
            <input type="password" placeholder="Password" autocomplete="new-password" v-model="password" @blur="checkPassword">
               <p v-if="!hasPassword" class="text-left text-danger">*Password Required</p>
        </div>
        </div>
        <div v-if="returnlogInFailed">
            <p class="text-center text-danger font-weight-bold">Login Failed ,Check Credentials</p>
        </div>
        <div>
            <p>Not LoggedIn? <router-link to="/register">Register</router-link></p>
        </div>
        <div class="action">
        <button type="submit">Login</button>
        </div>
    </form>
    </div>

    <div class="login-form" v-else>
    <form @submit.prevent="register">
        <h1>Admin LogIn</h1>
        <div class="content">
        <div class="input-field">
            <input type="text" placeholder="Username" autocomplete="nope" :class="{'border-danger':!hasName}"  v-model="name" @blur="checkName">
            <p v-if="!hasName" class="text-left text-danger">*Name Required</p>
        </div>
        <div class="input-field">
            <input type="password" placeholder="Password" autocomplete="new-password" :class="{'border-danger':!hasPassword}" v-model="password" @blur="checkPassword">
            <p v-if="!hasPassword" class="text-left text-danger">*Password Required</p>
        </div>
        </div>
        <div v-if="returnlogInFailed">
            <p class="text-center text-danger font-weight-bold">Login Failed ,Check Credentials</p>
        </div>
        <div>
            <p>Not LoggedIn? <router-link to="/register">Register</router-link></p>
        </div>
        <div class="action">
        <button type="submit">Login</button>
        </div>
    </form>
    </div>
    <div class="d-flex justify-content-around login-form1">
        <button class="btn btn-outline-info p-2 m-2" @click="loginUser">User</button>
        <button class="btn btn-outline-warning p-2 m-2"  @click="loginAdmin">Admin</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            name:"",
            password:"",
            isUser:true,
            count:5,
            hasName:false,
            hasPassword:false,
            loginFailed:false
        }
    },
    computed:{
        isuserLogging(){
           return this.isUser
        },
        returnlogInFailed(){
          return  this.loginFailed
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
        checkPassword(){
            if(this.password.trim===""){
                this.hasPassword=false
            }else{
                this.hasPassword=true
            }
            console.log(this.hasPassword)
        },
        loginAdmin(){
            this.isUser=false
            console.log("Admin")
        },
        loginUser(){
            this.isUser=true
            console.log("User")
        },
       async register(){
           let newData={
               Name:this.name,
               Password:this.password
           }
           if(this.isUser){
               if(this.hasName&& this.hasPassword){
                        await axios.post('http://localhost:6569/api/auth/login-Consumer',newData).then(resp=>{
                    console.log(resp.data)
                    if(resp.data.Id!==null){
                            this.$store.commit('setIdAndtoken',{Id:resp.data.Id,Token:resp.data.Token})
                            this.loginFailed=false
                            this.$router.push('/')
                            
                    }else{
                        this.loginFailed=true
                    }           
           });
               }else{
                   this.loginFailed=true
                   return null;
               }
           }else{
               if(this.hasName&& this.hasPassword){
                            await axios.post('http://localhost:6569/api/auth/login-admin',newData).then(resp=>{
                    console.log(resp.data)
                    if(resp.data.Id!==null){
                            this.$store.commit('setIdAndtoken',{Id:resp.data.Id,Token:resp.data.Token})
                            this.$router.push('/admin/Home')
                            this.loginFailed=false
                    }else{
                        this.loginFailed=false
                        
                    }           
                });
               }else{
                    this.loginFailed=true
                   return null;
               }
           }
           
           this.name=""
           this.password=""

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

.login-form1 {
  background: #fff;
  display: flex;
  width: 500px;
  display: flex;
  margin: auto;
  align-self: center;
  border-radius: 4px;
  box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
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