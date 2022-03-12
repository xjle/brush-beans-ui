<template>
  <div style="margin: 0 10px">
    <el-button @click="onClear">清除缓存</el-button>
    <Message v-if="mshow" :show="mshow" :type="mtype" :message="mmessage" />
    <Modal
      v-if="mShow"
      :show="mShow"
      :title="mTitle"
      :content="mContent"
      :footer="mFooter"
      @onCancle="onModalCancle"
      @onOk="onModalOk"
    />
  </div>
</template>
<script>
import Message from '../../components/Message.vue'
import Modal from '../../components/Modal.vue'
export default {
  components: {
    Message,
    Modal
  },
  data () {
    return {
      // 信息提示
      mshow: false,
      mtype: null,
      mmessage: '',
      // 模态框
      mShow: false,
      mTitle: '警告',
      mContent: '是否清空京东cookie（清空后可以登录其他京东号）',
      mFooter: true,
      // 按钮禁用
      btnFlag: true
    }
  },
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
    onClear () {
      this.mShow = true
    },
    onModalCancle () {
      this.mShow = false
    },
    onModalOk () {
      this.btnFlag = true
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage(
        {
          id: 'clearCookies'
        },
        (res) => {
          const params = JSON.parse(res)
          console.log(params)
          this.mtype = 'success'
          this.mmessage = '操作成功'
          this.mshow = true
          this.mShow = false
          // 强制刷新
          setTimeout(() => {
            location.reload()
          }, 2000)
        }
      )
    }
  }
}
</script>
