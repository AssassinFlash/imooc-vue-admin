<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
        />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          :type="passwordType"
        />
        <span class="show-pwd" @click="onChangePwdType">
          <SvgIcon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import { ref } from 'vue'

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 校验规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名不能为空'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 处理密码框文本显示状态
const passwordType = ref('password')
// 点击事件
const onChangePwdType = () => {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password')
}

// 处理登录
const loginFormRef = ref(null)
const store = useStore()
const loading = ref(false)
const handleLogin = () => {
  // 1. 触发表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    // 2. 登录请求
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // TODO: 登录后处理
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  width: 100%;
  min-height: 100%;
  background: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    padding: 160px 35px 0;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      vertical-align: middle;
      width: 85%;
      height: 47px;

      input {
        height: 47px;
        border: 0;
        border-radius: 0;
        background: transparent;
        -webkit-appearance: none;
        padding: 12px 5px 12px 5px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }

    .svg-container {
      display: inline-block;
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: $light_gray;
        font-weight: bold;
        font-size: 26px;
      }

      :deep(.lang-select) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        background: #fff;
        padding: 5px;
        border-radius: 5px;
        font-size: 24px;
      }
    }

    .show-pwd {
      position: absolute;
      top: 7px;
      right: 15px;
      color: $dark_gray;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }

    .tips {
      line-height: 24px;
      font-size: 16px;
      color: white;
    }
  }
}
</style>
