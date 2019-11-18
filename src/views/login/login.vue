<template>
	<div id="login">
    <div class="l-right">
      <div class="l-l">
        <!-- @tab-click="handleClick" -->
        <h3>用户登录</h3>
        <el-form ref="loginForm" status-icon :rules="rules" :model="form" label-width="80px">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              prefix-icon="iconfont icon-yonghuming"
			        @keyup.enter.native="pass"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- 将来我们给组件注册事件的时候，可以会注册不上 -->
            <!-- .native: 注册事件，给组件的根元素注册事件 -->
            <el-input
		      	  ref="input"
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              @keyup.enter.native="login"
              prefix-icon="iconfont icon-mima"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class Login extends Vue {
// mounted() {
// let el:any = this.$refs.ceshi;

// }
public $router: any;
public $refs: any;
public $axios: any;
public form: object = {
                        username: '',
                        password: '',
                      };
private rules: object = {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 16, message: '长度在 3 到 16个字符', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'change',
          },
        ],
      };
private login(): void {
  this.$refs.loginForm.validate(async (valid: boolean) => {
  if (valid) {
    const res: any = await this.$axios({
      method: 'post',
      url: '/admin/login',
      params: this.form,
    });
    if (res.data.code === 200) {
      sessionStorage.setItem('myToken_admin', res.data.data);
      this.$router.push('home');
    }
  }
  });
}

private pass(): void {
  this.$refs.input.focus();
}
}
</script>

<style lang="less">
#login {
  width: 100%;
  height: 100%;
  background: url(../../assets/main/72aab8d0-db4b-49b0-9008-3eeb4eb7faab.gif) no-repeat;
  background-size: cover;
  .l-img {
		width: 100%;
  	height: 68px;
  	background-color: #fff;
  	// float: left;
    position: fixed;
    left: 0;
    top:0;
  	img {
  		position: absolute;
			left: 20%;
			top: 0;
			margin-top: 20px;
  	}
  }
  .l-right {
    width: 50%;
    height: 100%;
    // float: right;
    position: relative;
    left: 50%;
    // top: 10%;
    .l-l {
      width: 438px;
      height: 350px;
      position: absolute;
      top: 50%;
      left: 18%;
      margin-top: -175px;
      background-color: #fff;
      padding: 30px 5%;
      box-sizing: border-box;
      transition: all 1s;
      h3 {
        color: #398bf7;
        text-align: center;
        // margin-top: 30px;
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: normal;
      }
      .el-tabs {
        width: 100%;
      }
      .el-form-item__content {
        margin-left: inherit !important;
      }
      .el-form {
        div:nth-child(3) {
          .el-input {
            width: 65% !important;
          }
          img {
            width: 28%;
            height: 40px;
            margin-left: 5%;
          }
				}
				.el-button{
					width: 100%;
					background-color: #398BF7;
				}
      }
    }
  }
}
@media only screen and (max-width: 1400px) {
  .l-l {
    width: 333px !important;
    height: 350px;
    .el-tabs__item {
      padding: inherit !important;
    }

    #tab-second {
      width: 125px !important;
    }

    #tab-first {
      width: 125px !important;
    }
  }
}
</style>
