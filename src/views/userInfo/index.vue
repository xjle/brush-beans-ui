<template>
  <div>
    <div id="test">
      <div v-if="flag">
        <p></p>
        <div class="top">
          <div>
            <span>用户：{{ name }}</span>
          </div>
          <div style="text-align: right">
            <!-- <span class="brush-cursor txt-color" @click="onUpdate">
              修改信息
            </span> -->
            <getCookies />
            <el-button
              type="text"
              class="brush-cursor txt-color"
              @click="onUpdate"
              >修改信息</el-button
            >
            <span
              class="brush-mrgin-left brush-cursor txt-color"
              @click="onLogout"
            >
              退出登录
            </span>
          </div>
        </div>
      </div>
      <div v-else>
        <el-button type="primary" @click="onLogin">登录</el-button>
        <el-button class="btn" @click="onRegister">注册</el-button>
      </div>
    </div>
    <Modal
      v-if="mShow"
      :show="mShow"
      :title="mTitle"
      :render="mRender"
      :footer="mFooter"
      @onCancle="onModalCancle"
    />
    <Modal
      v-if="updateUserShow"
      :show="updateUserShow"
      :title="updateUserTitle"
      :render="updateUserRender"
      :footer="updateUserFooter"
      @onCancle="onModalCancle"
    />

    <Message v-if="mshow" :show="mshow" :type="mtype" :message="mmessage" />
  </div>
