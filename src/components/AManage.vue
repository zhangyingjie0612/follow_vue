<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true">
        <!--filters是条件查询的过滤器-->
        <el-form-item>
          <el-input v-model="filters.f1" placeholder="经理姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="refreshList()">查询</el-button>
          <el-button type="primary" v-on:click="addManage = true , addWin()">新增</el-button>
          <el-button type="danger"  @click="delOrderByIds">删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="empData"
      stripe
      @selection-change="handleSelectionChange"
      style="width: 80%;margin-left: 10%">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="手机号码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center">
      </el-table-column>
      <el-table-column label="操作"
                       prop="evlScore">
        <template slot-scope="scope">
          <el-button size="mini" :visible.sync="dialogTableVisible"
                     @click="dialogTableVisible = true,handleEdit1(scope.$index, scope.row)"
          >查看</el-button>
          <el-button size="mini" :visible.sync="updateManage"
                     @click="updateManage = true,handleEdit1(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--   查看经理信息 -->
    <el-dialog title="经理详细信息" :visible.sync="dialogTableVisible" width="740px">
      <el-form :model="user" style="width: 80%;margin-left: 0%">
        <table border="0" class="table1" width="700">
          <tr><td width="350"><el-form-item label="经理姓名：" :label-width="formLabelWidth">
            <el-input v-model="user.userName" autocomplete="off"></el-input>
          </el-form-item></td><td>
            <el-form-item label="照片：" :label-width="formLabelWidth"></el-form-item>
          </td></tr>
          <tr><td><el-form-item label="性别：" :label-width="formLabelWidth">
            <el-input v-model="user.sex" autocomplete="off"></el-input>
          </el-form-item></td><td rowspan="4">
            <div class="photo">
                <img  v-if="user.photo" :src="user.photo" class="avatar">
            </div>
          </td></tr>
          <tr><td><el-form-item label=" 出生年月：" :label-width="formLabelWidth">
            <el-input v-model="user.birthday" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item label="电话：" :label-width="formLabelWidth">
            <el-input v-model="user.telephone" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item label="身份证号：" :label-width="formLabelWidth">
            <el-input v-model="user.idcard" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item label="电子邮件：" :label-width="formLabelWidth">
            <el-input v-model="user.email" autocomplete="off"></el-input>
          </el-form-item></td><td><el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input v-model="user.note" autocomplete="off"></el-input>
          </el-form-item></td></tr>
        </table>
      </el-form>
    </el-dialog>
