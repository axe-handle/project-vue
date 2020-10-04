<template>
    <!-- 登录表单容器 -->
    <div class="login_container">
        <!-- 登录区域 -->
        <div class="login_body">
            <div class="login_avatar">
                <img src="../assets/img/Logo.jpg" >
            </div>
            <!-- 表单 -->
            <el-form 
              :model="loginForm" 
              :rules="loginRules" 
              ref="loginForm" 
              label-width="100px"
              size="medium"
              class="Login_Form">
                <el-form-item  prop="adminName">
                    <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="loginForm.adminName"></el-input>
                </el-form-item>
                <el-form-item label prop="password">
                    <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item label prop="code">
                  <el-row :gutter="10">
                    <el-col :span="16">
                      <el-input v-model="loginForm.code"  placeholder="请输入验证码"></el-input>
                    </el-col>
                    <el-col :span="8">
                      <span><img  @click="getImage" :src="imgSrc" class="codeImg" /></span>
                      
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginSubmit">立即登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name:'login',
        created(){
          this.getImage();
        },

        data() {
            return {
              imgSrc: '',
              loginForm: {
                adminName: '',
                password:'',
                code:'',               
              },
              loginRules: {
                adminName: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                  { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                ],
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                code:[
                    {required:true,message:'请输入验证码',trigger:'blur'}
                ],
              }
            };
        },
        methods: {
          //获取验证码
            getImage() {
              let res =
                "http://localhost:8080/knife/ImageCode?t=" + new Date().getTime();
                this.imgSrc = res;
            },
            

        //响应登录事件
          async loginSubmit() {
            let _this = this;
            _this.$refs.loginForm.validate(async (valid) => {
              if (valid) {
                //定义变量
                let parm = {
                  adminName: _this.loginForm.adminName,
                  password: _this.loginForm.password,
                  code: _this.loginForm.code,
                };
                let { data: res } = await _this.$http.post("knife/login", parm);
                console.log("登录测试" + res.code);
                if (res.code == 100) {
                  //将用户名保存到sessionStorage中
                  sessionStorage.setItem("adminName", _this.loginForm.adminName)
                  //跳转到home页面

                  this.$router.push("/home");
                } else {
                  this.$message({
                    type: "error",
                    message: res.msg,
                  });
                  this.$refs["loginForm"].resetFields();
                  return;
                }
              }
            });
          },
          //重置表单
          resetSubmit() {
            this.$refs.loginForm.resetFields();
          },

        },
    }
</script>

<style lang="less" scoped>
    .login_container{
        height: 100%;
        background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/slider-2.jpg');
        background-position:center;
        
    }
    .login_body{
        width: 450px;
        height: 380px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        //头像样式
        .login_avatar{
            width: 130px;
            height: 130px;
            border: 1px solid #eeeeee;
            border-radius: 50%;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
            margin: -65px auto;
            background-color: honeydew;
            
            img{
               width: 100%;
                height: 100%;
                border-radius: 50%;
            }

        }

        
    }
    .Login_Form{
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;
    }
    .Login_Form /deep/ .el-form-item__content{
      margin-left: 0 !important;
    }
    .Login_Form /deep/ .el-input__inner{
       background: rgba(0, 0, 0, 0.5)!important; 
    }
    .codeImg {
        width: 100%;
        cursor: pointer;
      }
   
</style>