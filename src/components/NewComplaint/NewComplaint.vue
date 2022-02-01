<template>
    <the-header></the-header>
    <div class="text-left ml-5 mt-3">
        <h1>Raise a Ticket</h1>
    </div>
    <form @submit.prevent="submitForm">
        <div class="d-flex flex-column justify-content-around mt-5">
            <div class="text-center">
                <label for="admins">To: </label>
                <select name="" id="admins" v-model="adminId">
                    <option  v-for="admin in adminList" :key="admin.id"  :value="admin.id">{{admin.name}}</option>
                </select>
            </div>
            <div>
                <label for="text">Message</label>
                <br>
                <textarea name="" id="text" cols="80" rows="10" v-model="text" placeholder="Type your problem here"></textarea>
            </div>
        </div>
        <div>
            <button class="btn btn-primary">Submit</button>
        </div>
    </form>
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
            adminId:[],
            text:'',
            adminList:[]
        }
    },
    async mounted(){
         this.token=this.$store.getters.returnToken
          this.id=this.$store.getters.returnId
       await axios.get('http://localhost:6569/api/admin',{
          headers: {
        'Authorization': `Bearer ${this.token}`
    }
       }).then(
            resp=>{
                resp.data.forEach(element => {
                    let temp=[]
                    temp.name=element.Name
                    //temp.email=element.Email
                    temp.id=element.Id
                    this.adminList.push(temp)
                });
            }
        )
        console.log(this.adminList)
    },
    methods:{
       async submitForm(){
            var today = new Date()
            var num = Math.floor(Math.random() * 90000) + 10000;
          console.log("1",this.adminId,this.text,today,"Pending","")
          let formData={
                    ConsumerId:this.$store.getters.returnId,
                    ComplaintText:this.text,
                    complaintId:num,
                    ComplaintStatus:"Pending",
                    ComplainedTime:today,
                    ComplainedTo:this.adminId
          }
         await axios.post('http://localhost:6569/api/complaints/newComplaint',formData,{
             headers: {
        'Authorization': `Bearer ${this.$store.getters.returnToken}`
    }
         })
        console.log(this.adminId)
         console.log(formData)
        this.ComplaintText=""
        this.ComplainedTo=[]
        }
    }

}
</script>

<style scoped>

textarea:hover{
    border: solid 1px pink;
}
</style>