<!--   编辑经理信息 -->
    <el-dialog title="编辑经理信息" :visible.sync="updateManage" width="750px">
      <el-form status-icon :model="user" style="width: 80%;margin-left: 0%":rules="rules" ref="user">
        <table border="0" class="table1" width="700">
          <tr><td width="350"><el-form-item prop="userName"label="经理姓名：" :label-width="formLabelWidth">
            <el-input v-model="user.userName" autocomplete="off"></el-input>
          </el-form-item></td><td>
            <el-form-item label="照片：" :label-width="formLabelWidth"></el-form-item>
          </td></tr>
          <tr><td>
            <el-form-item prop="sex"label="性别：" :label-width="formLabelWidth">
            <el-radio-group v-model="user.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item></td><td rowspan="4">
            <div class="photo">
              <el-upload
                class="avatar-uploader"
                name="picture"
                action="http://localhost:8080/up/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </td></tr>
          <tr><td><el-form-item prop="birthday" label=" 出生年月：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="user.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              style="width:100%"
              placeholder="选择出生日期">
            </el-date-picker>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="telephone" label="电话：" :label-width="formLabelWidth">
            <el-input v-model="user.telephone" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="idcard" label="身份证号：" :label-width="formLabelWidth">
            <el-input v-model="user.idcard" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="email" label="电子邮件：" :label-width="formLabelWidth">
            <el-input v-model="user.email" autocomplete="off"></el-input>
          </el-form-item></td><td><el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input v-model="user.note" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td></td><td><div slot="footer" class="dialog-footer">
            <el-button @click="updateManage = false">取 消</el-button>
            <el-button type="primary" @click="updateManage1('user')">确 定</el-button>
          </div></td></tr>
        </table>
      </el-form>
    </el-dialog>
    <!--   新增经理信息 -->
    <el-dialog title="新增经理" :visible.sync="addManage" width="750px">
      <el-form status-icon :model="user1" style="width: 80%;margin-left: 0%" :rules="rules" ref="user1">
        <table border="0" class="table1" width="710">
          <tr><td width="350"><el-form-item prop="userName" label="经理姓名：" :label-width="formLabelWidth">
            <el-input v-model="user1.userName" autocomplete="off"></el-input>
          </el-form-item></td><td>
            <el-form-item label="照片：" :label-width="formLabelWidth"></el-form-item>
          </td></tr>
          <tr><td>
            <el-form-item prop="sex"label="性别：" :label-width="formLabelWidth">
            <el-radio-group v-model="user1.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          </td><td rowspan="4">
            <div class="photo">
              <el-upload
                class="avatar-uploader"
                name="picture"
                action="http://localhost:8080/up/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </td></tr>
          <tr><td>
            <el-form-item prop="birthday" label=" 出生年月：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="user1.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              style="width:100%"
              placeholder="选择出生日期">
            </el-date-picker>
            </el-form-item>
          </td></tr>
          <tr><td><el-form-item prop="telephone"label="电话：" :label-width="formLabelWidth">
            <el-input v-model="user1.telephone" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="idcard"label="身份证号：" :label-width="formLabelWidth">
            <el-input v-model="user1.idcard" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="email"label="电子邮件：" :label-width="formLabelWidth">
            <el-input v-model="user1.email" autocomplete="off"></el-input>
          </el-form-item></td><td><el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input v-model="user1.note" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td></td><td><div slot="footer" class="dialog-footer">
            <el-button @click="addManage = false">取 消</el-button>
            <el-button type="primary" @click="addManage1('user1')">确 定</el-button>
          </div></td></tr>
        </table>
      </el-form>
    </el-dialog>
