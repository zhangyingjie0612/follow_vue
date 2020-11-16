<template>
  <div>
    <el-table
      :data="teacherListData"
      stripe
      @selection-change="handleSelectionChange"
      style="width: 90%;margin-left: 5%;height: 650px;margin-top: 2%">
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <span style="font-size: x-large">教师信息管理</span>
          <div style="float: right;margin-right: 20px">
            <el-input placeholder="输入教师姓名搜索" style="width: 200px" v-model="filters.f1"></el-input>
            <el-button size="small" icon="el-icon-search" circle v-on:click="refreshList()"></el-button>
            <el-button type="primary"size="small" icon="el-icon-plus" circle v-on:click="addTeacher = true;addWin()"></el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" circle @click="delOrderByIds"></el-button>
<!--            <el-button size="small" icon="el-icon-search" circle @click="refreshList()"></el-button>-->
          </div>
        </template>
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
      <el-table-column label="操作"          align="center"
                       prop="evlScore">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" :visible.sync="dialogTableVisible"
                     @click="dialogTableVisible = true;handleEdit1(scope.$index, scope.row)"
          >查看</el-button>
          <el-button size="mini" type="success" :visible.sync="updateTeacher"
                     @click="updateTeacher = true,handleEdit1(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
    <!--   查看教师信息 -->
    <el-dialog title="教师详细信息" :visible.sync="dialogTableVisible" width="740px">
      <el-form :model="teacherDate"style="width: 80%;margin-left: 0%">
        <table border="0" class="table1" width="700">
          <tr><td width="350"><el-form-item label="教师姓名：" :label-width="formLabelWidth">
            <el-input readonly="" v-model="teacherDate.userName" autocomplete="off"></el-input>
          </el-form-item></td><td>
            <el-form-item label="照片：" :label-width="formLabelWidth"></el-form-item>
          </td></tr>
          <tr><td><el-form-item label="性别：" :label-width="formLabelWidth">
            <el-input readonly=""v-model="teacherDate.sex" autocomplete="off"></el-input>
          </el-form-item></td><td rowspan="3">
            <div class="photo">
                <img  v-if="teacherDate.photo" :src="teacherDate.photo" class="avatar">
            </div>
          </td></tr>
          <tr><td><el-form-item label=" 出生年月：" :label-width="formLabelWidth">
            <el-input readonly=""v-model="teacherDate.birthday" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item label="电话：" :label-width="formLabelWidth">
            <el-input readonly=""v-model="teacherDate.telephone" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item label="身份证号：" :label-width="formLabelWidth">
            <el-input readonly=""v-model="teacherDate.idCard" autocomplete="off"></el-input>
          </el-form-item></td>
            <td><el-form-item label="状态：" :label-width="formLabelWidth">
                <el-input readonly=""v-model="teacherDate.flag" autocomplete="off"></el-input>
            </el-form-item></td></tr>
          <tr><td><el-form-item label="电子邮件：" :label-width="formLabelWidth">
            <el-input readonly=""v-model="teacherDate.email" autocomplete="off"></el-input>
          </el-form-item></td><td><el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input readonly=""v-model="teacherDate.note" autocomplete="off"></el-input>
          </el-form-item></td></tr>
        </table>
      </el-form>
    </el-dialog>
