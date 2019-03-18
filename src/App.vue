<template>
  <div id="app">
    <router-link to="/">List home</router-link>
    <router-link to="/tail">DetailList</router-link>
    <main-header-view></main-header-view>
    <router-view></router-view>  
    <!-- <main-list-view v-bind:propsdata="select_align"></main-list-view>  -->
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MainHeaderView from './views/MainHeaderView.vue'
import MainListView from './views/MainListView.vue'

export default {
  name: 'App',
  data: function(){
    return{
    }
  },
  components: {
    MainHeaderView,
    MainListView,
  },
}
</script>
<style scoped>
</style>