<!--    批量删除-->
    <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
      <span>确定要删除吗</span>
      <span slot="footer">
        <el-button type="primary" @click="multiDeleteVisible=false">取 消</el-button>
        <el-button type="primary" @click="multiDelete">确 定</el-button>
        </span>
    </el-dialog>
    <div>
      <el-pagination
        @current-change="getEmpListByPage"
        :current-page.sync="curPage"
        :page-size="pagesize"
        :pager-count="7"
        :total="totalEmpData.length"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "AManage",
      data() {
        // 手机号验证
        var checkPhone = (rule, value, callback) => {
          const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
          if (!value) {
            return callback(new Error('电话号码不能为空'))
          }
          setTimeout(() => {
            if (!Number.isInteger(+value)) {
              callback(new Error('请输入数字值'))
            } else {
              if (phoneReg.test(value)) {
                callback()
              } else {
                callback(new Error('电话号码格式不正确'))
              }
            }
          }, 100)
        };
        return {
          rules: {
            userName: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            birthday: [
              { required: true, message: '请选择出生日期', trigger: 'change' }
            ],
            telephone: [
              {required: true, validator: checkPhone, trigger: 'blur' }
              ],
            idcard: [
              { required: true, message: '请填写证件号码', trigger: 'blur' },
              {
                pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                message: '证件号码格式有误！',
                trigger: 'blur'
              }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ]
          },
          filters:{//模糊查询的过滤器，绑定input框
            f1:"",
            f2:"",
          },
          dialogTableVisible: false,
          dialogTableVisible1: false,
          multiDeleteVisible:false,
          multipleSelection:[],
          updateManage:false,
          addManage:false,
          imageUrl: '',
          imgPath: '',
          formLabelWidth:"110px",
          pagesize:5,
          curPage:1,

          form: {
            stuid:'',
            userName:'',
            evlScore:'',
            evlContent:''
          },
          //分页员工数据
          empData: [],
          aData:'',
          user:{
            userId:'',
            birthday:'',
            email:'',
            idcard:'',
            sex:'',
            telephone:'',
            userName:'',
            note:'',
          },
          user1:{
            userId:'',
            birthday:'',
            email:'',
            idcard:'',
            sex:'',
            telephone:'',
            userName:'',
            note:'',
          },
          totalEmpData: [],
          userName:"all",//对应filters的f1,用于发送axios请求
          deptName:"all",
          classDate:[],
          asd:null
        }
      },
      methods:{
        /*url不能传‘’空字符串，故用stuname替换之*/
        checkFilter(){
          if (""!==this.filters.f1 ){
            this.userName=this.filters.f1
          }else {
            this.userName="all"
          }
          if (""!==this.filters.f2 ){
            this.deptName=this.filters.f2
          }else {
            this.deptName="all"
          }
        },
        //    获取分页员工列表
        getEmpListByPage(){
          this.checkFilter();
          axios.get('/getManagesByPage/'+this.curPage+'/'+this.pagesize+'/'+this.userName+'/'+this.deptName).then(res => {
            this.empData = res.data;
          })
        },
        //  获取产品列表
        getEmpList(){
          this.checkFilter();
          axios.get('getManagesByLike/'+this.userName+'/'+this.deptName).then(res =>{
            this.totalEmpData = res.data
            // console.log(null);
          })
        },
        updateManage1(user) {//编辑
          this.$refs[user].validate((valid) => {
            if (valid) {
              // console.log(this.imageUrl.substring(0,18));
              // console.log(this.imageUrl.substring(18));
              /*if ("../../static/imgs/" == this.imageUrl.substring(0,18)) {
                this.imageUrl=this.imageUrl.substring(18)
                this.user.photo=this.imageUrl
              }else {
                // console.log( this.imgPath);
                this.user.photo=this.imgPath
              }*/
              // console.log( this.user.photo);
              axios.post('/toUpdateManage',this.user).then(res => {
                if(res.data>0){
                  this.updateManage = false;
                  alert("编辑成功")
                  location.reload()
                }else{
                  alert("编辑失败")
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        handleEdit1(index, row) {
          console.log(row);
          this.user=row
          this.photo1=this.user.photo
          this.imageUrl=this.user.photo
          // console.log(row.photo.require());
        },

        refreshList(){
          this.getEmpListByPage();
          this.getEmpList();
        },
        addWin(){
          this.imageUrl=null
        },
        addManage1(user1){//新增
          this.$refs[user1].validate((valid) => {
            if (valid) {
              this.user1.photo=this.imgPath
              console.log(this.user1)
              axios.post('toAddManage/',this.user1).then(res => {
                if(res.data){
                  this.addManage = false;
                  alert("新增成功")
                  location.reload()
                }else{
                  alert("新增失败")
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      //  批量删除
        delOrderByIds(){
          this.multiDeleteVisible=true;
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection)
        },
        multiDelete() {debugger;
          this.multiDeleteVisible = false;
          const length = this.multipleSelection.length;
          let userIds = [];
          for (let i = 0; i < length; i++) {
            userIds.push(this.multipleSelection[i].userId);
          }
          console.log(userIds)
          axios.get('/toDelManages/'+userIds).then(res=>{
            if(res.data){
              alert("删除成功")
              location.reload()
            }else{
              alert("删除失败")
            }
          })
        },
      //  图片上传
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.imgPath=file.response
          console.log(file)
          console.log(this.imgPath)
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      },
      mounted() {
        this.getEmpListByPage();
        this.getEmpList();
      }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #409EFF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 230px;
    height: 230px;
    line-height: 230px;
    text-align: center;
  }
  .avatar {
    width: 230px;
    height: 230px;
    display: block;
  }
  .photo{
    position: relative;
    border: 1px dashed #d9d9d9;
    width: 230px;
    height: 230px;
    line-height: 230px;
    margin-top: -90px;
    margin-left: 80px;
  }
</style>
