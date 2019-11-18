<template>
  <div id="businessMgt" class="bg-purple">
    <div class="mp-top clearfix">
      <div class="float_left">
        <span class="mp-top-a">用户名</span>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
        <span class="mp-top-a">企业名称</span>
        <el-input v-model="companyName" placeholder="请输入企业名称"></el-input>
      </div>
      <div class="float_left-a">
        <span class="mp-top-a">联系人</span>
        <el-input v-model="companyContacts" placeholder="请输入联系人"></el-input>
        <span class="mp-top-a">状态</span>
        <el-select v-model="enabled" placeholder="请选择账号状态">
          <el-option
            v-for="item in nets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="getData">查询</el-button>
      </div>
    </div>
    <div class="bu-ton">
      <!-- <el-button @click="add" type="primary" class="add">新增</el-button> -->
    </div>
    <div class="mp-bottom">
      <div class="mp-table">
        <el-table
          ref="multipleTable"
          :data="notifiData"
          tooltip-effect="dark"
          border
          stripe
          style="width: 100%"
          :header-cell-style="{background:'rgba(243,247,251,1)',fontSize:'14px'}"
        >
          <el-table-column prop="username" align="center" label="用户名" min-width="100"></el-table-column>
          <el-table-column prop="companyName" label="企业名称" align="center" width="300"></el-table-column>
          <el-table-column prop="balance" label="余额" align="center"></el-table-column>
          <el-table-column
            prop="companyCategory"
            :show-overflow-tooltip="true"
            align="center"
            label="行业类别"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.companyCategory== '0'">互联网</p>
              <p v-if="scope.row.companyCategory== '1'">农业、林业</p>
              <p v-if="scope.row.companyCategory== '2'">医药、卫生、劳动保护</p>
              <p v-if="scope.row.companyCategory== '3'">矿业</p>
              <p v-if="scope.row.companyCategory== '4'">石油</p>
              <p v-if="scope.row.companyCategory== '5'">能源、核技术</p>
              <p v-if="scope.row.companyCategory== '6'">化工</p>
              <p v-if="scope.row.companyCategory== '7'">冶金</p>
              <p v-if="scope.row.companyCategory== '8'">机械</p>
              <p v-if="scope.row.companyCategory== '9'">电工</p>
              <p v-if="scope.row.companyCategory== '10'">电子元件与信息技术</p>
              <p v-if="scope.row.companyCategory== '11'">通信、广播</p>
              <p v-if="scope.row.companyCategory== '12'">仪器、仪表</p>
              <p v-if="scope.row.companyCategory== '13'">工程建设</p>
              <p v-if="scope.row.companyCategory== '14'">建材</p>
              <p v-if="scope.row.companyCategory== '15'">公路、水路运输</p>
              <p v-if="scope.row.companyCategory== '16'">铁路</p>
              <p v-if="scope.row.companyCategory== '17'">车辆</p>
              <p v-if="scope.row.companyCategory== '18'">船舶</p>
              <p v-if="scope.row.companyCategory== '19'">航空、航天</p>
              <p v-if="scope.row.companyCategory== '20'">食品</p>
              <p v-if="scope.row.companyCategory== '21'">轻工、文化与生活用品</p>
              <p v-if="scope.row.companyCategory== '22'">环境保护</p>
            </template>
          </el-table-column>
          <el-table-column prop="companyContacts" align="center" label="联系人"></el-table-column>
          <el-table-column prop="companyContactsCellphone" align="center" width="180" label="电话号码"></el-table-column>
          <el-table-column prop="createDate" align="center" label="创建时间" width="190"></el-table-column>
          <el-table-column prop="enabled" align="center" label="状态" width="80">
            <template slot-scope="scope">
              <i v-if="scope.row.enabled === true">启用</i>
              <i v-if="scope.row.enabled === false">禁用</i>
            </template>
          </el-table-column>
          <el-table-column prop="operation" align="center" label="操作" width="250">
            <!-- <template slot-scope="scope">
              <span class="line" @click="recharge(scope.row)">充值</span>
              <span class="line" @click="rebuild(scope.row)">修改</span>
              <span v-if="scope.row.enabled === true" @click="fibiden(scope.row)">禁用</span>
              <span v-if="scope.row.enabled === false" @click="restart(scope.row)">启用</span>
              <span class="line" @click="openDetail(scope.row)">详情</span>
            </template> -->
          </el-table-column>
        </el-table>
        <div class="mp-table-bottom">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BusinessMgt extends Vue {
  public $axios: any;
  public notifiData: any = [];
  public pageNum: number = 1;
  public pageSize: number = 10;
  public total: number = 10;
  public username: string = '';
  public companyName: string = '';
  public companyContacts: string = '';
  public enabled: string = '';
  public nets: any = [];
  public created(): void {
    this.getData();
  }
  private getData(): void {
    this.$axios({
      method: 'post',
      url: '/companyInfo/findByPage',
      data: {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        enabled: this.enabled,
        username: this.username,
        companyName: this.companyName,
        companyContacts: this.companyContacts,
      },
    }).then((res: any) => {
      if (res.data.code === 200) {
        this.notifiData = res.data.data.result;
        this.pageNum = res.data.data.pageNum;
        this.pageSize = res.data.data.pageSize;
        this.total = res.data.data.total;
      }
    });
  }
  private handleSizeChange(val: any): void {
     this.pageSize = val;
     this.getData();
   }
  private handleCurrentChange(val: any): void {
    this.pageNum = val;
    this.getData();
  }
}
</script>

