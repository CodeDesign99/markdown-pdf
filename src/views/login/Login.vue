<template>
  <div class="login-container">
    <div class="login-box">
      <span class="borderLine"></span>
      <form class="login-form" @submit.prevent="login">
        <h2>Sign in</h2>
        <div class="inputBox">
          <input type="text" v-model="username" required>
          <span>Username</span>
          <i></i>
        </div>
        <div class="inputBox">
          <input type="password" v-model="password" required>
          <span>Password</span>
          <i></i>
        </div>
        <div class="links">
          <a href="#">Forgot Password</a>
          <a href="#">Signup</a>
        </div>
        <input type="submit" value="Login">
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiLogin } from "/@/api/login"
import nProgress from 'nprogress';

const router = useRouter()
const username = ref('');
const password = ref('');
const login = () => {
  apiLogin('/login', {
    username: username.value,
    password: password.value
  }).then((res) => {
    console.log(res);
    nProgress.start()
    router.push('/home');
  }).catch(err => {
    console.log(err);
    alert('Login failed. Please check your credentials.');
  }).finally(() => {
    nProgress.done()
  })
};
</script>

<style lang="scss" scoped>
.login-container{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #23242a;
}
.login-box {
  position: relative;
  width: 380px;
  height: 420px;
  background: #1c1c1c;
  border-radius: 8px;
  overflow: hidden;
  &::before, &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380px;
    height: 420px;
    background: linear-gradient(0deg, transparent, transparent, #45f3ff, #45f3ff, #45f3ff);
    z-index: 1;
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
  }
  &::after {
    animation-delay: -3s;
  }
  .borderLine {
    position: absolute;
    top: 0;
    inset: 0;
    &::before, &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 380px;
      height: 420px;
      background: linear-gradient(0deg, transparent, transparent, #ff2770, #ff2770, #ff2770);
      z-index: 1;
      transform-origin: bottom right;
      animation: animate 6s linear infinite;
      animation-delay: -1.5s;
    }
    &::after {
      animation-delay: -4.5s;
    }
  }
  .login-form {
    position: absolute;
    inset: 4px;
    background: #222;
    padding: 50px 40px;
    border-radius: 8px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    h2 {
      color: #fff;
      font-weight: 500;
      text-align: center;
      letter-spacing: 0.1em;
    }
    .inputBox {
      position: relative;
      width: 300px;
      margin-top: 35px;
      input {
        position: relative;
        width: 100%;
        padding: 20px 10px 10px;
        background: transparent;
        outline: none;
        border: none;
        box-shadow: none;
        color: #23242a;
        font-size: 1em;
        letter-spacing: 0.005em;
        transition: 0.5s;
        z-index: 10;
        &:valid ~span, &:focus ~span {
          color: #fff;
          font-size: 0.75em;
          transform: translateY(-34px);
        }
        &:valid ~i, &:focus ~i {
          height: 44px;
        }
      }
      span {
        position: absolute;
        left: 0;
        padding: 20px 0px 10px;
        pointer-events: none;
        color: #8f8f8f;
        font-size: 1em;
        letter-spacing: 0.05em;
        transition: 0.5s;
      }
      i {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        transition: 0.5s;
        pointer-events: none;
      }
    }
    .links {
      display: flex;
      justify-content: space-between;
      a {
        margin: 10px 0;
        font-size: 0.75em;
        color: #8f8f8f;
        text-decoration: none;
        &:hover, &:nth-child(2) {
          color: #fff;
        }
      }
    }
    input[type="submit"] {
      border: none;
      outline: none;
      padding: 9px 25px;
      background: #fff;
      cursor: pointer;
      font-size: 0.9em;
      border-radius: 4px;
      font-weight: 600;
      width: 100px;
      margin-top: 10px;
      color: #1c1c1c;
      &:active {
        opacity: 0.8;
      }
    }
  }
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
