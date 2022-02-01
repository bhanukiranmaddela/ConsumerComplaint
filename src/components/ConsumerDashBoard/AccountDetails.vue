<template>
    <the-header></the-header>
    <div class="card container-fluid  cont d-flex flex-column justify-content-center">
        <div class="text-left text-bold w-100">
            <h3 >My Account</h3>
        </div>
        <div>
             <img src="@/assets/profile.jpg" alt="profile">
        </div>
        <div>
           <label for="name"><b>Name :</b></label>
           <input type="text" v-model="name" id="name">
        </div>
        <div class="d-flex justify-content-between ">
            <div class="mr-5 ml-5 mt-5">
                <label for="email"><b>Email :</b></label>
                <input type="email" name="" id="email" v-model="email">
            </div>
            <div  class="mr-5 ml-5 mt-5">
                <label for="password"><b>Password :</b></label>
                <input type="text" v-model="password" id="password">
            </div>
        </div>
        <div>
            <button class="btn btn-primary" @click="onUpdate"> Update </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TheHeader from '../TheHeader/TheHeader.vue'
export default {
    components:{
        TheHeader
    },
     data(){
        return{
            name:'',
            email:'',
            password:'',
            token:"",
            id:""
        }
    },
    async mounted(){
         this.token=this.$store.getters.returnToken
          this.id=this.$store.getters.returnId
            await axios.get(`http://localhost:6569/api/consumer/${this.id}`,{
                    headers: {
        'Authorization': `Bearer ${this.token}`
    }
            }).
        then(resp=>{
            console.log(resp.data)
            this.email=resp.data.Email
            this.name=resp.data.Name
            this.password=resp.data.Password
            }
        )
    },
    methods:{
        async onUpdate(){
            let newData ={
                Id:1,
                Name:this.name,
                Email:this.email,
                Password:this.password
            }

            await axios.put(`http://localhost:6569/api/consumer/${this.$store.getters.returnId}`,newData,{
                headers: {
    'Authorization': `Bearer ${this.$store.getters.returnToken}`
  }
            })
            console.log("Updated")
            this.$router.replace("/")
        }
    }
}
</script>

<style scoped>

.cont{
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
}
img{
    height: 300px;
}
input[type=text] {
  border: 2px solid lightcoral;
  border-radius: 4px;
}
.my-account{
    font-weight: bold;
}
input[type=email] {
  border: 2px solid lightcoral;
  border-radius: 4px;
}

</style>