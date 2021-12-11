<template>
  <exhibition-title />
  <scroller />
</template>

<script lang="js">
import exhibitionTitle from "@/components/title.vue"
import scroller from "@/components/scroller.vue"

export default {
    components: {
      exhibitionTitle,
      scroller,
    }
  }
</script>
<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

body {
    line-height: 1.4;
    font-family: Open Sans,sans-serif;
}
</style>
