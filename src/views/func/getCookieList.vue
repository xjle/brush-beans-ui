<template>
  <div style="display: inline-block;margin-right: 15px;">
    <el-button class="brush-cursor txt-color" type="text" @click="onShowList" :loading="btnLoading">查看已上传数据</el-button>
    <Modal
      v-if="mShow"
      :show="mShow"
      :title="mTitle"
      :render="mRender"
      :footer="mFooter"
      @onCancle="onModalCancle"
    />

  </div>
</template>
<script>
import Modal from '../../components/Modal.vue'
import { getCookieList } from '../../api/auto'
export default {
  components: {
    Modal
  },
  data () {
    return {
      btnLoading: false,
      // 模态框
      mShow: false,
      mTitle: '授权登录',
      mRender: null,
      mFooter: false,
      tableData: []
    }
  },
  methods: {
    onModalCancle () {
      this.mShow = false
    },
    onShowList () {
      this.mShow = true
      this.mTitle = '详情'
      this.mRender = h => {
        return h('el-table', {
          props: {
            data: this.tableData,
            height: '250'
          }
        }, [
          h('el-table-column', {
            props: {
              prop: 'type',
              label: '类型'
            }
          }),
          h('el-table-column', {
            props: {
              prop: 'cookie',
              label: 'cookie'
            }
          }),
          h('el-table-column', {
            props: {
              prop: 'nodeName',
              label: '节点名称'
            }
          }),
          h('el-table-column',
            {
              props: {
                prop: 'isStop',
                label: '状态'
              }
            },
            [
              h('span', {

              }, `${this.tableData.isStop ? '异常' : '正常'}`)
            ]
          )
        ])
      }
      getCookieList().then(res => {
        const { data } = res
        console.log(data)
        if (data.code === 200) {
          this.tableData = data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
