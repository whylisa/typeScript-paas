<template>
	<div id="transactionMgt">
		<div class="ms-top bg-purple">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="充值订单" name="first">
					<div class="ms-sign clearfix">
						<div class="top">
							<div class="ms-s-a">
								<span>用户名</span>
								<el-input v-model="seleForm.buyerName" placeholder="请输入用户名" clearable></el-input>
							</div>

							<div class="ms-s-a">
								<span>订单类型</span>
								<el-select v-model="seleForm.kind" placeholder="请选择" clearable>
									<el-option v-for="item in kinds" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
							<div class="ms-s-d">
								<span>发送时间</span>
								<el-date-picker v-model="seleForm.startDate" type="date" clearable value-format="yyyy-MM-dd" placeholder="请选择开始日期"></el-date-picker>
								<span>至</span>
								<el-date-picker v-model="seleForm.endDate" type="date" clearable value-format="yyyy-MM-dd" placeholder="请选择结束日期"></el-date-picker>
								<button @click="search">查询</button>
							</div>
						</div>
					</div>
					<div class="ms-table">

						<el-table ref="multipleTable" :data="failData" tooltip-effect="dark" border stripe style="width: 100%"
						 :header-cell-style="{background:'rgba(243,247,251,1)',fontSize:'14px'}">
							<el-table-column prop="userName" align="center" min-width="75" label="用户名称"></el-table-column>
							<el-table-column prop="money" label="金额" align="center" min-width="70" show-overflow-tooltip></el-table-column>
							<el-table-column prop="kind" label="订单类型" align="center" min-width="70">
								<template slot-scope="scope">
									<span v-if="scope.row.kind == '1'">充值</span>
									<span v-if="scope.row.kind == '2'">退款</span>
									<span v-if="scope.row.kind == '5'">服务费</span>
								</template>

							</el-table-column>

							<el-table-column prop="applyNote" label="备注" align="center" min-width="70"></el-table-column>
							<el-table-column prop="createDate" label="日期" align="center" min-width="70"></el-table-column>
							<el-table-column prop="kind" label="操作" align="center" min-width="70">
								<template slot-scope="scope">
									<span class="line" @click="sure(scope.row)">确认</span>
									<span @click="backReson(scope.row)">关闭</span>
									<!-- <span>详情</span> -->
								</template>
							</el-table-column>
						</el-table>
						<div class="ms-table-bottom">
							<el-pagination @current-change="handleCurrentChange" :current-page="pageNum" layout="total, prev, pager, next, sizes, jumper"
							 @size-change="handleSizeChange" :total="total" :page-size="pageSize" :page-sizes="[10, 30, 50]"></el-pagination>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="充值记录" name="second">
					<div class="ms-sign clearfix">
						<div class="top">
							<div class="ms-s-a">
								<span>流水号</span>
								<el-input v-model="seleRecord.id" placeholder="请输入流水号" clearable></el-input>
							</div>
							<div class="ms-s-a">
								<span>公司名</span>
								<el-input v-model="seleRecord.companyName" placeholder="请输入公司名" clearable></el-input>
							</div>
							<div class="ms-s-a">
								<span>订单类型</span>
								<el-select v-model="seleRecord.kind" placeholder="请选择订单类型" clearable>
									<el-option v-for="item in kinds" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
							<div class="ms-s-d">
								<span>发送时间</span>
								<el-date-picker v-model="seleRecord.startDate" type="date" clearable value-format="yyyy-MM-dd" placeholder="请选择开始日期"></el-date-picker>
								<span>至</span>
								<el-date-picker v-model="seleRecord.endDate" type="date" clearable value-format="yyyy-MM-dd" placeholder="请选择结束日期"></el-date-picker>
								<button @click="searchRecord">查询</button>
							</div>
						</div>
					</div>
					<div class="ms-table">

						<el-table ref="multipleTable" :data="alloData" tooltip-effect="dark" border stripe style="width: 100%"
						 :header-cell-style="{background:'rgba(243,247,251,1)',fontSize:'14px'}">
							<el-table-column prop="id" align="center" min-width="185" label="流水号"></el-table-column>
							<el-table-column prop="userName" align="center" label="用户名称"></el-table-column>
							<el-table-column prop="companyName" align="center" label="公司名称"></el-table-column>
							<el-table-column prop="money" align="center" label="金额"></el-table-column>
							<el-table-column prop="kind" align="center" label="订单类型">
								<template slot-scope="scope">
									<span v-if="scope.row.kind == '1'">充值</span>
									<span v-if="scope.row.kind == '2'">退款</span>
									<span v-if="scope.row.kind == '5'">服务费</span>
									<span v-if="scope.row.kind == '9'">其他</span>

								</template>

							</el-table-column>
							<el-table-column prop="status" label="状态" align="center">

								<template slot-scope="scope">
									<span v-if="scope.row.status == '0'">待确认</span>
									<span v-if="scope.row.status == '1'">已完成</span>
									<span v-if="scope.row.status == '2'">已关闭</span>
								</template>
							</el-table-column>
							<el-table-column prop="comments" label="备注" align="center" min-width="180"></el-table-column>
							<el-table-column prop="updateDate" label="日期" align="center" min-width="180"></el-table-column>
							<el-table-column prop="comments" label="操作" align="center" min-width="100">
								<template slot-scope="scope">
									<span @click="showDetail(scope.row)">详情</span>
								</template>
							</el-table-column>

						</el-table>
						<div class="ms-table-bottom">
							<el-pagination @current-change="handleCurrentChange1" :current-page="pageNum1" layout="total, prev, pager, next, sizes, jumper"
							 @size-change="handleSizeChange1" :total="total1" :page-size="pageSize1" :page-sizes="[10, 30, 50]"></el-pagination>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
 
})
export default class TransactionMgt extends Vue {
  private activeName: string = 'first';
  private seleForm: object = {};
  private created(): void {
    // this.$route.matched.filter(item => console.log(item.name));
  }
  private handleClick(): void {
    const a: number = 1;
  }
}
</script>
<style lang="less">
	@color: #398bf7;

	#transactionMgt {
		#tab-first {
			// width: 100px;
			text-align: center;
		}

		#tab-second {
			// width: 100px;
			text-align: center;
		}

		.ms-top {
			padding: 20px;
			box-sizing: border-box;

			.el-tabs__item.is-active {
				color: @color;
			}

			.el-tabs__item:hover {
				color: @color;
			}

			.el-tabs__active-bar {
				background-color: @color;
			}

			// input框
			.ms-sign {
				width: 100%;

				// height: 40px;
				span {
					font-size: 14px;
					color: #333333;
				}

				.el-input {
					width: 190px;

					input {
						height: 36px;
						box-sizing: border-box;
					}
				}

				.ms-s-a {
					float: left;
					min-width: 210px;
					margin-right: 50px;

					&:first-child {
						margin-left: 13px;
					}
				}

				.ms-a {
					// margin-left: 41px;
				}

				.ms-s-b {
					float: left;
					min-width: 210px;
					margin-right: 50px;
				}

				.ms-s-c {
					float: left;
					min-width: 210px;
					margin-right: 50px;
					margin-top: 10px;

					.el-input {
						// vertical-align: bottom;
					}
				}

				.ms-s-d {
					float: left;
					min-width: 210px;
					margin-right: 50px;
					// margin-top: 10px;
					margin-left: 13px;

					.el-select {
						width: 190px;

						.el-input {
							width: 100%;
						}
					}
				}

				.ms-s-e {
					float: left;
					min-width: 270px;

					.el-select {
						width: 190px;

						.el-input {
							width: 100%;
						}
					}
				}

				button {
					width: 90px;
					height: 36px;
					background-color: @color;
					margin-left: 20px;
					color: #ffffff;
				}
			}

			// 新增
			.ms-table {
				width: 100%;
				margin-top: 20px;

				// 表格样式
				.el-table {

					// background-color: red;
					td,
					th.is-leaf {
						border-bottom: none;
					}
				}

				.el-button {
					margin-bottom: 10px;
				}

				.top {
					margin-bottom: 10px;

					.el-button {
						line-height: 36px;
						width: 90px;
						height: 36px;
						text-align: center;
						padding: 0;
					}

					.el-button:first-child {
						border-color: #398bf7;
						color: @color;

						&:hover {
							background-color: @color;
							color: #fff;
							border-color: #fff;
						}
					}
				}

				.cell {
					>span {
						cursor: pointer;
						color: @color;
						position: relative;
						// padding: 0 8px;
					}
				}
			}
		}

		.cell {
			padding-left: 15px;
		}

		.ms-table-bottom {
			margin-top: 10px;
		}

		.el-dialog {
			width: 500px;
			border-radius: 5px;

			.el-dialog__header {
				border-bottom: 1px solid #ebebeb;
			}

			.el-dialog__body {
				.el-input {
					input {
						width: 90%;
					}
				}

				.el-textarea {
					width: 90%;
				}

				p {
					text-align: center;
				}
			}

			.el-dialog__footer {
				text-align: center;
			}
		}

		.el-form {
			width: 80%;
			margin: 0 auto;
		}

		// tab样式调整
		.el-tabs__nav.is-top {
			font-size: 14px;
			padding: 0 20px;
			color: #333;
		}

		.el-tabs__item.is-active {
			color: @color;
		}

		.el-tabs__item:hover {
			color: @color;
		}

		.el-tabs__active-bar {
			background-color: @color;
			padding: 0 20px;
		}

		@media only screen and (max-width: 1151px) {
			#pane-first {
				.ms-a {
					margin-top: 10px;
					margin-left: 13px;
				}
			}
		}

		@media only screen and (min-width: 1283px) {
			#pane-first {
				.ms-a {
					margin-left: 13px;
				}
			}
		}

		@media only screen and (max-width: 1797px) and(min-width:1669px) {
			#pane-first {
				.ms-s-d {
					margin-top: 10px;
					margin-left: 13px;
				}
			}
		}

		@media only screen and (max-width: 1270px) and (min-width: 1251px) {
			#pane-first {
				.ms-a {
					margin-top: 0px;
					margin-left: 0px;
				}
			}
		}

		@media only screen and (max-width: 1860px) {
			.ms-top {
				.ms-sign {
					.ms-e {
						margin-top: 10px;
					}

					// .ms-f {
					//   margin-top: 10px;
					// }

					.ms-b {
						margin-left: 29px;
					}

					.ms-g {
						margin-left: 19px;
					}
				}
			}
		}

		@media only screen and (max-width: 1601px) {
			.ms-top {
				.ms-sign {
					.ms-c {
						margin-right: 250px;
					}

					.ms-g {
						margin-left: 0;
					}

					.ms-a,
					.ms-d {
						// margin-left: 14px;
					}

					.ms-d {
						margin-top: 10px;
					}

					.ms-c {
						margin-left: 8px;
					}
				}
			}
		}

		@media only screen and (max-width: 1470px) {
			.ms-top {
				.ms-sign {
					.ms-c {
						margin-right: 10px;
					}
				}
			}
		}

		@media only screen and (max-width: 1669px) {
			.ms-top {
				.ms-sign {
					.ms-s-a {
						&:first-child {
							margin-left: 0;
						}
					}

					.ms-s-d {
						margin-left: 0;
						// margin-right: 20px;
					}
				}
			}
		}

		@media only screen and (max-width: 1656px) {
			.ms-top .ms-sign .ms-s-d {
				margin-top: 10px;
				// margin-right: 20px;
			}
		}

		@media only screen and (max-width: 1270px) {
			.ms-top {
				.ms-sign {

					.ms-s-a,
					// .ms-s-b,
					.ms-s-c,
					.ms-s-d {
						margin-right: 20px;
					}
				}
			}

			.el-dialog {
				width: 400px;
			}
		}
	}
</style>
