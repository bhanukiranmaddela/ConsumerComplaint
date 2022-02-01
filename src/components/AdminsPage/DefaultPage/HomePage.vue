<template>
<div class="window-bg">
    <the-header></the-header>
    <div class="mt-5 mb-3">
        <ul>
            <li  class=" m-4 d-flex justify-content-between">
                <div>
                    <h3>UserName</h3>
                </div>
                <div>
                    <h3>Email</h3>
                </div>
                <div>
                    <router-link to="/admin/myTickets" class="btn btn-info">View Tickets</router-link>
                </div>
            </li>
        </ul>
    </div>
    <div>
        <ul>
            <li v-for="user in usersList" :key="user.Id" class=" lists d-flex justify-content-between">
                <div>
                    <h3>{{user.Name}}</h3>
                </div>
                <div>
                    <h3>{{user.Email}}</h3>
                </div>
                <div>
                    <router-link :to="'/admin/user/'+user.Id" class="btn btn-info">View Tickets</router-link>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import TheHeader from '../TheHeader.vue'
import axios from 'axios'
export default {
    components:{
    TheHeader
    },
    data(){
        return{
            usersList:[],
            userId:'',
            id:'',
            token:''
        }
    },
    methods:{
         async loadUsers(){
             await axios.get('http://localhost:6569/api/consumer',{
                  headers: {
        'Authorization': `Bearer ${this.$store.getters.returnToken}`
    }
             }).then((resp)=>{
                 //console.log(resp.data)
                 resp.data.forEach(element => {
                     this.usersList.push(element)
                 });
             })
             console.log(this.usersList)
        }
    },
    mounted(){
        this.id=this.$store.getters.returnId
        this.token = this.$store.getters.returnToken
        console.log("Admin-home-Mounted")
        console.log(this.id,this.token)
        this.loadUsers()
    },
}
</script>

<style scoped>
.window-bg{
    background-color: #Edc7b7;
    height: 100vh;
    width: 100%;
    padding: 20px;
    background-size: cover;
    overflow: auto;

}
.lists{
    list-style-type: none;
    border : solid 2px #BAB2B5;
    border-radius: 10px;
    color: #Ac3B61;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 8px;
    margin-right: 8px;
    padding: 15px;
}
li{
    list-style-type: none;
}
</style>