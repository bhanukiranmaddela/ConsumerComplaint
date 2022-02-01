<template>
    <div class="window-bg">
        <the-header></the-header>
        <div>
            <div class=" mt-5 ml-3 mr-3 d-flex justicy-content-start">
                <h3 ><router-link class="name" to="/admin/Home">{{name}}</router-link></h3>
                <h3> >> Tickets</h3>
            </div>
        </div>
        <div class="mt-5 container-fluid d-flex justify-content-around font-weight-bold head-div row ">
            <div class=" col-2 side-line">Id</div>
            <div class=" col-2 side-line ">Time</div>
            <div class=" col-4 side-line">Complaint</div>
            <div class=" col-2 side-line">Status</div>
            <div class="col-2">Resolve</div>
        </div>
        <div v-if="hasTickets">
            <div  class=" mt-3 mb-3 container-fluid d-flex justify-content-around row " v-for="ticket in ticketsList " :key="ticket.Id">
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
</template>
<script>
import axios from 'axios'
import TheHeader from '../TheHeader.vue'
export default {
    data(){
        return{
            name:'',
            ticketsList:[],
            modifyingObject:[],
            hasTickets:true
        }
    },

    props:['Id'],
    components:{TheHeader},
   async  mounted(){
         this.Adminid=this.$store.getters.returnId
        this.Admintoken = this.$store.getters.returnToken
       await axios.get('http://localhost:6569/api/consumer/'+this.Id,{
            headers: {
        'Authorization': `Bearer ${this.Admintoken}`
                     }
       }).then(resp=>{
            console.log(resp.data)
            this.name=resp.data.Name
        })
        console.log(this.Id)
        //replace the adminId with the signedIn admin's Id
        await axios.get(`http://localhost:6569/api/complaints/admin/userTickets?adminId=${this.$store.getters.returnId}&&userId=${this.Id}`,{
             headers: {
        'Authorization': `Bearer ${this.Admintoken}`
                     }
        }).then(resp=>{
            resp.data.forEach(element => {
                this.ticketsList.push(element)
            });
        })
        this.hasTickets=this.ticketsList.length>0
        //console.log(this.ticketsList)

    },
    methods:{
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
    padding: 20px;
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
</style>