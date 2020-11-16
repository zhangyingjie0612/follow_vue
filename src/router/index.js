import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import StudentList from '@/components/StudentList'
import StudentInfoList from '@/components/StudentInfoList'
import AddStudent from '@/components/AddStudent'
import ResetPwd from '@/components/ResetPwd'
import ToGetClass from '@/components/ToGetClass'
import FollowMenu from '@/components/FollowMenu'
import Ateacher from '@/components/Ateacher'
import TStudentList from '@/components/TStudentList'
import TStuInfoList from '@/components/TStuInfoList'
import TStudentInfoList from '@/components/TStudentInfoList'
import TSchoolEvl from '@/components/TSchoolEvl'
import ChangePwd from '@/components/ChangePwd'
import Login from "../components/Login";
import DeptTable from "../components/DeptTable";
import CourseTable from "../components/CourseTable";
import AddScore from "../components/AddScore";

//修改首页面路由重复点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const router = new Router({
  routes: [
    /*hmt测试用*/
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },


    /*hmt测试用*/

    {
      path: '/helloWorld',
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
    },
    {
      path: '/followMenu',
      name: 'FollowMenu',
      component: FollowMenu,
      children: [
        {
          path: 'studentlist',
          name: 'StudentList',
          component: StudentList
        },
        {
          path: 'studentInfoList',
          name: 'StudentInfoList',
          component: StudentInfoList
        },
        {
          path: 'addstudent',
          name: 'AddStudent',
          component: AddStudent
        },
        {
          path: 'resetpwd',
          name: 'ResetPwd',
          component: ResetPwd
        },
        {
          path: "ateacher",
          name: "Ateacher",
          component: Ateacher,
          children: null
        },
        {
          path: "tStudentList",
          name: "TStudentList",
          component: TStudentList,
          children: null
        },
        {
          path: "tStuInfoList",
          name: "TStuInfoList",
          component: TStuInfoList,
          children: null
        },
        {
          path: "tStudentInfoList",
          name: "TStudentInfoList",
          component: TStudentInfoList,
          children: null
        },
        {
          path: "tSchoolEvl",
          name: "TSchoolEvl",
          component: TSchoolEvl,
          children: null
        },
        {
          path: "changePwd",
          name: "ChangePwd",
          component: ChangePwd,
          children: null
        },
        {
          path: 'toGetClass',
          name: 'ToGetClass',
          component: ToGetClass
        },

        /*hmt*/
        {
          path: 'deptTable',
          name: 'DeptTable',
          component: DeptTable
        },
        {
          path: 'courseTable',
          name: 'CourseTable',
          component: CourseTable
        },
        {
          path: 'addScore',
          name: 'AddScore',
          component: AddScore
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') { // 当路由为login时就直接下一步操作
    next();
  } else { // 否则就需要判断
    if(sessionStorage.userName){  // 如果有用户名就进行下一步操作
      next()
    }else{
      next({path: '/login'})  // 没有用户名就跳转到login页面
    }
  }
})

export default router
