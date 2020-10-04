import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    //设置菜单的收缩
    isCollapse: false,
    // 左侧菜单数据
    menu_data:[],
   //当前激活的选项卡
   editableTabsValue:'desktop',
   //tabs选项卡数据
   tabs:[
    {
      title:'首页',
      name:'desktop'
    }
   ]
  },
  mutations: {
    //菜单点击时调用
    selectMenu(state,val){
      console.log("测试菜单调用:"+val.label);
      //1.把当前点击的菜单对易用，加到tabs里面
      let res=state.tabs.findIndex(item=>item.name===val.name);
      //2、判断tabs是否存在，不存才加到tabs
      if(res==-1){
        let obj={};
        obj.title=val.label;
        obj.name=val.name;
        state.tabs.push(obj);
      }
      //3、设置当前选中对象
      state.editableTabsValue=val.name;
      //设置当前打开的选项卡
      sessionStorage.setItem('tabsList',JSON.stringify(state.tabs));
    },
    //设置当前选中选项卡
    getTabs(state){
      let tabs=sessionStorage.getItem('tabsList');
      if(tabs){
        let currentTabsList=JSON.parse(tabs);
        state.tabs=currentTabsList;
      }
    },
    //设置当前激活的选项卡
    setActiveTabs(state,val){
      state.editableTabsValue=val;
    },
    //获取菜单数据和生成路由
    getMenuList(state,router){
      console.log("测试："+router);
     //1.取出菜单数据
     let menuList=sessionStorage.getItem('menuList');
     //2.设置菜单数据
     if(menuList){
       state.menu_data=JSON.parse(menuList);
     }
     //3.取出路由数据
     let oldRouterList=sessionStorage.getItem('routerList');
     let routerList=[];
     if(oldRouterList){
      routerList=JSON.parse(oldRouterList);
     }
     //4.动态生成路由
     //4.1获取原来的路由
     let oldRouter=router.options.routes;
     //遍历后台返回的路由数据，动态生成路由
     // component: () => import( '@/views/system/Department/DepartmentList.vue')
     routerList.forEach(item => {
       item.component=()=>import(`@/views${item.url}.vue`);
       oldRouter[1].children.push(item);
       //5.添加到现有路由里面
       router.addRoutes(oldRouter);
     });
    },
    //设置图标收缩属性
    setOpenOrClose(state){
      state.isCollapse=!state.isCollapse;
    }
  },
  actions: {
  }
}
