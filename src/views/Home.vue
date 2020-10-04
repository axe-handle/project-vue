<template>
  <div class="home">
    <el-container class="home_container">
      <!-- 头部布局 -->
      <el-header style="padding:0px;">
        <!-- 头部左边系统名称 -->
        <div class="header_left">
          xxx后台管理系统
        </div>
        <!-- /头部左边系统名称 -->
        <!-- 头部右边，头像和登录信息 -->
        <div class="header_rigth">
          <!-- 头部头像 -->
          <div class="right_img">
            <el-dropdown placement="bottom">
              <img src="../assets/img/Logo.jpg">
              <el-dropdown-menu  slot="dropdown">
                <el-dropdown-item icon="el-icon-setting" @click="dialogFormVisible = true" >个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout" icon="el-icon-switch-button" command="b">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- /头部头像 -->
          <!-- 头部登录信息 -->
            <div class="right-user">
              <div class="user-wellcome">
                欢迎您，{{adminName}}。
              </div>
              <div class="user-time">
                {{homeDate}}
              </div>
            </div>
          <!-- 头部登录信息 -->
        </div>
        <!-- /头部右边，头像和登录信息 -->
      </el-header>
      <!-- /头部布局 -->
      <!-- 侧边栏导航 -->
      <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">
          <!-- 展开、收起 -->
          <div class="contract" @click="contract">
              <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']"></i>
          </div>
          <el-menu
            default-active="2"
            class="el-menu-vertitle-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#dff9fb"
            text-color="#4f383e"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            :router="true">
              <MenuTree :menuList="this.menuList"></MenuTree>
          </el-menu> 
        </el-aside>
        <el-container>
          <el-main style="padding:0px;">
            <!--添加或编加弹窗-->
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="35%">
              <el-form :model="form" label-width="80px" :rules="rules">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>

            <tabs></tabs>
            <!-- 路由视图 -->
            <router-view></router-view>
          </el-main>
          <el-footer>
            <div class="pull-right" style="">
              <b>Version</b> 1.0.8
            </div>
            <div class="left-kk">
              <strong>Copyright &copy; 2020-2077 <a href="#">广东理工职业学院18移动应用开发班</a>.
              </strong>
              All rights reserved.
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <!--添加或编加弹窗-->
    
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import MenuTree from '@/components/MenuTree.vue';
import tabs from "../components/tabs.vue";
import { mapState } from "vuex";
var $vueIndex;
export default {
  name: 'Home',
  components: {
    MenuTree,
    tabs,
  },
  created(){
    //获得sessionStrore中的用户名
    this.adminName=sessionStorage.getItem("adminName");
     //跳转到首页面
      this.$router.push("/desktop");
  },
   computed: {
     
     ...mapState({
      //获取isCollapse收缩属性
      isCollapse: (state) => state.MenuStore.isCollapse,
    }),
  },
  mounted() {
    $vueIndex = this;
    this.showTime();
    setInterval(function(){
      $vueIndex.showTime();
    },1000)
  },
  data(){
    return{
      dialogFormVisible: false,
      isCollapse:false,
      homeDate: "",
      adminName:"",
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
       menuList: [
        {
          children: [
            {
              children: [],
              code: "sys:dept",
              createTime: 1586703509000,
              icon: "el-icon-copy-document",
              id: 33,
              isHome: 0,
              label: "部门管理",
              name: "departmentList",
              orderNum: 2,
              parentId: 17,
              path: "/departmentList",
              remark: "部门管理",
              type: "1",
              updateTime: 1586337139000,
              url: "/system/Department/DepartmentList"
            },
            {
              children: [],
              code: "sys:user",
              createTime: 1691464271000,
              icon: "el-icon-set-up",
              id: 18,
              isHome: 0,
              label: "岗位管理",
              name: "userList",
              orderNum: 3,
              parentId: 17,
              path: "/userList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/User/UserList"
            },
            {
              children: [],
              code: "sys:role",
              createTime: 1691464271000,
              icon: "el-icon-rank",
              id: 23,
              isHome: 0,
              label: "员工管理",
              name: "empList",
              orderNum: 4,
              parentId: 17,
              path: "/empList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Emp/EmpList"
            },
            {
              children: [],
              code: "sys:menu",
              createTime: 1691464271000,
              icon: "el-icon-menu",
              id: 28,
              isHome: 0,
              label: "权限管理",
              name: "menuList",
              orderNum: 5,
              parentId: 17,
              path: "/menuList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Menu/MenuList"
            }
          ],
          code: "sys:manage",
          createTime: 1691464271000,
          icon: "el-icon-menu",
          id: 17,
          isHome: 0,
          label: "系统管理",
          orderNum: 1,
          parentId: 0,
          path: "/system",
          type: "0",
          updateTime: 1691565988000
        },
        {
          children: [
            {
              children: [],
              code: "sys:goodsCategory",
              createTime: 1586703272000,
              icon: "el-icon-s-data",
              id: 36,
              isHome: 0,
              label: "分类管理",
              name: "goodCategory",
              orderNum: 1,
              parentId: 34,
              path: "/goodCategory",
              type: "1",
              updateTime: 1586683590000,
              url: "/goods/goodsCategory/goodsCategoryList"
            },
            {
              children: [],
              code: "sys:goodsBrand",
              createTime: 1586683924000,
              icon: "el-icon-tickets",
              id: 37,
              isHome: 0,
              label: "品牌管理",
              name: "goodsBrand",
              orderNum: 2,
              parentId: 34,
              path: "/goodsBrand",
              type: "1",
              updateTime: 1586683924000,
              url: "/goods/goodsBrand/goodsBrandList"
            }
          ],
          code: "sys:goods",
          createTime: 1586702987000,
          icon: "el-icon-picture",
          id: 34,
          isHome: 0,
          label: "商品管理",
          name: "",
          orderNum: 2,
          parentId: 0,
          path: "/goods",
          type: "0",
          updateTime: 1586683323000
        },
        {
          children: [
            {
              children: [],
              code: "sys:systemCode",
              createTime: 1587012282000,
              icon: "el-icon-files",
              id: 43,
              isHome: 0,
              label: "代码生成",
              name: "systemCode",
              orderNum: 0,
              parentId: 42,
              path: "/systemCode",
              type: "1",
              updateTime: 1586684646000,
              url: "/system/config/code"
            },
            {
              children: [],
              code: "sys:document",
              createTime: 1586748705000,
              icon: "el-icon-s-operation",
              id: 77,
              isHome: 0,
              label: "接口文档",
              name: "document",
              orderNum: 0,
              parentId: 42,
              path: "/document",
              type: "1",
              updateTime: 1586748705000,
              url: "/system/config/systemDocument"
            }
          ],
          code: "sys:systenConfig",
          createTime: 1586703003000,
          icon: "el-icon-receiving",
          id: 42,
          isHome: 0,
          label: "系统工具",
          name: "",
          orderNum: 3,
          parentId: 0,
          path: "/systenConfig",
          type: "0",
          updateTime: 1586684441000
        }
      ]
    };
    },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      
      //退出登录
      async logout() {
        sessionStorage.clear();
        this.$router.push("/");
      },
      contract(){
        this.isCollapse=!this.isCollapse;
      },
      //获取时间
      showTime() {
        var week = new Array(
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        );
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        this.homeDate =
          year +
          "." +
          (month < 10 ? "0" + month : month) +
          "." +
          day +
          " " +
          " " +
          (hour < 10 ? "0" + hour : hour) +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (second < 10 ? "0" + second : second) +
          "  " +
          (week[date.getDay()] || "");
      },
    },
  }
