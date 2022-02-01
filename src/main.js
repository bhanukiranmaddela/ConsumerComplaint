import { createApp } from 'vue'
import {createStore} from 'vuex'
import {createRouter,createWebHistory} from 'vue-router'
import App from './App.vue'
import AccountDetails from './components/ConsumerDashBoard/AccountDetails.vue'
import ComplaintsTab from './components/Complaints/ComplaintsTab.vue'
import NewComplaint from './components/NewComplaint/NewComplaint.vue'
import HomePage from './components/AdminsPage/DefaultPage/HomePage.vue'
import AdminsComplaints from './components/AdminsPage/ConsumerComplaints/AdminsComplaints.vue'
import AdminDetails from './components/AdminsPage/Account/AdminDetails.vue'
import UserTickets from './components/AdminsPage/UserPage/UserTickets.vue'
import RegisterMember from './components/SignIn/RegisterMember.vue'
import LoginMember from './components/SignIn/LoginMember.vue'

const app= createApp(App)

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/register',component:RegisterMember,meta:{requireUnauth:true}},
        {path:'/login',component:LoginMember,meta:{requireUnauth:true}},
        {path:'/',redirect:'/alltickets',meta:{requireAuth:true}},
        {path:'/account',component:AccountDetails ,meta:{requireAuth:true}},
        {path:'/alltickets',component:ComplaintsTab,meta:{requireAuth:true}},
        {path:'/newTicket',component:NewComplaint,meta:{requireAuth:true}},
        {path:'/admin/home',component:HomePage,meta:{requireAuth:true}},
        {path:'/admin/user/:Id',component:UserTickets,props:true,meta:{requireAuth:true}},
        {path:'/admin/account',component:AdminDetails,meta:{requireAuth:true}},
        {path:'/admin/myTickets',component:AdminsComplaints,meta:{requireAuth:true}}
    ]
})


const store = createStore({
    state:{
        
            loggedInUserId:null,
            token:null
        
    },
    mutations:{
        setIdAndtoken(state,payLoad){
            state.loggedInUserId=payLoad.Id
            console.log(state.loggedInUserId)
            state.token=payLoad.Token
            console.log(state.token)
        },
        logOut(state){
            state.loggedInUserId=null;
            state.token=null;
        }
    },
    getters:{
        returnId(state){
            return state.loggedInUserId
        },
        returnToken(state){
            return state.token
        }
    }
})

router.beforeEach(function(to,_,next){
    if(to.meta.requireAuth && store.getters.returnToken==null){
        next('/register')
    }else if(to.meta.requireUnauth && store.getters.Token==null){
        next()
    }else{
        next()
    }
})

app.use(router);
app.use(store)
app.mount('#app')
