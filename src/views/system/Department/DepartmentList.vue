<template>
  <el-main>
    <!--搜索框 -->
    <el-form :model="deptForm" size="mini" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model=" deptForm.deptName" placeholder="请输入部门名称"></el-input>
          </el-form-item>
        </el-col>
        <el-button
          class="searchBtn"
          type="primary"
          size="mini"
          @click="seachBtn"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          class="newBtn"
          type="primary"
          size="mini"
          icon=" el-icon-plus"
          @click="addDept"
        >新增</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAllDept">删除</el-button>
      </el-row>
    </el-form>
    <!--数据列表 -->
    <el-table
      :data="tableData"
      size="mini"
      :height="tableHeight"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%"
    >
      <!--添加该选项 -->
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="deptId" label="#" width="100" align="center"></el-table-column>
      <el-table-column prop="deptNo" label="部门编号" width="210"></el-table-column>
      <el-table-column prop="deptName" label="部门名称" width="210"></el-table-column>
      <el-table-column prop="enabled" label="是否可用" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.enabled==1">是</span>
          <span v-else-if="scope.row.enabled==0">否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210">
        <template slot-scope="scope">
          <!--编辑 -->
          <el-button
            @click.native.prevent="editRow(scope.row)"
            type="success"
            icon="el-icon-edit"
            size="mini"
          ></el-button>
          <!--删除-->
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!--添加或编加弹窗或详情-->
    <el-dialog :title="dialogTitle" size="mini" :visible.sync="dialogVisible" width="35%">
      <el-form :rules="rules" ref="addDept" label-width="80px" :model="addDeptForm">
        <el-form-item prop="deptNo" label="部门编号">
          <el-input v-model="addDeptForm.deptNo" :disabled="xiao" placeholder="请输入部门编号"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="部门名称">
          <el-input v-model="addDeptForm.deptName" :disabled="xiao" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item prop="deptType" label="部门类型">
          <el-select :disabled="xiao" v-model="addDeptForm.deptType" placeholder="请选择部门类型">
            <el-option label="公司" value="公司"></el-option>
            <el-option label="部门" value="部门"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptTel" label="部门电话">
          <el-input v-model="addDeptForm.deptTel" :disabled="xiao" placeholder="请输入部门电话"></el-input>
        </el-form-item>
        <el-form-item prop="deptFax" label="部门传真">
          <el-input v-model="addDeptForm.deptFax" :disabled="xiao" placeholder="请输入传真"></el-input>
        </el-form-item>
        <el-form-item prop="deptDescripition" label="部门描述">
          <el-input type="textarea" :disabled="xiao" v-model="addDeptForm.deptDescripition"></el-input>
        </el-form-item> 
        <el-form-item prop="superiorDept" label="上级部门">
          <el-input v-model="addDeptForm.superiorDept" :disabled="xiao" placeholder="请输入传真"></el-input>
        </el-form-item>
        <el-form-item prop="date" label="成立日期">
          <el-date-picker :disabled="xiao" type="date" placeholder="选择日期" v-model="addDeptForm.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="enabled" label="是否可用">
          <el-switch
            v-model="addDeptForm.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="xiao"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  created() {
    //调用获得部门函数
    this.getDeptList();
  },
  data() {
    return {
      //批量删除选中id
      selectionList: [],
      xiao:false,
      //绑定弹窗框数据
      addDeptForm: {
        deptId: "",
        deptNo: "",
        deptName: "",
        deptType:"",
        deptTel:"",
        deptFax:"",
        deptDescripition:"",
        date:"",
        enabled: 1,
      },
      rules: {
        deptNo: [
          {
            required: true,
            message: "请输入部门编号",
            trigger: "change",
          },
        ],
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "change",
          },
        ],
        deptType:[
          {
            required: true,
            message: "请输入部门名称",
            trigger: "change",
          }
        ],
        deptTel:[
          {
            required: true,
            message: "请输入部门名称",
            trigger: "change",
          },
          { min: 11, max: 11, message: '长度11个字符', trigger: 'change' }
        ],
        date:[
            {                
              required: true, 
              message: '请选择时间', 
              trigger: 'change' 
              }
          ],
      },
      //添加和编加标识符
      editTag: "0",
      //控制弹窗显示与隐藏
      dialogVisible: false,
      
      //弹窗的标题
      dialogTitle: "",
      //搜索框数据绑定
      deptForm: {
        deptName: "",
      },
      //当前页
      currentPage: 1,
      //总页数
      pageSize: 10,
      //总记录数
      total: 0,
      //表格高度window.innerHeight窗口文档显示高度
      tableHeight: window.innerHeight,
      //表格的数据
      tableData: [],
    };
  },
  methods: {
    //批量选择时触发
    handleSelectionChange(selection) {
      this.selectionList = [];
      selection.forEach((element) => {
        this.selectionList.push(element.deptId);
      });
      console.log("批量选择"+this.selectionList);
    },
   

    //模糊查询
    seachBtn() {
      //查询前给当前页赋为1
      this.currentPage = 1;
      this.getDeptList();
    },
    //获得部门列表
    async getDeptList() {
      let parm = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        searchParm: this.deptForm.deptName,
      };
      let { data: res } = await this.$http.post("/hrpl/dept/getDeptList", parm);
      console.log(res.code);
      if (res.code == 100) {
        this.tableData = res.data.records;
        this.currentPage = res.data.current;
        this.pageSize = res.data.size;
        this.total = res.data.total;
      }
    },
    //添加部门
    addDept() {
      //设置标识符为0
      this.editTag = "0";
      //调用清空表单的方法
      this.resetForm("addDept");
      this.dialogTitle = "添加部门";
      this.dialogVisible = true;
      // this.xiao=true;
    },
    //编辑部门
    editRow(row) {
      //console.log("测试编辑" + row.deptId);
      //edidTag=1表示为编辑
      this.editTag = "1";
      //调用清空数据方法
      this.resetForm("addDept");
      this.dialogTitle = "编辑部门";
      this.dialogVisible = true;
      //查询需要编加的数据
      this.getDeptById(row.deptId);
    },
    //根据id查询部门数据
    async getDeptById(id) {
      console.log("根据id获得部门数据" + id);
      let parm = {
        deptId: id,
      };
      let { data: res } = await this.$http.post(
        "/hrpl/dept/queryDeptById",
        parm
      );
      // console.log("测试根据id查询返回结果:" + res.code);
      if (res.code == 100) {
        this.addDeptForm.deptId = res.data.deptId;
        this.addDeptForm.deptNo = res.data.deptNo;
        this.addDeptForm.deptName = res.data.deptName;
        this.addDeptForm.enabled = res.data.enabled;
      }
      console.log("测试enabled:" + this.addDeptForm.enabled);
    },
    //删除部门

    deleteDept(id) {
      let _this = this;
      _this
        .$confirm("确定删除吗？", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "waring",
        })
        .then(async () => {
          let parm = {
            deptId: id,
          };
          let { data: res } = await _this.$http.post(
            "/hrpl/dept/deleteDept",
            parm
          );
          if (res.code == 100) {
            //信息提示
            _this.$message({
              message: res.msg,
              type: "success",
            });
            //刷新数据
            _this.getDeptList();
          } else {
            //信息提示
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        });
    },
     //批量删除功能
    deleteAllDept() {
      for (let i = 0; i < this.selectionList.length; i++) {
        this.deleteDept(this.selectionList[i]);
      }
    },
    //删除部门
    deleteRow(row) {
      //  console.log(row);
      this.deleteDept(row.deptId);
    },
    //清空表单
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },

    //弹窗框确认事件，实现添加或编辑功能
    async confirmBtn() {
      let _this = this;
      _this.$refs.addDept.validate(async (valid) => {
        if (valid) {
          let url = "";
          if (_this.editTag == "0") {
            url = "/hrpl/dept/addDept";
          } else {
            url = "/hrpl/dept/updateDept";
          }
          let { data: res } = await _this.$http.post(url, _this.addDeptForm);
          console.log("添加测试" + res.code);
          if (res.code == 100) {
            //信息提示
            _this.$message({
              message: res.msg,
              type: "success",
            });
            //刷新数据
            _this.getDeptList();
            //关闭窗口
            _this.dialogVisible = false;
          } else {
            //信息提示
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        }
      });
    },
    //改变页容量时调用
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getDeptList();
    },
    //改变当前页时调用
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getDeptList();
    },
  },
  //该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不 会有问题
  // 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，
  // 这个操作都应该放进Vue.nextTick()的回调函数中
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 450; //后面的50：根据需求空出的高度，自行调整
    });
  },
};
</script>

<style lang="scss" scoped>
.searchBtn {
  margin-left: 15px;
}
.el-main {
  padding-top: 5px !important;
}
</style>