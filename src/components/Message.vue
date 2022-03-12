<template>
  <div
    v-if="show"
    style="top: 20px; z-index: 20000000000;"
    class="brush-message"
    :class="
      type === 'warning'
        ? 'b-m-warning '
        : type === 'success'
        ? 'b-m-success'
        : type === 'error'
        ? 'b-m-error'
        : 'b-m-info'
    "
  >
    <p
      :class="
        type === 'warning'
          ? 'b-m-warning-color '
          : type === 'success'
          ? 'b-m-success-color'
          : type === 'error'
          ? 'b-m-error-color'
          : 'b-m-info-color'
      "
    >
      {{ message }}
    </p>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log('message')
    // setTimeout(() => {
    //   this.$emit('onCancle', false)
    // }, 3000)
  },
  props: {
    message: {
      type: String,
      default: '',
      require: true
    },
    show: {
      type: Boolean,
      default: false,
      require: true
    },
    type: {
      type: String,
      default: 'info'
    }
  }
}
</script>
<style scoped>
.brush-message {
  min-width: 380px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: #edf2fc;
  -webkit-transition: opacity 0.3s, top 0.4s, -webkit-transform 0.4s;
  transition: opacity 0.3s, top 0.4s, -webkit-transform 0.4s;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  transition: opacity 0.3s, transform 0.4s, top 0.4s, -webkit-transform 0.4s;
  padding: 15px 15px 15px 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.b-m-success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.b-m-success-color {
  color: #67c23a;
}
.b-m-wraning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.b-m-wraning-color {
  color: #e6a23c;
}
.b-m-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.b-m-error-color {
  color: #f56c6c;
}
.b-m-info {
  background-color: #edf2fc;
  border-color: #ebeef5;
}
.b-m-info-color {
  color: #909399;
}
</style>
