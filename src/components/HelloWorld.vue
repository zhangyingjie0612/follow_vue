<template>
  <div class="hello">
    <el-button  size="mini" @click="admin()" type="danger"  circle>admin</el-button>
    <el-button  size="mini" @click="techer()" type="danger"  circle>techer</el-button>
    <el-button  size="mini" @click="xiangmujingli()" type="danger" circle>xiangmujingli</el-button>
    <el-button  size="mini" @click="test()" type="danger"  circle>test</el-button>
    <el-button  size="mini" @click="test1()" type="danger"  circle>test1</el-button>
    <img src="../assets/logo.png" alt="">
    <h1>{{ msg }}
      <br>
      {{this.$store.state.count}}
    </h1>
    <button @click="changeValue">count++</button>
    <h2>Essential Links</h2>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        userid:1,
        msg: 'Welcome to Your Vue.js App'
      }
    },methods:{
      changeValue:function () {
        // 通过store.commit方法触发状态更变
        this.$store.commit(('increment'))
      },
      admin(){
        this.userid=1
        sessionStorage.setItem("userid","1")
        sessionStorage.setItem("activeIndex","/followMenu/studentlist")
        this.$router.push({path:"/followMenu/studentlist"})
      },
      techer(){
        this.userid=2
        sessionStorage.setItem("userid","2")
        sessionStorage.setItem("activeIndex","/followMenu/tStudentList")
        this.$router.push({path:"/followMenu/tStudentList"})
      },
      test(){
        this.$router.push("/test")
      },
      test1(){
        this.$router.push("/test1")
      },
      xiangmujingli(){
        this.$router.push("/")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