<style lang="less">
@color: #398bf7;

#businessMgt {
  padding: 20px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .add {
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .float_left {
    float: left;
  }

  .float_left-a {
    float: left;
  }

  .mp-top {
    height: 36px;

    .el-input {
      width: 190px;

      // height: 36px;
      input {
        height: 36px;
        line-height: 36px;
      }
    }

    span {
      font-size: 14px;
    }

    .mp-top-a {
      margin-left: 20px;
    }

    .el-button {
      width: 90px;
      height: 36px;
      margin-left: 20px;
      padding: 0;
      background-color: @color;
      border: 1px solid @color;
    }
  }

  .mp-bottom {
    .el-button {
      margin-bottom: 10px;
      color: @color;
      border: 1px solid @color;
      height: 36px;
      width: 90px;
      padding: 0;
    }

    // 表格样式
    .el-table {
      // background-color: red;
      td,
      th.is-leaf {
        border-bottom: none;
      }

      i {
        font-style: normal;
      }

      i.one {
        color: #666;
      }

      i.two {
        color: #e55715;
      }

      i.three {
        color: #398bf7;
      }

      i.four {
        color: #56b236;
      }

      i.five {
        color: #e52915;
      }

      // 操作栏最后一个span，去掉竖线
      .cell > .line:last-child {
        &::after {
          width: 0;
        }
      }
    }

    .mp-table-bottom {
      margin-top: 10px;
    }
  }

  .cell {
    span {
      color: @color;
      cursor: pointer;
      padding: 0 8px;
      position: relative;
    }
  }

  .el-dialog__wrapper:last-child {
    .el-dialog__body {
      margin-top: 20px;
      padding: 30px 20px;
    }

    .el-dialog__footer {
      padding: 10px 20px 30px;
    }
  }

  .el-dialog {
    border-radius: 5px;
    .el-textarea {
      width: 288px;
    }

    .el-dialog__header {
      border-bottom: 1px solid #ebebeb;
    }

    .el-dialog__body {
      margin-top: 10px;
      box-sizing: border-box;
      padding: 30px 20px 20px 20px;

      p {
        text-align: center;
      }
    }

    .el-input__inner {
      width: 80%;
    }

    .dialog-footer {
      text-align: center;
    }
  }
}

@media only screen and (max-width: 1476px) {
  #businessMgt {
    .mp-top {
      height: 86px;
    }

    .float_left-a {
      margin-top: 10px;
      // 				height: 36px
    }

    .bu-ton {
      height: 40px;

      .el-button {
        float: left;
      }
    }
  }
}

// @media only screen and (max-width: 1260px){
// 	#accountMgt {
// 		.mp-top {
// 			.el-input {
//         width: 160px;
//         input{
//           height: 30px;
//         }
// 			}
// 			.mp-top-a {
// 				margin-left: 30px;
//       }
//       .el-button{
//         height: 30px;
//       }
// 		}
// 	}
// }
// //弹框大小修改
// @media screen and (max-width:1299px) {
//   .el-dialog{
//     width: 400px !important;
//   }
// }
</style>
