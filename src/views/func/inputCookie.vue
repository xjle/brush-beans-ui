<template>
  <div style="margin:0 10px;">
    <el-button
      type="primary"
      @click="onUpload"
      :disabled="btnFlag"
      >手动输入</el-button
    >

    <Modal
      v-if="mShow"
      :show="mShow"
      :title="mTitle"
      :render="mRender"
      :footer="mFooter"
      @onCancle="onModalCancle"
    />
      <Message v-if="mshow" :show="mshow" :type="mtype" :message="mmessage" />
  </div>
</template>
<script>
import { addWsCookie } from '../../api/auto'
import Modal from '../../components/Modal.vue'
import Message from '../../components/Message.vue'
export default {
  components: {
    Modal,
    Message
  },
  data () {
    return {
      // 模态框
      mShow: false,
      mTitle: '授权登录',
      mRender: null,
      mFooter: false,
      // 提示框
      mshow: false,
      mtype: null,
      mmessage: '',
      // 按钮禁用
      btnFlag: true,
      btnDisable: false,
      btnLoading: false,
      // value值
      ptPin: '',
      ptKey: ''
    }
  },
  mounted () {},
  watch: {
    '$store.state.login': {
      deep: true,
      handler: function (value) {
        if (value) {
          this.btnFlag = false
        } else {
          this.btnFlag = true
        }
      }
    }
  },
  methods: {
    onSubmitFunc () {
      this.btnDisable = true
      this.btnLoading = true
      const value = 'pt_key=' +
                this.ptKey +
                ';' +
                'pt_pin=' +
                this.ptPin +
                ';'
      this.onSubmit(value)
    },
    messageFunc (val) {
      this.btnDisable = false
      this.btnLoading = false
      this.mtype = val
      this.mmessage = val === 'success' ? '操作成功' : '操作失败'
      this.mshow = true
      setTimeout(() => {
        this.mshow = false
      }, 3000)
    },
    async onSubmit (value) {
      const { data } = await addWsCookie({ jsonObject: value })
      console.log(data)
      if (data.code === 200) {
        this.messageFunc('success')
      } else {
        this.messageFunc('error')
      }
    },
    onModalCancle () {
      this.mShow = false
    },
    onUpload () {
      this.mShow = true
      this.mTitle = '输入pin和key'
      this.mRender = h => {
        return h(
          'form',
          {
            class: 'brush-form '
          },
          [
            h('span', 'ptPin:'),
            h('input', {
              class: 'brush-input brush-mrgin-bottom brush-mrgin-left',
              style: 'width: 50%;',
              attrs: {
                type: 'text',
                placeholder: '输入ptPin'

              },
              on: {
                input: (event) => {
                  this.ptPin = event.target.value
                }
              }
            }),
            h('br'),
            h('span', 'ptKey:'),
            h('input', {
              class: 'brush-input brush-mrgin-bottom brush-mrgin-left',
              style: 'width: 50%;',
              attrs: {
                type: 'text',
                placeholder: '输入ptKey'
              },
              on: {
                input: (event) => {
                  this.ptKey = event.target.value
                }
              }
            }),
            h('br'),
            h(
              'el-button',
              {
                class: ' brush-mrgin-bottom',
                props: {
                  type: 'primary',
                  loading: this.btnLoading,
                  disabled: this.btnDisable
                },
                on: {
                  click: this.onSubmitFunc
                }
              },
              '上传'
            )
          ]
        )
      }
    }
  }
}
</script>
