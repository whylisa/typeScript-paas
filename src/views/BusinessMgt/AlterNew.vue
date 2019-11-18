<template>
	<div id="addNew">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>企业管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/businessMgt' }">企业管理</el-breadcrumb-item>
			<el-breadcrumb-item>修改</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="aC-input">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" label-width="140px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="公司名称" prop="companyName">
					<el-input v-model="ruleForm.companyName" placeholder="公司名称"></el-input>
				</el-form-item>
				<el-form-item label="公司地址" prop="companyAddress">
					<el-input v-model="ruleForm.companyAddress" placeholder="请输入公司地址"></el-input>
				</el-form-item>
				<el-form-item label="所属地区">
					<el-select v-model="ruleForm.area" placeholder="请选择行业类别">
						<el-option v-for="(item,index) in areaIds" :label="item.areaName" :key="index" :value="item.areaId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服务时长" prop="companyLerep">
					<el-input v-model="ruleForm.companyLerep" placeholder="请输入公司法人"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="companyContacts">
					<el-input v-model="ruleForm.companyContacts" placeholder="请输入联系人"></el-input>
				</el-form-item>

				<el-form-item label="手机号码" prop="companyContactsCellphone">
					<el-input v-model="ruleForm.companyContactsCellphone" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<el-form-item label="业务员">
				  <el-input v-model="ruleForm.sellerId" placeholder="请输入业务员"></el-input>
				</el-form-item>
				<el-form-item label="行业类别" prop="companyCategory">
					<el-select v-model="ruleForm.companyCategory" placeholder="请选择行业类别">
						<el-option v-for="(item,index) in companyCate" :label="item.label" :key="index" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号" prop="companyLerepCard">
					<el-input v-model="ruleForm.companyLerepCard" placeholder="请输入身份证号"></el-input>
				</el-form-item>
				<el-form-item label="统一社会信用代码" prop="creditCode">
					<el-input v-model="ruleForm.creditCode" placeholder="请输入统一社会信用代码"></el-input>
				</el-form-item>
				<el-form-item label="座机电话" prop="companyTelphone">
					<el-input v-model="ruleForm.companyTelphone" placeholder="请输入公司座机"></el-input>
				</el-form-item>
				<el-form-item label="Email" prop="companyEmail">
					<el-input v-model="ruleForm.companyEmail" placeholder="请输入Email"></el-input>
				</el-form-item>
				<div class="aC-image">
					<el-form-item label="上传资质" prop="qualiUrl">
						<el-upload class="avatar-uploader" action="http://gateway.paasw.com/sioo-admin-web/oss/file/upload"
						 :show-file-list="false" :headers="uploadHeader" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="companyQualificationsFile" :src="companyQualificationsFile" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">点击上传证件照片</div>
						</el-upload>
					</el-form-item>
				</div>
				<div class="aC-image">
					<el-form-item label="法人身份证" prop="idFrontUrl">
						<el-upload class="avatar-uploader" action="http://gateway.paasw.com/sioo-admin-web/oss/file/upload"
						 :show-file-list="false" :headers="uploadHeader" :on-success="handleAvatarSuccessFront" :before-upload="beforeAvatarUpload"
						 style="display:inline-block;margin-right:50px;">
							<img v-if="idFrontUrl" :src="idFrontUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">点击上传证件正面照</div>
						</el-upload>
					</el-form-item>
					<el-form-item prop="idBackUrl">
						<el-upload class="avatar-uploader" action="http://gateway.paasw.com/sioo-admin-web/oss/file/upload"
						 :show-file-list="false" :headers="uploadHeader" :on-success="handleAvatarSuccessBack" :before-upload="beforeAvatarUpload"
						 style="display:inline-block;">
							<img v-if="idBackUrl" :src="idBackUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">点击上传证件反面照</div>
						</el-upload>
					</el-form-item>
				</div>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type: 'text',
				// myHeaders:{ "Content-Type":"application/json" },
				// myHeaders: { 'Content-Type': 'multipart/form-data' },
				uploadHeader: {
					"X-Auth-Token": sessionStorage.getItem('myToken_admin')
				},
				// uploadHeader:{token:"5a041e7fc9da52000e1c5278"},

				companyCate: [{
						label: "互联网",
						value: 0
					},
					{
						label: "农业、林业",
						value: 1
					},
					{
						label: "医药、卫生、劳动保护",
						value: 2
					},
					{
						label: "矿业",
						value: 3
					},
					{
						label: "石油",
						value: 4
					},
					{
						label: "能源、核技术",
						value: 5
					},
					{
						label: "化工",
						value: 6
					},
					{
						label: "冶金",
						value: 7
					},
					{
						label: "机械",
						value: 8
					},
					{
						label: "电工",
						value: 9
					},
					{
						label: "电子元件与信息技术",
						value: 10
					},
					{
						label: "通信、广播",
						value: 11
					},
					{
						label: "仪器、仪表",
						value: 12
					},
					{
						label: "工程建设",
						value: 13
					},
					{
						label: "建材",
						value: 14
					},
					{
						label: "公路、水路运输",
						value: 15
					},
					{
						label: "铁路",
						value: 16
					},
					{
						label: "车辆",
						value: 17
					},
					{
						label: "船舶",
						value: 18
					},
					{
						label: "航空、航天",
						value: 19
					},
					{
						label: "食品",
						value: 20
					},
					{
						label: "轻工、文化与生活用品",
						value: 21
					},
					{
						label: "环境保护",
						value: 22
					}
				],
				companyQualificationsType: [{
						label: "三证合一",
						value: 1
					},
					{
						label: "五证合一",
						value: 2
					},
					{
						label: "非营利性企业",
						value: 3
					}
				],
				submitType: [{
						label: "HTTP",
						value: 1
					},
					{
						label: "CMPP",
						value: 2
					},
					{
						label: "非接口",
						value: 3
					}
				],
				areaIds: [],
				ruleForm: {
					// type: 2,
					sellerId: '',
					area: '',
					username: "",
					password: "",
					companyName: "",
					companyLerep: "",
					companyAddress: "",
					companyContacts: "",
					companyLerepCard: "",
					companyContactsCellphone: "",
					companyEmail: "",
					companyCategory: "",
					qualiUrl: "",
					creditCode: "",
					companyQualificationsFile: '',
					idFrontUrl: "",
					idBackUrl: "",
					companyTelphone: ""
				},
				idFrontUrl: '',
				companyQualificationsFile: '',
				idBackUrl: '',
				baseUrl: 'http://118.25.64.92/',
				rules: {
					username: [{
							required: true,
							message: "请输入用户名",
							trigger: "blur"

						},
						{
							pattern: /^[0-9a-zA-Z]+$/,
							message: "用户名不能为中文，只能为数字和字母"
						},
						{
							min: 3,
							max: 16,
							message: "长度在 3 到 16 个字符",
							trigger: "blur"
						}
					],
					password: [{
							required: true,
							message: "请输入初始密码",
							trigger: "blur"
						},
						{
							min: 6,
							max: 16,
							message: "长度在 6 到 16 个字符",
							trigger: "blur"
						}
					],
					companyName: [{
							required: true,
							message: "请输入公司名称",
							trigger: "blur"
						},
						{
							min: 0,
							max: 24,
							message: "长度在 0 到 24 个字符",
							trigger: "blur"
						}
					],
					companyLerep: [{
							required: true,
							message: "请输入公司法人",
							trigger: "blur"
						},
						{
							min: 0,
							max: 10,
							message: "长度在 0 到 10 个字符",
							trigger: "blur"
						}
					],
					companyLerepCard: [{
						required: true,
						pattern: /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/,
						message: "请输入正确的身份证号",
						trigger: "blur"
					}],
					companyAddress: [{
							required: true,
							message: "请输入企业地址",
							trigger: "blur"
						}
						// { message: "长度在 6 到 12 个字符", trigger: "blur" }
					],
					creditCode: [{
							required: true,
							message: "请输入统一社会信用代码",
							trigger: "blur"
						},
						{
							message: "长度在 0 到 20 个字符",
							trigger: "blur"
						}
					],
					companyCategory: [{
						required: true,
						message: "请输入行业类别",
						trigger: "blur"
					}],
					companyContacts: [{
						required: true,
						message: "请输入联系人",
						trigger: "blur"
					}],
					companyContactsCellphone: [{
							required: true,
							message: "请输入正确的联系人电话",
							trigger: "blur"
						},
						{
							pattern: /^[0-9]+$/,
							message: "请输入数字"
						},
						{
							min: 11,
							max: 11,
							message: "长度为11个字符",
							trigger: "blur"
						}
					],
					companyEmail: [{
							type: "email",
							message: "请输入正确的email地址",
							trigger: "blur"
						},
						{
							min: 0,
							max: 50,
							message: "长度在 0 到 50 个字符",
							trigger: "blur"
						}
					],
					qualiUrl: [
						// { required: true, message: "请上传资质文件", trigger: "blur" }
					],
					idFrontUrl: [
						// { required: true, message: "请上传证件正面照", trigger: "blur" }
					],
					idBackUrl: [
						// { required: true, message: "请上传证件反面照", trigger: "blur" }
					]
				}
			};
		},
		created() {
			this.axios({
				method: 'get',
				url: '/user/findAllArea',
				params: {
					parentId: '-1'
				}
			}).then(res => {
				console.log(res)
				if (res.data.code == '200') {
					this.areaIds = res.data.data
					console.log(this.areaIds)
				}
			})
		this.ruleForm = this.$route.params.scope || JSON.parse(localStorage.getItem("scope"))
		this.idFrontUrl = (localStorage.getItem("idFrontUrl") || this.$route.params.scope.idFrontUrl)
		this.companyQualificationsFile = (localStorage.getItem("companyQualificationsFile") || this.$route.params.scope.companyQualificationsFile)
		this.idBackUrl = (localStorage.getItem("idBackUrl") || this.$route.params.scope.idBackUrl)
		if (this.$route.params.scope) {
			localStorage.setItem('scope', JSON.stringify(this.$route.params.scope));
			localStorage.setItem('idFrontUrl', this.$route.params.scope.idFrontUrl);
			localStorage.setItem('companyQualificationsFile', this.$route.params.scope.companyQualificationsFile);
			localStorage.setItem('idBackUrl', this.$route.params.scope.idBackUrl);
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.axios({
						method: "post",
						url: "/companyInfo/update",
						data: this.ruleForm,
						headers: {
							"Content-Type": "application/json"
						}
					}).then(res => {
						console.log(res);
						if (res.data.code == "200") {
							this.$router.push("/businessMgt");
							this.$message.success("修改成功！");
						}else {
							this.$message.error(res.data.message)
						}
					});
					console.log(this.ruleForm);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		handleAvatarSuccess(res, file) {
			this.ruleForm.companyQualificationsFile = res.data
			this.companyQualificationsFile = URL.createObjectURL(file.raw);
		},
		handleAvatarSuccessFront(res, file) {
			this.ruleForm.idFrontUrl = res.data

			this.idFrontUrl = URL.createObjectURL(file.raw);
		},
		handleAvatarSuccessBack(res, file) {
			this.ruleForm.idBackUrl = res.data
			this.idBackUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			// console.log(file)
			const isJPG = file.type === "image/jpeg" || "image/png";
			const isLt5M = file.size / 1024 / 1024 < 5;

			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
			}
			if (!isLt5M) {
				this.$message.error("上传头像图片大小不能超过 5MB!");
			}
			return isJPG && isLt5M;
		}
	}
	};
