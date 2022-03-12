<template>
  <div>
    <div id="brush-modal" v-if="show" @click.self="onCancle">
      <div class="brush-dialog">
        <div class="brush-title">
          <p>{{ title }}</p>
          <button class="close-btn" @click.self="onCancle">X</button>
        </div>
        <div class="brush-boody">
          <template v-if="content">
            {{ content }}
          </template>
          <template v-else>
            <!-- <slot>{{render}}</slot> -->
            <ModalJSX :render="render" />
          </template>

        </div>
        <div class="brush-footer " v-if="footer">
          <button class="btn" @click.self="onCancle">取消</button>
          <button class="btn btn-primary" @click.self="onOk">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalJSX from './ModalJSX.vue'
export default {
  components: {
    ModalJSX
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    },
    title: {
      type: String,
      default: '标题',
      require: true
    },
    content: {
      type: String
    },
    footer: {
      type: Boolean,
      default: true
    },
    render: {
      type: Function,
      default: Function
    }
  },
  methods: {
    onCancle () {
      this.$emit('onCancle', false)
    },
    onOk () {
      this.$emit('onOk', true)
    }
  }
}
</script>
<style lang="less" scoped>
#brush-modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 130099 !important;
  -webkit-overflow-scrolling: touch;
  background-color: rgba(0, 0, 0, 0.5);
  outline: 0;
  overflow: scroll;
  .brush-dialog {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, 0);
    width: 100%;
    background: #fff;
    .brush-title {
      padding: 10px;
      text-align: center;
      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
      }
      p {
        font-size: 24px;
      }
    }
    .brush-footer {
      text-align: center;
      margin: 15px 0;
    }
  }
}
</style>
