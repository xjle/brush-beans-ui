<template>
  <div>
    <select class="brush-select" @change="onChange" >
      <option disabled selected v-if="!nodeList.length">请先选择节点</option>
      <option v-for="item in nodeList" :value="item.id" :key="item.id">{{item.name}}</option>
    </select>
     <el-button type="primary" @click="onUpload" :loading="btnLoading" >上传数据</el-button>

    <!-- <button  @click="onUpload" :disabled="btnFlag" :class="{'brush-not-allowed':btnFlag,'btn':true, 'btn-primary':true}">上传数据</button> -->
    <Message v-if="mshow" :show="mshow" :type="mtype" :message="mmessage" />
  </div>
</template>
<script>
import { addCookie, getNodeList } from '../../api/auto'
import Message from '../../components/Message.vue'
export default {
  components: {
    Message
  },
  data () {
    return {
      mshow: false,
      mtype: null,
      mmessage: '',
      // 按钮禁用
      btnFlag: true,
      btnLoading: false,
      // 节点ID
      nodeId: 1,
      // 节点列表 { id: 1, name: '深圳' }, { id: 2, name: '广州' }, { id: 3, name: '上海' }
      nodeList: []
    }
  },
  mounted () {
    this.getNodeListFunc()
  },
  watch: {
    '$store.state.login': {
      deep: true,
      handler: function (value) {
        if (value) {
          this.getNodeListFunc()
        } else {
          this.nodeList = []
          this.btnFlag = true
        }
      }
    }
  },
  methods: {
    onChange (value) {
      this.nodeId = value
    },
    async getNodeListFunc () {
      const { data } = await getNodeList()
      if (data.code === 200) {
        this.btnFlag = false
        this.nodeList = data.data
      }
      // else {
      //   this.mtype = 'error'
      //   this.mshow = true
      //   this.mmessage = '请先登录插件账号'
      //   setTimeout(() => {
      //     this.mshow = false
      //   }, 3000)
      // }
    },
    onUpload () {
      const nameNode = document.getElementsByClassName('my_header_name') || []

      this.btnLoading = true
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage(
        {
          id: 'getCookies'
        },
        (res) => {
          const parmas = JSON.parse(res)
          if (parmas.pt_key && parmas.pt_pin) {
            const str =
                'pt_key=' +
                parmas.pt_key +
                ';' +
                'pt_pin=' +
                parmas.pt_pin +
                ';'
            console.log(str, 'yjlllllllll')
            addCookie({ cookie: str, nodeId: this.nodeId, remark: nameNode[0].innerHTML ? nameNode[0].innerHTML : parmas.pt_pin }).then((response) => {
              const { data } = response
              console.log(data, 'ces')
              if (data.code === 200) {
                this.btnLoading = false
                this.mtype = 'success'
                this.mshow = true
                this.mmessage = data.message
                setTimeout(() => {
                  this.mshow = false
                }, 3000)
              } else {
                this.btnLoading = false
                this.mtype = 'error'
                this.mshow = true
                this.mmessage = data.message
                setTimeout(() => {
                  this.mshow = false
                }, 3000)
              }
              // if (data.code === 200) {
              //   if (data.data.error && data.data.error === 1) {
              //     this.btnLoading = false
              //     this.mtype = 'error'
              //     this.mshow = true
              //     this.mmessage = data.data.msg
              //     setTimeout(() => {
              //       this.mshow = false
              //     }, 3000)
              //   } else {
              //     this.btnLoading = false
              //     this.mtype = 'success'
              //     this.mshow = true
              //     this.mmessage = data.message
              //     setTimeout(() => {
              //       this.mshow = false
              //     }, 3000)
              //   }
              // } else {
              //   this.btnLoading = false
              //   this.mtype = 'error'
              //   this.mshow = true
              //   this.mmessage = '请先登录插件账号'
              //   setTimeout(() => {
              //     this.mshow = false
              //   }, 3000)
              // }
            })
          } else {
            this.mtype = 'error'
            this.mshow = true
            this.mmessage = '请先登录京东'
            setTimeout(() => {
              this.mshow = false
            }, 3000)
          }
        }
      )
      // if (token) {
      //   const scriptTxt = document.getElementsByTagName('body')[0].getElementsByTagName('div')[0].getElementsByTagName('script')[5].innerText.replace(/\s+/g, '')
      //   const obj = {}
      //   const arr = scriptTxt.split(';')
      //   arr.forEach(item => {
      //     if (item) {
      //       if (item.indexOf('PtPin') > -1) {
      //         obj.pin = item.match(/'(.*?)'/)[1]
      //       }
      //       if (item.indexOf('PtKey') > -1) {
      //         obj.key = item.match(/'(.*?)'/)[1]
      //       }
      //     }
      //   })
      //   if (obj.key && obj.pin) {
      //     const str = 'pt_key=' + obj.key + ';' + 'pt_pin=' + obj.pin + ';'
      //     const { data } = await addCookie({ cookie: str })
      //     if (data.code === 200) {
      //       this.mtype = 'success'
      //       this.mshow = true
      //       this.mmessage = data.message
      //       setTimeout(() => {
      //         this.mshow = false
      //       }, 3000)
      //     }
      //   } else {
      //     this.mtype = 'error'
      //     this.mshow = true
      //     this.mmessage = '请先登录京东'
      //     setTimeout(() => {
      //       this.mshow = false
      //     }, 3000)
      //   }
      // } else {
      //   this.mtype = 'error'
      //   this.mshow = true
      //   this.mmessage = '请先登录插件账号'
      //   setTimeout(() => {
      //     this.mshow = false
      //   }, 3000)
      // }
    }
  }
}
</script>