</script>

<style lang="less">
	#addNew {
		.aC-input {
			margin-top: 20px;
			background-color: #ffffff;
			padding: 20px 0 20px 20px;
			box-sizing: border-box;

			.el-input {
				width: 190px;
			}

			.el-form {
				width: 1100px;
			}

			.aC-image {
				margin-left: 32px;
				width: 80%;

				.el-form-item__label {
					width: 108px !important;
				}

				.avatar-uploader .el-upload {
					border: 1px dashed #d9d9d9;
					border-radius: 6px;
					cursor: pointer;
					position: relative;
					overflow: hidden;
				}

				.avatar-uploader .el-upload:hover {
					border-color: #409eff;
				}

				.avatar-uploader-icon {
					font-size: 28px;
					color: #8c939d;
					width: 178px;
					height: 178px;
					line-height: 178px;
					text-align: center;
				}

				.avatar {
					width: 178px;
					height: 178px;
					display: block;
				}
			}

			.el-form-item {
				.el-button {
					width: 90px;
					height: 36px;
				}

				.el-button--primary {
					background-color: #398bf7;
					margin-left: 140px;
				}
			}
		}

		@media screen and (max-width: 1250px) {
			.aC-input {
				.el-form {
					width: 930px;
				}
			}
		}
	}
</style>
