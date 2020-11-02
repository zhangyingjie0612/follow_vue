import Vue from 'vue'
import Vuex from 'vuex'

//显示的声明vuex
Vue.use(Vuex)

//创建vuex的实例
const store =new Vuex.Store({
  state:{
    //键值对的形式
    count:0
  },
  //如果要修改state属性中的值，要通过提交mutations的方式
  mutations:{
    increment(state){
      state.count++
    }
  }
})
export default store
