<template>
 <div class="window-bg">
    <the-header></the-header>
    <div>
        <div class="mt-5 container-fluid d-flex justify-content-around font-weight-bold head-div row ">
            <div class=" col-2 side-line div-border">Id</div>
            <div class=" col-2 side-line div-border">Time</div>
            <div class=" col-4 side-line div-border">Complaint</div>
            <div class=" col-2 side-line div-border">Status</div>
            <div class="col-2">Resolve</div>
        </div>
        <div v-if="hasTickets">
            <div  class=" mt-3 mb-3 container-fluid d-flex justify-content-around row " v-for="ticket in allTickets " :key="ticket.Id">
                <div class=" col-2 ">{{ticket.Id}}</div>
                <div class=" col-2 ">{{ticket.ComplainedTime}}</div>
                <div class=" col-4 side-line">{{ticket.ComplaintText}}</div>
                <div class=" col-2 " :class="{'text-success':ticket.ComplaintStatus==='Resolved','text-danger':ticket.ComplaintStatus==='Pending'}" >{{ticket.ComplaintStatus}}</div>
                <div class="col-2" ><button class="btn btn-primary" :id="ticket.ComplaintId" @click="resolve(ticket.ComplaintId)">Solve</button></div>
                <hr>
            </div>
        </div>
        <div v-else class="mt-5 font-weight-bold">
            <p>You have no tickets from this User</p>
        </div>
    </div>
 </div>
</template>
<script>
import axios from 'axios'
import TheHeader from '../TheHeader.vue'
export default {
    components:{
        TheHeader
    },
    data(){
        return{
            allTickets:[],
            hasTickets:true,
            id:'',
            token:''
        }
    },
    mounted(){
        this.id=this.$store.getters.returnId
        this.token = this.$store.getters.returnToken
        console.log("Admin-home-Mounted")
        console.log(this.id,this.token)
        this.loadTickets()
    },
    methods:{
        async loadTickets(){
            await axios.get(`http://localhost:6569/api/complaints/byAdminId/${this.$store.getters.returnId}`,{
                headers: {
        'Authorization': `Bearer ${this.$store.getters.returnToken}`
    }
            }).then(resp=>{
                resp.data.forEach(element => {
                    this.allTickets.push(element)
                });
            })
            this.hasTickets=this.allTickets.length>0;
            console.log(this.allTickets)
        },
         async resolve(ComplaintId){
           await axios.get(`http://localhost:6569/api/complaints/${ComplaintId}`,{
                headers: {
        'Authorization': `Bearer ${this.$store.getters.returnToken}`
    }
           }).then(resp=>{
               this.modifyingObject=resp.data
           });
            let newData={
        Id: this.modifyingObject.Id,
        ConsumerId: this.modifyingObject.ConsumerId,
        ComplaintText: this.modifyingObject.ComplaintText,
        ComplaintId: this.modifyingObject.ComplaintId,
        ComplaintStatus: "Resolved",
        ComplainedTo: this.modifyingObject.ComplainedTo,
        ComplainedTime: this.modifyingObject.ComplainedTime
    }
    console.log(newData)
    await axios.put(`http://localhost:6569/api/admin/resolve/${ComplaintId}`,newData,{
         headers: {
        'Authorization': `Bearer ${this.$store.getters.returnToken}`
    }
    })
    this.$router.push(`/admin/Home`)
        }
    }
}
</script>
<style scoped>
.window-bg{
    background-color: #Edc7b7;
    height: 100vh;
    width: 100%;
    background-size: cover;
    overflow: auto;

}
.name{
    text-decoration: none;
    color: #123c69;
}
.head-div {
    border-radius: 10px;
    border: solid 2px #BAB2B5;
    padding-top: 10px;
    padding-bottom: 10px;
}
.side-line{
    text-align: center;
    text-overflow: clip;
    word-wrap: break-word;
}
.div-border{
        border-top: none;
    border-bottom: none;
    border-right: none;
    border-left: solid 1px #BAB2B5;
}
</style>