</script>
<style lang="less" scope>
  .home{
    height: 100%;
    }
    .home_container{
      height: 100%;
    }
    .el-header, .el-footer {
      background-color:#7efff5;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    // 侧边栏
    .el-aside {
      background-color: #dff9fb;
      color: #333;
      .el-menu{
        border-right: none;
      }
      .contract{
        background-color: #81ecec;
        font-size: 15px;
        height: 40px;
        font-weight: bold;
        line-height: 40px;
        letter-spacing: 0.2em;
        text-align: center;
        cursor: pointer;
      }
    }
    
    .el-main {
      background-color: #ffffff;
      color: #333;
    }
    
    body > .el-container {
      margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside {
      line-height: 260px;
    }
    .header_left{
      width: 200px;
      float: left;
      font-family: "PingFang SC";
      font-size: 20px;
      font-weight: bold;
      color: azure;
    }
    .header_rigth{
      height: 60px;
      // background-color: azure;
      float: right;
      line-height: 34px;
      color: azure;
    }
    .right-user{
      float: left;
      margin: 0px 10px;
      height: 60px;
      font-weight: bold;
    }
    .el-dropdown{
      line-height: 0px;
    }
    .header_rigth .el-dropdown img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .right_img{
      width: 60px;
      height: 60px;
      float: left;
    }
    .user-wellcome{
      font-size: 15px;
      height: 25px;
      font-weight: bolder;
    }
    .user-time{
      margin-top: 2px;
      height: 25px;
      font-size: 14px;
    }
     //footer样式
    .pull-right{
      // display: inline-block;
       float: right;
    }
    .left-kk{
      float: left;
    }
    .left-kk a{
      text-decoration: none;
      color: #f5f6fa;
    }
    //侧边菜单样式
    

</style>
