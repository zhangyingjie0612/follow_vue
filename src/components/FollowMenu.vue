<template>
  <div>
    <el-container style="height: 820px; border: 1px solid #eee">
      <el-header style="font-size: 12px;height: 65px">
        <div style="float: left">
          <span style="font-size: 18px;font-weight:bolder;font-family: PingFang SC;">金桥学员成长跟踪系统</span>
        </div>
        <div align="right">
<!--          <span>{{this.$store.state.currentUser.uname}}</span>-->
<!--          <el-button @click="exit()"style="cursor: pointer"icon="el-icon-delete"></el-button>-->
          <el-button  size="small" @click="exit()"   >退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 755px">
          <el-menu :default-active="activeIndex">
            <navigation-item v-for="(menu,i) in adminMenus" :key="i" :item="menu"/>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios/index';
  import NavigationItem from "./NavigationItem"; //引入菜单
    export default {
        name: "FollowMenu",

      data() {
          return{
            activeIndex:sessionStorage.getItem("activeIndex"),
            adminMenus: [],
            userid:sessionStorage.getItem("userid"),
          }
      },
      methods: {
        getCurrentMenu () {
          // 获取当前页面 菜单刷新后能自动选中
          // this.activeIndex = ""
        },

        getMenu() {
          axios.get('/getMenu/' + this.userid).then(res => {
            this.adminMenus = res.data;
          })
        },
        exit(){
          this.$router.push("/")
        }
      },
      mounted() {
        this.getCurrentMenu();
      } ,
      created() {
        this.getMenu();
      },
      components: {
        "navigation-item": NavigationItem
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
