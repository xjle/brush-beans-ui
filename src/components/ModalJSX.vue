<script>
export default {
  functional: true, // 监听父组件传来的值
  props: {
    render: {
      type: Function,
      default: Function
    }
  },
  render: (h, data) => {
    return data.props.render(h, data)
  }
}
</script>
