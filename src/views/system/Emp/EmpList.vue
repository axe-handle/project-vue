<template>
  <el-main>
    <!--搜索框 -->
    <el-form :model="empForm" size="mini" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称" prop="">
            <el-input v-model="empForm.empNo" placeholder="请输入员工编号"></el-input>
          </el-form-item>
        </el-col>
        <el-button
          class="searchBtn"
          type="primary"
          size="mini"
          @click="searchBtn(empForm.empNo)"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          class="newBtn"
          type="primary"
          size="mini"
          icon=" el-icon-plus"
          @click="addEmp"
        >新增</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAllEmp">批量删除</el-button>
        
      </el-row>
    </el-form>
    <!--数据列表 -->
    <el-table
      :data="tableData"
      size="mini"
      height="295"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%;"
    >
      <!--添加该选项 -->
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="empId" label="#" width="60" align="center"></el-table-column>
      <el-table-column prop="empNo" label="员工编号" width="110" align="center"></el-table-column>
      <el-table-column prop="empName" label="员工名字" width="150" align="center"></el-table-column>
      <el-table-column prop="empSex" label="员工性别" width="150" align="center"></el-table-column>
      <el-table-column prop="deptName" label="部门名称" width="100" align="center"></el-table-column>
      <el-table-column prop="postName" label="岗位名称" width="100" align="center"></el-table-column>
      <el-table-column prop="beginDate" label="入职日期" width="100" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="220">
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
          <!-- 查看详情 -->
          <el-button
            @click.native.prevent="viewRow(scope.row)"
            type="success"
            icon="el-icon-view"
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
      <el-form :rules="rules" ref="addEmp" label-width="80px" :model="addEmpForm">
        <el-form-item prop="empNo" label="员工编号">
          <el-input v-model="addEmpForm.empNo" :disabled="xiao" placeholder="请输入员工编号"></el-input>
        </el-form-item>
        <el-form-item prop="empName" label="员工名称">
          <el-input v-model="addEmpForm.empName" :disabled="xiao" placeholder="请输入员工名称"></el-input>
        </el-form-item>
        <el-form-item prop="empSex" label="员工性别">
          <el-select :disabled="xiao" v-model="addEmpForm.empSex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="empBirthday" label="出生日期">
          <el-date-picker :disabled="xiao" type="date" placeholder="选择日期" v-model="addEmpForm.empBirthday" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证">
          <el-input v-model="addEmpForm.idCard" :disabled="xiao" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="部门名字">
          <el-input v-model="addEmpForm.deptName" :disabled="xiao" placeholder="请输入部门ID"></el-input>
        </el-form-item>
        <el-form-item prop="postName" label="岗位名字">
          <el-input v-model="addEmpForm.postName" :disabled="xiao" placeholder="请输入岗位ID"></el-input>
        </el-form-item>
        <el-form-item prop="beginDate" label="入职日期">
          <el-date-picker :disabled="xiao" type="date" placeholder="选择日期" v-model="addEmpForm.beginDate" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="obtainDate" label="参加工作日期">
          <el-date-picker :disabled="xiao" type="date" placeholder="选择日期" v-model="addEmpForm.obtainDate" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="state" label="用工形式">
          <el-select :disabled="xiao" v-model="addEmpForm.state" placeholder="请选择用工形式">
            <el-option label="正式员工" value="正式员工"></el-option>
            <el-option label="临时员工" value="临时员工"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="personSource" label="人工来源">
          <el-select :disabled="xiao" v-model="addEmpForm.personSource" placeholder="请选择人工来源">
            <el-option label="校园招聘" value="校园招聘"></el-option>
            <el-option label="社会招聘" value="社会招聘"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="nation" label="政治面貌">
          <el-select :disabled="xiao" v-model="addEmpForm.nation" placeholder="请选择政治面貌">
            <el-option label="党员" value="党员"></el-option>
            <el-option label="预备党员" value="预备党员"></el-option>
            <el-option label="团员" value="团员"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="natvePlace" label="民族">
          <el-input v-model="addEmpForm.natvePlace" :disabled="xiao" placeholder="请输入民族"></el-input>
        </el-form-item>
        <el-form-item prop="nativePlace" label="籍贯">
          <el-input v-model="addEmpForm.nativePlace" :disabled="xiao" placeholder="请输入籍贯"></el-input>
        </el-form-item>
        <el-form-item prop="empTel" label="联系电话">
          <el-input v-model="addEmpForm.empTel" :disabled="xiao" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="电子邮件">
          <el-input v-model="addEmpForm.email" :disabled="xiao" placeholder="请输入电子邮件"></el-input>
        </el-form-item>
        <el-form-item prop="height" label="身高">
          <el-input v-model="addEmpForm.height" :disabled="xiao" placeholder="请输入身高"></el-input>
        </el-form-item>
        <el-form-item prop="booldType" label="血型">
          <el-select :disabled="xiao" v-model="addEmpForm.booldType" placeholder="请选择血型">
            <el-option label="A 型" value="A 型"></el-option>
            <el-option label="B 型" value="B 型"></el-option>
            <el-option label="AB 型" value="AB 型"></el-option>
            <el-option label="0 型" value="0 型"></el-option>
            <el-option label="其他血型" value="其他血型"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="wedLock" label="婚姻状况">
          <el-select :disabled="xiao" v-model="addEmpForm.wedLock" placeholder="请选择婚姻状况">
            <el-option label="未婚" value="未婚"></el-option>
            <el-option label="已婚" value="已婚"></el-option>
            <el-option label="丧偶" value="丧偶"></el-option>
            <el-option label="离婚" value="离婚"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birthplace" label="出生地">
          <el-input type="textarea" :disabled="xiao" v-model="addDeptForm.birthplace"  placeholder="请输入出生地"></el-input>
        </el-form-item> 
        <el-form-item prop="registered" label="户口所在地">
          <el-input type="textarea" :disabled="xiao" v-model="addDeptForm.registered"></el-input>
        </el-form-item> 
        <el-form-item prop="topEducation" label="最高学历">
          <el-select :disabled="xiao" v-model="addEmpForm.topEducation" placeholder="请选择最高学历">
            <el-option label="高中及以下" value="高中及以下"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="degree" label="最高学位">
          <el-select :disabled="xiao" v-model="addEmpForm.degree" placeholder="请选择最高学位">
            <el-option label="无学位" value="无学位"></el-option>
            <el-option label="学士" value="学士"></el-option>
            <el-option label="双学士" value="双学士"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option> 
            <el-option label="博士后" value="博士后"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="school" label="毕业院校">
          <el-input v-model="addEmpForm.school" :disabled="xiao" placeholder="毕业院校"></el-input>
        </el-form-item>
        <el-form-item prop="major" label="所学专业">
          <el-input v-model="addEmpForm.major" :disabled="xiao" placeholder="所学专业"></el-input>
        </el-form-item>
        <el-form-item prop="graduationDate" label="毕业日期">
          <el-date-picker :disabled="xiao" type="date" placeholder="选择日期" v-model="addDeptForm.graduationDate" style="width: 100%;">
          </el-date-picker>
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
    this.getEmpList();
  },
  data() {
    return {
      //弹窗是否可填
      xiao:false,
      //批量删除选中id
      selectionList: [],
      keywords: "",
      logIds: "",
      msg: "",
      //绑定弹窗框数据
      addEmpForm: {
        empId: "",
        empNo: "",
        empName: "",
        empSex:"",
        empBirthday:"",
        idCard:"",
        deptName:"",
        postName:"",
        beginDate:"",
        obtainDate:"",
        state:"",
        personSource:"",
        nation:"",
        natvePlace:"",
        nativePlace:"",
        empTel:"",
        email:"",
        height:"",
        booldType:"",
        wedLock:"",
        birthplace:"",
        registered:"",
        topEducation:"",
        degree:"",
        school:"",
        major:"",
        graduationDate:"",
        enabled: 1,
        //当前页
        currentPage: 1,
        //总页数
        pageSize: 10,
        //总记录数
        total: 0,
      },
      rules: {
        empNo: [
          {
            required: true,
            message: "请输入员工编号",
            trigger: "change",
          },
        ],
        empName: [
          {
            required: true,
            message: "请输入员工名字",
            trigger: "change",
          },
        ],
        empSex:[
          {
            required: true,
            message: "请输入员工性别",
            trigger: "change",
          },
        ],
        empBirthday:[
          {
            required: true,
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
        idCard:[
          {
            required: true,
            message: "请输入身份证",
            trigger: "change",
          },
          { min: 18, max: 18, message: '长度18个字符', trigger: 'change' }
        ],
        deptId:[
          {
            required:true,
            message:"请输入部门ID",
            trigger:"change",
          },
        ],
        postId:[
          {
            required:true,
            message:"请输入岗位ID",
            trigger:"change",
          },
        ],
        obtainDate:[
          {
            required:true,
            message:"请选择参加工作日期",
            trigger:"change",
          },
        ],
        beginDate:[
          {
            required:true,
            message:"请选择入职日期",
            trigger:"change",
          },
        ],
        state:[
          {
            required:true,
            message:"请选择用工形式",
            trigger:"change",
          },
        ],
        personSource:[
          {
            required:true,
            message:"请选择人工来源",
            trigger:"change",
          },
        ],
        empTel:[
          {
            required: true,
            message: "请输入联系电话",
            trigger: "change",
          },
          { min: 11, max: 11, message: '长度11个字符', trigger: 'change' }
        ],
      },
      //添加和编加标识符
      editTag: "0",
      //控制弹窗显示与隐藏
      dialogVisible: false,
      //弹窗的标题
      dialogTitle: "",
      //搜索框数据绑定
      empForm: {
        empNo: "",
      },
      //当前页
      currentPage: 1,
      //总页数
      pageSize: 10,
      //总记录数
      total: 0,
      //表格高度window.innerHeight窗口文档显示高度
      tableHeight: 295,
      //表格的数据
      tableData: [],
    };
  },
  methods: {
    //获得部门列表
    async getEmpList() {
      let parm = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        title: this.empForm.empName,
      };
      let { data: res } = await this.$http.post(
        "/knife/emp/getEmpList",
        parm
      );
      console.log(res.code);
      if (res.code == 100) {
        this.tableData = res.data.records;
        this.currentPage = res.data.current;
        this.pageSize = res.data.size;
        this.total = res.data.total;
      }
    },

    //模糊查询
    async seachBtn(empNo) {
      //查询前给当前页赋为1
      // this.currentPage = 1;
      // this.getDeptList();'

      let parm = {
        empNo: empNo,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        title: this.empForm.empName,
      };
      let { data: res } = await this.$http.post(
        "/knife/emp/selectByEmp",
        parm
      );
      if (res.code == 100) {
        this.tableData = res.data.records;
        this.currentPage = res.data.current;
        this.pageSize = res.data.size;
        this.total = res.data.total;
        this.empForm.empNo = "";
      }
      console.log(res);
    },
    //添加员工
    addEmp() {
      //设置标识符为0
      this.editTag = "0";
      //调用清空表单的方法
      this.resetForm("addEmp");
      this.dialogTitle = "添加员工";
      this.dialogVisible = true;
      this.xiao=false;
    },
    //编辑部门
    editRow(row) {
      //console.log("测试编辑" + row.deptId);
      //edidTag=1表示为编辑
      this.editTag = "1";
      //调用清空数据方法
      this.resetForm("addEmp");
      this.dialogTitle = "编辑员工";
      this.dialogVisible = true;
      //查询需要编加的数据
      this.getEmpById(row.empId);
    },
    //根据id查询部门数据
    async getEmpById(id) {
      console.log("根据id获得员工数据" + id);
      let parm = {
        empId: id,
      };
      let { data: res } = await this.$http.post(
        "/hrplus/emp/queryEmpById",
        parm
      );
      //console.log("测试根据id查询返回结果:" + res.code);
      if (res.code == 100) {
        this.addEmpForm.empId = res.data.empId;
        this.addEmpForm.empNo = res.data.empNo;
        this.addEmpForm.empName = res.data.empName;
        this.addEmpForm.empSex = res.data.empSex;
        this.addEmpForm.empBirthday = res.data.empBirthday;
        this.addEmpForm.idCard = res.data.idCard;
        this.addEmpForm.deptId = res.data.deptId;
        this.addEmpForm.postId = res.data.postId;
        this.addEmpForm.beginDate = res.data.beginDate;
        this.addEmpForm.obtainDate = res.data.obtainDate;
        this.addEmpForm.state = res.data.state;
        this.addEmpForm.personSource = res.data.personSource;
        this.addEmpForm.nation = res.data.nation;
        this.addEmpForm.natvePlace = res.data.natvePlace;
        this.addEmpForm.nativePlace = res.data.nativePlace;
        this.addEmpForm.empTel = res.data.empTel;
        this.addEmpForm.email = res.data.email;
        this.addEmpForm.height = res.data.height;
        this.addEmpForm.booldType = res.data.booldType;
        this.addEmpForm.wedLock = res.data.wedLock;
        this.addEmpForm.birthplace = res.data.birthplace;
        this.addEmpForm.registered = res.data.registered;
        this.addEmpForm.topEducation = res.data.topEducation;
        this.addEmpForm.degree = res.data.degree;
        this.addEmpForm.school = res.data.school;
        this.addEmpForm.major = res.data.major;
        this.addEmpForm.graduationDate = res.data.graduationDate;
      }
      // console.log("测试enabled:" + this.addEmpForm.enabled);
    },
    //查看部门详情
    viewRow(row) {
      //edidTag=2表示为查看详情
      this.editTag = "2";
      //调用清空数据方法
      this.resetForm("addEmp");
      this.dialogTitle = "查看部门详情";
      this.dialogVisible = true;
      this.xiao=true;
      //查询需要编加的数据
      this.getEmpById(row.empId);
    },
    //删除部门
    deleteEmp(id) {
      let _this = this;
      _this
        .$confirm("确定删除吗？", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "waring",
        })
        .then(async () => {
          let parm = {
            empId: id,
          };
          let { data: res } = await _this.$http.post(
            "/hrplus/emp/deleteEmp",
            parm
          );

          console.log(parm);
          if (res.code == 100) {
            //信息提示
            _this.$message({
              message: res.msg,
              type: "success",
            });
            parm = {};
            //刷新数据
            _this.getEmpList();
          } else {
            //信息提示
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        });
    },
    //删除
    deleteOne(id) {
      console.log(id);
      let parm = {
        empId: id,
      };
      this.$http.post("/hrplus/emp/deleteEmp", parm).then((res) => {
        if (res.data.code == 100) {
          //信息提示
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          //刷新数据
          this.getEmpList();
        } else {
          //信息提示
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    //批量选择时触发
    handleSelectionChange(selection) {
      this.selectionList = [];
      selection.forEach((element) => {
        this.selectionList.push(element.empId);
      });
      console.log("批量选择" + this.selectionList);
      // console.log("handleSelectionChange--", val);
      // this.selectionList = val;
    },
    //批量删除功能
    deleteAllEmp() {
      for (let i = 0; i < this.selectionList.length; i++) {
        this.deleteOne(this.selectionList[i]);
        console.log("1111111111" + this.selectionList[i]);
      }
    },
    //删除部门
    deleteRow(row) {
      //  console.log(row);
      this.deleteEmp(row.empId);
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
      _this.$refs.addEmp.validate(async (valid) => {
        if (valid) {
          let url = "";
          if (_this.editTag == "0") {
            url = "/hrplus/emp/addEmp";
          } else if (_this.editTag == "1") {
            url = "/hrplus/emp/updateEmp";
          } else {
            url = "/hrplus/emp/queryEmpById";
          }
          let { data: res } = await _this.$http.post(url, _this.addEmpForm);
          console.log("添加测试" + res.code);
          if (res.code == 100) {
            //信息提示
            _this.$message({
              message: res.msg,
              type: "success",
            });
            //刷新数据
            _this.getEmpList();
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
      this.getEmpList();
    },
    //改变当前页时调用
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getEmpList();
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
  width: 100%;
  height: 400px;
}
.el-table .cell {
  text-align: center;
}
</style>