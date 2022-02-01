<template>
    <the-header></the-header>
    <div  class="container-fluid d-flex flex-column justify-content-between">
        <div class="text-left mr-5 mt-3 d-flex justify-content-between">
            <h3>My Tickets</h3>
            <div>
                <label for="status"></label>
                <select  id="status" v-model="statusChange" @change="statusCall(statusChange)">
                    <option value="all" selected>All</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
        </div>
        <div class="loading-div" v-if="isLoading">
            <b>Loading Page...</b>
        </div>
        <div v-else class="mt-5 ">
            <div class=" d-flex justify-content-around outline ">
                <div class="col-2 text-center id">
                    <b>ID</b>
                </div>
                 <div class="col-3 id">
                     <b>Time</b>
                </div>
                 <div class="col-4 id">
                     <b>Details</b>
                </div>
                <div class="col-3 ">
                    <b>Status</b>
                </div>
            </div>
        </div>
        <ul class="complaint-border" v-if="hasComplaints">
            <li v-for="each in complaintList" :key="each.Id">
                <div class=" d-flex justify-content-around mt-2 ">
                    <div class="col-2 d-flex flex-column justify-content-center">  
                        {{each.Id}}
                    </div>
                    <div class="col-3 ">
                        {{each.time}}
                    </div>
                    <div class="col-4 text-div ">
                        {{each.text}}
                    </div>
                    <div class="col-3 status " :class="{'text-danger' : each.status==='Pending','text-success':each.status==='Resolved'}" >
                        {{each.status}}
                    </div>
                </div>
                <hr>
            </li>          
        </ul>
        <div v-if="!hasComplaints" class="container-fluid d-flex flex-column justify-content-center">
            <h3 class="notickets mt-5">You have no tickets to review</h3>
            <p><router-link to="/newTicket">Click Here</router-link> to raise a new Ticket</p>
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
            hasComplaints:true,
            complaintList:[],
            statusChange:'all',
            loadUrl:`http://localhost:6569/api/complaints/byconsumerId/1${this.$store.state.loggedInUserId}`,
            isLoading:true,
            token:'',
            id:''
        }
    },
    computed:{
    },
    methods:{
        getDate(){
            var d = new Date("2011-04-20T09:30:51.01");
            return d;
        },
       async statusCall(statusChange){
           if(statusChange==="Pending"){
               this.loadUrl=`http://localhost:6569/api/consumer/complaintByStatus?id=${this.$store.getters.returnId}&&status=Pending`
           }
           else if (statusChange==='Resolved'){
               this.loadUrl=`http://localhost:6569/api/consumer/complaintByStatus?id=${this.$store.getters.returnId}&&status=Resolved`
           }
           else {
               this.loadUrl=`http://localhost:6569/api/complaints/byconsumerId/${this.$store.getters.returnId}`
           }
           this.loadComplaints(this.loadUrl)
       }, 
   async loadComplaints(loadUrl){
       console.log(loadUrl)
       this.isLoading=true
       this.complaintList=[]
//         await axios.get(loadUrl,{
//   headers: {
//     'Authorization': `Bearer ${this.$store.state.token}`
//   })
await axios.get(loadUrl, {
  headers: {
    'Authorization': `Bearer ${this.token}`
  }
}).then((response)=>{
            console.log(response)
            
            response.data.forEach(element => {
                let temp=[]
                //console.log(element)
                temp.Id=element.ComplaintId;
                temp.text=element.ComplaintText;
                temp.time=element.ComplainedTime;
                temp.status=element.ComplaintStatus
                this.complaintList.push(temp)
            });
        })
         this.isLoading=false
        this.hasComplaints=this.complaintList.length>0?true:false
        console.log(this.complaintList);
    }
    },
    beforeMount(){
         this.token=this.$store.getters.returnToken
        this.loadUrl=this.loadUrl=`http://localhost:6569/api/complaints/byconsumerId/${this.$store.getters.Id}`
        console.log(this.token,this.$store.getters.loggedInUserId)
        console.log("before ")
    },
     mounted(){
         console.log("mounted started")
         this.token=this.$store.getters.returnToken
          this.id=this.$store.getters.returnId
         this.loadUrl=this.loadUrl=`http://localhost:6569/api/complaints/byconsumerId/${this.id}`
         console.log(this.token,this.id)
         console.log(this.loadUrl)
      this.loadComplaints(this.loadUrl)
       console.log("mounted done")
    }
}
</script>

<style scoped>
.loading-div{
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
    li{
        list-style-type: none;
    }
    .outline{
        border: solid #F88379 2px ;
        border-radius: 10px;
    }
    .complaint-border{
         border: solid #F88379 2px ;
         margin-top:10px ;
         border-radius: 10px;
    }
    hr{
        margin-right: 10px;
    }
    .id{
        border-right: solid 1px;
        border-left: none;
        border-top: none;
        border-bottom: none;
    }
    .notickets{
        font-weight: bold;
        text-align: center;
    }
    .status{
        font-weight: bold;
    }
    .text-div {
        text-align: center;
        text-overflow: clip;
        word-wrap: break-word;
    }
    select{
        border: solid lightcoral 2px;
    }
</style>