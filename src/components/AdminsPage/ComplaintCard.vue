<template>
    <div class="mt-2 mb-2">
        <div  class=" container-fluid d-flex justify-content-around row ">
            <div class=" col-2 ">{{id}}</div>
            <div class=" col-2 ">{{time}}</div>
            <div class=" col-4 side-line">{{text}}</div>
            <div class=" col-2 " :class="{'text-success':status==='Resolved','text-danger':status==='Pending'}" >{{status}}</div>
            <div class="col-2" ><button class="btn btn-primary" :id="ComplaintId" @click="resolve(ComplaintId)">Solve</button></div>
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    props:['id','name','text','time','status']
}
</script>

<style scoped>
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