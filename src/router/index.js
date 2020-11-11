import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import StudentList from '@/components/StudentList'
import StudentInfoList from '@/components/StudentInfoList'
import AddStudent from '@/components/AddStudent'
import ResetPwd from '@/components/ResetPwd'
import ToGetClass from '@/components/ToGetClass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/studentlist',
      name: 'StudentList',
      component: StudentList
    },
    {
      path: '/studentInfoList',
      name: 'StudentInfoList',
      component: StudentInfoList
    },
    {
      path: '/addstudent',
      name: 'AddStudent',
      component: AddStudent
    },
    {
      path: '/resetpwd',
      name: 'ResetPwd',
      component: ResetPwd
    },
    {
      path: '/toGetClass',
      name: 'ToGetClass',
      component: ToGetClass
    }
  ]
})
