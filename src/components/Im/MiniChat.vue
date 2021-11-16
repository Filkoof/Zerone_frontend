<template lang='pug'>
.chat
  .chat__header
    img.chat__img
    p.chat__name
    button.chat__btn-close
  .chat__main
  .chat__footer
</template>

<script>

export default {
  name: 'MiniChat',
  props: ['chatID'],
  data:(()=>{

}),

}

</script>

<style scoped lang='stylus'>

</style>
