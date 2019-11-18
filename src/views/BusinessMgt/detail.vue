<template>
	<div id="detail">
		<!-- 账号详细 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>企业管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/businessMgt' }">企业管理</el-breadcrumb-item>
			<el-breadcrumb-item>详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="aD">
			<div class="ac-top clearfix">
				<h3>详情</h3>
			</div>
			<div class="ac-bottom">
				<table>
					<tr>
						<td>
							用户名 ：
							<span>{{detailData.username}}</span>
						</td>
						<td>
							企业名称：
							<span>{{detailData.companyName}}</span>
						</td>
					</tr>
					<tr>
						<td>
							行业类别：
							<span v-if="detailData.companyCategory== '0'">互联网</span>
							<span v-if="detailData.companyCategory== '1'">农业、林业</span>
							<span v-if="detailData.companyCategory== '2'">医药、卫生、劳动保护</span>
							<span v-if="detailData.companyCategory== '3'">矿业</span>
							<span v-if="detailData.companyCategory== '4'">石油</span>
							<span v-if="detailData.companyCategory== '5'">能源、核技术</span>
							<span v-if="detailData.companyCategory== '6'">化工</span>
							<span v-if="detailData.companyCategory== '7'">冶金</span>
							<span v-if="detailData.companyCategory== '8'">机械</span>
							<span v-if="detailData.companyCategory== '9'">电工</span>
							<span v-if="detailData.companyCategory== '10'">电子元件与信息技术</span>
							<span v-if="detailData.companyCategory== '11'">通信、广播</span>
							<span v-if="detailData.companyCategory== '12'">仪器、仪表</span>
							<span v-if="detailData.companyCategory== '13'">工程建设</span>
							<span v-if="detailData.companyCategory== '14'">建材</span>
							<span v-if="detailData.companyCategory== '15'">公路、水路运输</span>
							<span v-if="detailData.companyCategory== '16'">铁路</span>
							<span v-if="detailData.companyCategory== '17'">车辆</span>
							<span v-if="detailData.companyCategory== '18'">船舶</span>
							<span v-if="detailData.companyCategory== '19'">航空、航天</span>
							<span v-if="detailData.companyCategory== '20'">食品</span>
							<span v-if="detailData.companyCategory== '21'">轻工、文化与生活用品</span>
							<span v-if="detailData.companyCategory== '22'">环境保护</span>
						</td>
						<td>
							联系人：
							<span>{{detailData.companyContacts}}</span>
						</td>
					</tr>
					<tr>
						<td>
							联系人电话：
							<span>{{detailData.companyContactsCellphone}}</span>
						</td>
						<td>
							地址：
							<span>{{detailData.companyAddress}}</span>
						</td>
					</tr>
					<tr>
						<td>
							email：
							<span>{{detailData.companyEmail}}</span>
						</td>
						<td>
							身份证：
							<span>{{detailData.companyLerepCard}}</span>
						</td>
					</tr>
					<tr>
						<td>
							信用码：
							<span>{{detailData.creditCode}}</span>
						</td>
						<td>
							座机：
							<span>{{detailData.companyTelphone}}</span>
						</td>
					</tr>
					
				</table>
				<div class="img_detail">
					<div class="img_detail_cqf">
						<span>资质证明:</span>
						<div class="border-img">
							<img :src="companyQualificationsFile" alt="" width="178" height="178">
						</div>
					</div>
					<div class="img_detail_cqf">
						<span>证件正面照:</span>
						<div class="border-img">
							<img :src="idFrontUrl" alt="" width="178" height="178">
						</div>
					</div>

					<div class="img_detail_cqf">
						<span>证件反面照:</span>
						<div class="border-img">
							<img :src="idBackUrl" alt="" width="178" height="178">
						</div>
					</div>


				</div>

				<el-button @click="turn">确定</el-button>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {},
				baseUrl: 'http://118.25.64.92/',
				idFrontUrl: '',
				idBackUrl: '',
				companyQualificationsFile: ''
			};
		},
		created() {
			this.detailData = this.$route.params.scope || JSON.parse(localStorage.getItem("scope_detail"))


			this.idFrontUrl = (localStorage.getItem("idFrontUrl") || this.$route.params.scope.idFrontUrl)
			this.companyQualificationsFile = (localStorage.getItem("companyQualificationsFile") || this.$route.params
				.scope.companyQualificationsFile)
			this.idBackUrl = (localStorage.getItem("idBackUrl") || this.$route.params.scope.idBackUrl)
			if (this.$route.params.scope) {
				localStorage.setItem("scope_detail", JSON.stringify(this.$route.params.scope))
				localStorage.setItem('idFrontUrl', this.$route.params.scope.idFrontUrl);
				localStorage.setItem('companyQualificationsFile', this.$route.params.scope.companyQualificationsFile);
				localStorage.setItem('idBackUrl', this.$route.params.scope.idBackUrl);
			}
		},
		methods: {

			turn() {
				this.$router.push('/businessMgt')
				localStorage.removeItem("scope_detail")
				localStorage.removeItem("idFrontUrl")
				localStorage.removeItem("companyQualificationsFile")
				localStorage.removeItem("idBackUrl")

			}

		}
	};
</script>

<style lang="less">
	#detail {
		@color: #398bf7;
		width: 100%;

		.img_detail_cqf {
			position: relative;
			height: 200px;
			span {
				position: absolute;
				top: 0;
				left: 0;
			}

			.border-img {
				width: 178px;
				height: 180px;
				margin-left: 100px;
				float: left;
				border: 1px dashed #cccccc;
				border-radius: 10px;

				img {
					border-radius: 10px
				}
			}
		}

		.img_detail {
			img:nth-child(2) {
				margin-left: 50px
			}

			img:nth-child(3) {
				margin-left: 50px
			}
		}

		.el-breadcrumb {
			margin-bottom: 20px;
		}

		.el-breadcrumb__item:last-child {
			span {
				color: @color;
			}
		}

		.ac-top {
			width: 100%;
			padding: 10px 20px;
			background-color: #fff;
			box-sizing: border-box;

			h3 {
				font-weight: normal;
				border-bottom: 1px solid #ebebeb;
				line-height: 30px;
				font-size: 18px;
			}

			div {
				float: left;
				margin-right: 60px;
				line-height: 113px;
				margin-left: 40px;
				font-size: 14px;

				span {
					font-weight: 700;
				}
			}
		}

		.ac-bottom {
			margin-top: 10px;
			background-color: #fff;
			padding: 20px 0 60px 40px;
		}

		table {

			// width: 70%;
			// position: relative;
			tr {
				td {
					line-height: 42px;
				}

				td:nth-child(2) {
					padding-left: 198px;
					// position: absolute;
					// left: 398px;
				}
			}
		}

		.el-button {
			width: 90px;
			height: 36px;
			background-color: #398bf7;
			color: #fff;
			line-height: 12px;
			margin-left: 88px;
			margin-top: 40px;
		}

		.aD-image {
			margin-top: 10px;

			img {
				vertical-align: top;
			}
		}
	}
</style>
