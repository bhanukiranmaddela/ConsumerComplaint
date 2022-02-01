<template>
    <div>
        <nav class="container-fluid navbar-bg d-flex justify-content-between p-3 nav-bar-div">
            <div>
                <h3><router-link to="/">Home</router-link></h3>
            </div>
            <div class=" navbar-bg d-flex justify-content-around">
                <router-link to="/newTicket" class="ml-3 mr-3"><h3>Raise Ticket</h3></router-link>
                <router-link to="/alltickets" class="mr-3 ml-3"><h3>Tickets</h3></router-link>
                <router-link to="/account"><h3 class="mr-3 ml-3"><i class="fas fa-user-circle"></i></h3></router-link>
                <button class="btn btn-light " @click="logOut">Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
   methods:{
       logOut(){
           this.$store.commit('logOut')
           this.$router.push('/login')
       }
   }
}
</script>

<style scoped>
.navbar-bg{
    background-color: #F88379;
    color: white;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
}
.account-tab-icon{
    border: solid white 2px;
    border-radius: 25px;
    padding: 8px;
}
a{
color: white;
}
a:active,
a:hover,
a.router-link-active,i {
 font-weight: bold;
 color: black;
}
.nav-bar-div{
    height: 10vh;
}
i{
    font-weight: 150px;
    color: white;
}
</style>