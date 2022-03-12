<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户昵称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('提交')
    }
  }
}
</script>