<!--   编辑教师信息 -->
    <el-dialog title="编辑教师信息" :visible.sync="updateTeacher" width="750px":before-close="handleDialogClose">
      <el-form status-icon :model="teacherDate"style="width: 80%;margin-left: 0%":rules="rules" ref="teacherDate">
        <table border="0" class="table1" width="700">
          <tr><td width="350"><el-form-item prop="userName"label="教师姓名：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate.userName" autocomplete="off"></el-input>
          </el-form-item></td><td>
            <el-form-item label="照片：" :label-width="formLabelWidth"></el-form-item>
          </td></tr>
          <tr><td>
            <el-form-item prop="sex"label="性别：" :label-width="formLabelWidth">
            <el-radio-group v-model="teacherDate.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item></td><td rowspan="3">
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
          <tr><td><el-form-item prop="birthday"label=" 出生年月：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="teacherDate.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              style="width:100%"
              placeholder="选择出生日期">
            </el-date-picker>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="telephone"label="电话：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate.telephone" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="idCard"label="身份证号：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate.idCard" autocomplete="off"></el-input>
          </el-form-item></td>
            <td><el-form-item prop="flag" label="状态：" :label-width="formLabelWidth">
              <el-radio-group v-model="teacherDate.flag">
                <el-radio label="在职"></el-radio>
                <el-radio label="离职"></el-radio>
              </el-radio-group>
            </el-form-item></td>
          </tr>
          <tr><td><el-form-item prop="email"label="电子邮件：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate.email" autocomplete="off"></el-input>
          </el-form-item></td><td><el-form-item prop="note" label="备注：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate.note" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td></td><td><div slot="footer" class="dialog-footer">
            <el-button @click="handleDialogClose">取 消</el-button>
            <el-button type="primary" @click="updateTeacher1('teacherDate')">确 定</el-button>
          </div></td></tr>
        </table>
      </el-form>
    </el-dialog>
    <!--   新增教师信息 -->
    <el-dialog title="新增教师" :visible.sync="addTeacher" width="750px" :before-close="handleDialogClosein">
      <el-form status-icon :model="teacherDate1"style="width: 80%;margin-left: 0%":rules="rules" ref="teacherDate1">
        <table border="0" class="table1" width="710">
          <tr><td width="350"><el-form-item prop="userName" label="教师姓名：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate1.userName" autocomplete="off"></el-input>
          </el-form-item></td><td>
            <el-form-item label="照片：" :label-width="formLabelWidth"></el-form-item>
          </td></tr>
          <tr><td>
            <el-form-item prop="sex"label="性别：" :label-width="formLabelWidth">
            <el-radio-group v-model="teacherDate1.sex">
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
            <el-form-item prop="birthday"label=" 出生年月：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="teacherDate1.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              style="width:100%"
              placeholder="选择出生日期">
            </el-date-picker>
            </el-form-item>
          </td></tr>
          <tr><td><el-form-item prop="telephone"label="电话：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate1.telephone" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="idCard"label="身份证号：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate1.idCard" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td><el-form-item prop="email"label="电子邮件：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate1.email" autocomplete="off"></el-input>
          </el-form-item></td><td><el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input v-model="teacherDate1.note" autocomplete="off"></el-input>
          </el-form-item></td></tr>
          <tr><td></td><td><div slot="footer" class="dialog-footer">
            <el-button @click="handleDialogClosein">取 消</el-button>
            <el-button type="primary" @click="addTeacher1('teacherDate1')">确 定</el-button>
          </div></td></tr>
        </table>
      </el-form>
    </el-dialog>
    <div>
      <el-pagination
        @current-change="getTeaListByPage"
        :current-page.sync="curPage"
        :page-size="pagesize"
        :pager-count="7"
        :total="totalTeacherData.length"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
    export default {
        name: "Ateacher",
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
          rules: {//表单验证
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
            idCard: [
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
            f1:""
          },
          dialogTableVisible: false,//查看弹框
          multipleSelection:[],//复选框监听的数组
          updateTeacher:false,//编辑弹框
          addTeacher:false,//新增弹框
          imageUrl: '',//回显的照片路径
          imgPath: '',//返回照片的名字
          formLabelWidth:"110px",
          pagesize:10,//一页放多少数据
          curPage:1,
          //分页教师数据
          teacherListData: [],
          teacherDate:{//编辑/查看表单的数据
            birthday:'',
            deptNo:1,
            email:'',
            flag:'',//就职状态
            pwd:'',
            idCard:'',
            roleId:1,
            sex:'',
            telephone:'',
            userId:'',
            userName:'',
            note:'',//备注
          },
          teacherDate1:{//新增表单的数据
            birthday:'',
            deptNo:1,
            email:'',
            flag:1,
            pwd:'123',
            roleId:1,
            sex:'',
            telephone:'',
            idCard:'',
            photo:'',
            userId:'',
            userName:'',
          },
          userid:sessionStorage.getItem("userId"),
          totalTeacherData: [],
          userName:"all",//对应filters的f1,用于发送axios请求
        }
      },
      methods:{
        //  编辑时点取消会刷新
        handleDialogClose() {
          this.resetForm('teacherDate');
          this.updateTeacher = false
          this.winload()
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //  新增时点取消会刷新
        handleDialogClosein() {
          this.resetForm('teacherDate1');
          this.addTeacher = false
          this.winload()
        },
        /*url不能传‘’空字符串，故用userName替换之*/
        checkFilter(){
          if (""!==this.filters.f1 ){
            this.userName=this.filters.f1
          }else {
            this.userName="all"
          }
        },
        //    获取分页教师列表
        getTeaListByPage(){
          this.checkFilter();
          axios.get('/getTeacher/'+this.curPage+'/'+this.pagesize+'/'+this.userName).then(res => {
            this.teacherListData = res.data;
            for (var i in this.teacherListData) {
              if (this.teacherListData[i].flag == 1){
                this.teacherListData[i].flag="在职"
              }
              else {
                this.teacherListData[i].flag="离职"
              }
            }
          })
        },
        //  获取产品列表
        getTeaList(){
          this.checkFilter();
          axios.get('getTeacherByLike/'+this.userName).then(res =>{
            this.totalTeacherData = res.data
            // console.log(null);
          })
        },
        updateTeacher1(teacherDate) {//编辑
          this.$refs[teacherDate].validate((valid) => {
            if (valid) {
              console.log(this.imageUrl.substring(0,29));
              console.log(this.imageUrl.substring(29));
              //判断照片是否被修改
              if ("http://localhost:8080/images/" == this.imageUrl.substring(0,29)) {
                this.imageUrl=this.imageUrl.substring(29)
                this.teacherDate.photo=this.imageUrl
              }else {
                console.log( this.imgPath);
                this.teacherDate.photo=this.imgPath
              }
              if (this.teacherDate.flag == "在职"){
                this.teacherDate.flag=1
              }
              else {
                this.teacherDate.flag=2
              }
              // console.log( this.teacherDate.photo);
              axios.post('/updateTeacher/',this.teacherDate).then(res => {
                if(res.data){
                  this.updateTeacher=false;
                  this.$message({
                    message: '编辑成功',
                    type: 'success',
                    offset:350
                  });
                  this.winload();
                }else{
                  this.$message({
                    message: '编辑失败',
                    type: 'warning',
                    offset:350
                  });
                }
              })
            } else {
              this.$message({
                message: '提交失败,请按要求填写信息',
                type: 'warning',
                offset:350
              });
              return false;
            }
          });
        },
        //编辑查看时获取改行数据
        handleEdit1(index, row) {
          console.log(row);
          this.teacherDate=row
          this.imageUrl=this.teacherDate.photo
          // console.log(row.photo.require());
        },
        //搜索
        refreshList(){
          this.getTeaListByPage();
          this.getTeaList();
        },
        addWin(){//清空
          this.imageUrl=null
        },
        addTeacher1(teacherDate1){//新增
          this.$refs[teacherDate1].validate((valid) => {
            if (valid) {
              this.teacherDate1.photo=this.imgPath
              console.log(this.teacherDate1)
              axios.post('addTeacher/',this.teacherDate1).then(res => {
                if(res.data){
                  this.addTeacher=false;
                  this.$message({
                    message: '新增成功',
                    type: 'success',
                    offset:350
                  });
                  this.winload();
                }else{
                  this.$message({
                    message: '新增失败',
                    type: 'warning',
                    offset:350
                  });
                }
              })
            } else {
              this.$message({
                message: '提交失败,请按要求填写信息',
                type: 'warning',
                offset:350
              });
              return false;
            }
          });
        },
      //  批量删除
        delOrderByIds(){
          //在删除前判断该教师是否在职，返回一个boolean值，若存在则提示无法删除
          let jug = false
          for (let i = 0; i < this.multipleSelection.length; i++) {
            if(this.multipleSelection[i].flag=="在职"){
              console.log(this.multipleSelection[i].flag)
              jug = true
            }
          }
          if (this.multipleSelection.length== 0){
            this.$message({
              message: '请先勾选要删除的项',
              type: 'warning',
              offset:350
            });
          } else if (jug){
            this.$message({
              message: '存在在职教师，删除失败',
              type: 'warning',
              offset:350
            });
          } else{
            this.$confirm('确认删除吗?', '提示', {
              type: 'warning'
            }).then(()=>{
              let userIds = [];
              for (let i = 0; i < this.multipleSelection.length; i++) {
                userIds.push(this.multipleSelection[i].userId);
              }
              axios.get('/deleteTeacherByIds/'+userIds).then(res=>{
                if(res.data){
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                    offset:350
                  });
                  this.winload();
                }else{
                  this.$message({
                    message: '删除成功',
                    type: 'warning',
                    offset:350
                  });
                }
              })
            })
          }
        },
        //监听多选
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection)
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
        },
        //进入页面加载
        winload(){
          this.getTeaListByPage();
          this.getTeaList();
        }
      },
      mounted() {
        this.winload();
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
