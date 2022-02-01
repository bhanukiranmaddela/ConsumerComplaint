<template>
    <div>
        <nav class="container-fluid navbar-bg d-flex justify-content-between p-3 nav-bar-div">
            <div>
                <h3><router-link to="/">Admin </router-link></h3>
            </div>
            <div class=" navbar-bg d-flex justify-content-around">
                <router-link to="/admin/Home" class="ml-3 mr-3"><h3>Users</h3></router-link>
                <router-link to="/admin/myTickets" class="mr-3 ml-3"><h3>Tickets</h3></router-link>
                <router-link to="/admin/account"><h3 class="mr-3 ml-3"><i class="fas fa-user-circle"></i></h3></router-link>
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
i{
    font-weight: 150px;
    color: white;
}
.navbar-bg{
    background-color: #BAB2B5;
    color: #123c69;
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
color: #123c69;
}
a:active,
a:hover,
a.router-link-active {
 font-weight: bold;
 color: #ac3b61;
}
.nav-bar-div{
    height: 10vh;
}

</style>