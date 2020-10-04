<template>
    <div>
      <template v-for="item in this.menuList">
        <el-submenu :disabled="item.disabled" :index="item.path" :key="item.path" v-if="item.children.length>0">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </template>
          <MenuTree :menuList="item.children">
          </MenuTree>
        </el-submenu>
        <el-menu-item 
        v-else
        :disabled="item.disabled"
        :index="item.url+''"
        :route="item.url+''"
        :key="item.id"
        @click="selectMenu(item)">
            <i :class="item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
      </template>
    </div>
</template>

<script>
export default {
  computed:{
   
  },
  name: "MenuTree",
  props:["menuList"],
  methods: {
    //菜单的点击事件
    selectMenu(item) {
      //设置选项卡
      this.$store.commit('selectMenu',item);
      //设置路由
      this.$router.push({name:item.name});
    },
  },
  
  data() {
    return {
      isCollapse: false,

    };
  },
};
</script>

<style lang="scss" scoped>
   .el-menu--collapse span,
   .el-menu--collapse i.el-submenu_icon-arrow{
     height: 0;
     width: 0;
     overflow: hidden;
     visibility: hidden;
     display: inline-block;
   }
</style>