</template>
<script>
import { Login, userInfo, Register, Logout, updateUser } from '../../api/auto.js'
import Modal from '../../components/Modal.vue'
import Message from '../../components/Message.vue'
import getCookies from '../func/getCookieList.vue'
export default {
  components: {
    Modal,
    Message,
    getCookies
  },

  data () {
    return {
      flag: false,
      name: '',
      // form表单
      username: '',
      password: '',
      nickname: '',
      // 模态框
      mShow: false,
      mTitle: '授权登录',
      mRender: null,
      mFooter: false,
      // 修改用户信息 模态框
      updateUserShow: false,
      updateUserTitle: '修改个人信息',
      updateUserRender: null,
      updateUserFooter: false,
      btnFlag: false,
      userForm: {
        nickname: ''
      },
      // 消息提示框
      mmessage: '表体',
      mshow: false,
      mtype: 'success'
    }
  },
  mounted () {
    this.userInfoFunc()
  },
  methods: {
    onUpdate () {
      this.updateUserShow = true
      this.updateUserTitle = '修改个人信息'
      this.updateUserRender = (h) => {
        return h(
          'form',
          {
            class: 'brush-form'
          },
          [
            h('input',
              {
                class: 'brush-input brush-mrgin-bottom',
                attrs: {
                  placeholder: '输入新的昵称',
                  type: 'text'
                },
                on: {
                  input: (event) => {
                    this.userForm.nickname = event.target.value
                  }
                }
              },
              []),
            h('br'),
            h('el-button',
              {
                class: 'brush-mrgin-bottom',
                props: {
                  type: 'primary',
                  disabled: this.btnFlag,
                  loading: this.btnFlag
                },
                on: {
                  click: this.onUpdateUserFunc
                }
              },
              '确认')
          ]
        )
      }
      // this.mtype = 'info'
      // this.mshow = true
      // this.mmessage = '暂时不支持修改'
      // setTimeout(() => {
      //   this.mshow = false
      // }, 3000)
    },
    async onUpdateUserFunc () {
      if (this.userForm.nickname.trim() !== '') {
        this.btnFlag = true
        const { data } = await updateUser(this.userForm)
        console.log(data)
        if (data.code === 200) {
          this.btnFlag = false
          this.mtype = 'success'
          this.mmessage = '操作成功'
          this.messageFunc()
        } else {
          this.btnFlag = false
          this.mtype = 'error'
          this.mmessage = '操作失败'
          this.messageFunc()
        }
      } else {
        this.mtype = 'info'
        this.mshow = true
        this.mmessage = '昵称不允许为空'
        setTimeout(() => {
          this.mshow = false
        }, 3000)
      }
    },
    authFunc (e) {
      e.stopPropagation()
      const phoneReg = /(^1[1-9]\d{9}$)|(^0\d{10}$)/
      if (!phoneReg.test(this.username)) {
        this.mtype = 'error'
        this.mmessage = '请输入正确的手机号'
        this.messageFunc()
        return false
      }
      const params = {
        username: this.username,
        password: this.password,
        rememberMe: true
      }
      if (this.nickname) {
        // 注册
        params.nickname = this.nickname
        this.RegisterFunc(params)
      } else {
        // 登录
        this.LoginFunc(params)
      }
    },
    messageFunc () {
      this.mshow = true
      setTimeout(() => {
        this.mshow = false
      }, 3000)
    },
    onLogout () {
      this.logoutFunc()
    },
    async logoutFunc () {
      const { data } = await Logout()
      if (data.code === 200) {
        this.flag = false
        this.mtype = 'success'
        this.mmessage = '操作成功'
        this.messageFunc()
        this.$store.commit('SET_LOGIN', false)
      }
    },
    onLogin () {
      this.mShow = true
      this.mTitle = '登录'
      this.mRender = (h) => {
        return h(
          'form',
          {
            class: 'brush-form '
          },
          [
            h('input', {
              class: 'brush-input brush-mrgin-bottom',
              attrs: {
                type: 'text',
                placeholder: '输入手机号'
              },
              on: {
                input: (event) => {
                  this.username = event.target.value
                }
              }
            }),
            h('br'),
            h('input', {
              class: 'brush-input brush-mrgin-bottom',
              attrs: {
                type: 'password',
                placeholder: '输入密码'
              },
              on: {
                input: (event) => {
                  this.password = event.target.value
                }
              }
            }),
            h('br'),
            h(
              'button',
              {
                class: 'btn btn-primary brush-mrgin-bottom',
                attrs: {
                  type: 'button'
                },
                on: {
                  click: this.authFunc
                }
              },
              '登录'
            )
          ]
        )
      }
    },
    async userInfoFunc () {
      const { data } = await userInfo()
      if (data.code === 200) {
        this.$store.commit('SET_LOGIN', true)
        this.flag = true
        this.name = data.data.nickname
          ? data.data.nickname
          : data.data.username
      } else {
        this.flag = false
        this.$store.commit('SET_LOGIN', false)
        // this.mtype = 'error'
        // this.mmessage = '请先登录插件账号'
        // this.messageFunc()
      }
    },
    async RegisterFunc (params) {
      const { data } = await Register(params)
      if (data.code === 200) {
        // 注册成功
        this.mtype = 'success'
        this.mmessage = data.message
        this.messageFunc()
        localStorage.setItem('brushToken', data.data.token) // 设置登录状态
        this.mShow = false
        this.clearFunc()
        this.userInfoFunc()
      } else {
        this.mtype = 'error'
        this.mmessage = data.message
        this.messageFunc()
      }
    },
    onRegister () {
      this.mTitle = '注册'
      this.mShow = !this.mShow
      this.mRender = (h) => {
        return h('div', { class: 'brush-form ' }, [
          h('input', {
            class: 'brush-input brush-mrgin-bottom',
            attrs: {
              type: 'text',
              placeholder: '输入昵称'
            },
            on: {
              input: (event) => {
                this.nickname = event.target.value
              }
            }
          }),
          h('br'),
          h('input', {
            class: 'brush-input brush-mrgin-bottom',
            attrs: {
              type: 'text',
              placeholder: '输入手机号'
            },
            on: {
              input: (event) => {
                this.username = event.target.value
              }
            }
          }),
          h('br'),
          h('input', {
            class: 'brush-input brush-mrgin-bottom',
            attrs: {
              type: 'password',
              placeholder: '输入密码'
            },
            on: {
              input: (event) => {
                this.password = event.target.value
              }
            }
          }),
          h('br'),
          h(
            'button',
            {
              class: 'btn btn-primary brush-mrgin-bottom',
              on: {
                click: this.authFunc
              }
            },
            '注册'
          )
        ])
      }
    },

    async LoginFunc (params) {
      const { data } = await Login(params)
      if (data.code === 200) {
        // 登录成功
        this.mtype = 'success'
        this.mmessage = data.message
        this.messageFunc()
        localStorage.setItem('brushToken', data.data.token) // 设置登录状态
        this.mShow = false
        this.clearFunc()
        this.userInfoFunc()
      } else {
        this.mtype = 'error'
        this.mmessage = data.message
        this.messageFunc()
      }
    },
    onModalCancle (value) {
      this.mShow = value
      this.updateUserShow = value
      this.btnFlag = false
      this.clearFunc()
    },
    clearFunc () {
      this.username = ''
      this.password = ''
      this.nickname = ''
    }
  }
}
</script>
<style lang="less" scoped>
#test {
  .top {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    .txt-color:hover {
      color: #ff2a00;
    }
  }
}
</style>
