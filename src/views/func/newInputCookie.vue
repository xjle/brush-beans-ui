<template>
  <div style="margin: 0 10px">
    <el-button type="primary" @click="onUpload">手动输入</el-button>
    <el-dialog
      :footer="null"
      title="手动输入pin和key"
      :visible.sync="dialogVisible"
      :fullscreen="true"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane style="magin: 0 auto" label="输入pinKey" name="JD_COOKIE">
          <el-form
            style="width: 50%; margin: 0 auto"
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="ptPin">
              <el-input v-model="form.ptPin"></el-input>
            </el-form-item>

            <el-form-item label="ptKey">
              <el-input v-model="form.key"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                :disabled="btnDisable"
                :loading="btnLoading"
                @click="onSubmitFunc"
                >上传</el-button
              >
              <!-- <el-button @click="dialogVisible = false">取消</el-button> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="输入wsKey" name="JD_WSCK">
          <el-form
            style="width: 50%; margin: 0 auto"
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="ptPin">
              <el-input v-model="form.ptPin"></el-input>
            </el-form-item>

            <el-form-item label="wsKey">
              <el-input v-model="form.key"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                :disabled="btnDisable"
                :loading="btnLoading"
                @click="onSubmitFunc"
                >上传</el-button
              >
              <!-- <el-button @click="dialogVisible = false">取消</el-button> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <Message v-if="mshow" :show="mshow" :type="mtype" :message="mmessage" />
  </div>
</template>
<script>
import { addWsCookie } from '../../api/auto'
import Message from '../../components/Message.vue'
export default {
  components: {
    Message
  },
  data () {
    return {
      // 提示框
      mshow: false,
      mtype: null,
      mmessage: '',
      // 按钮禁用
      btnFlag: true,
      btnDisable: false,
      btnLoading: false,
      // 模态框
      dialogVisible: false,
      activeName: 'JD_COOKIE',
      form: {
        ptPin: '',
        key: '',
        remark: ''
      }
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
    handleClick () {
      this.changeData()
    },
    changeData () {
      this.form.ptPin = ''
      this.form.key = ''
      this.form.remark = ''
      this.btnDisable = false
      this.btnLoading = false
    },
    onSubmitFunc () {
      this.btnDisable = true
      this.btnLoading = true
      const value =
        this.activeName === 'JD_COOKIE'
          ? 'pt_key=' + this.form.key + ';' + 'pt_pin=' + this.form.ptPin + ';'
          : 'pin=' + this.form.ptPin + ';' + 'wskey=' + this.form.key + ';'
      this.onSubmit(value)
    },
    messageFunc (val) {
      this.btnDisable = false
      this.btnLoading = false
      this.mtype = val
      // this.mmessage = val === 'success' ? '操作成功' : '操作失败'
      this.mshow = true
      setTimeout(() => {
        this.mshow = false
      }, 3000)
      this.changeData()
    },
    async onSubmit (value) {
      const { data } = await addWsCookie({ cookie: value, type: this.activeName, nodeId: 1, remark: this.form.remark })
      this.mmessage = data.message
      if (data.code === 200) {
        this.messageFunc('success')
      } else {
        this.messageFunc('error')
      }
    },

    onUpload () {
      this.dialogVisible = true
    }
  }
}
</script>
<style>
.el-dialog__header {
  text-align: center;
}
</style>
