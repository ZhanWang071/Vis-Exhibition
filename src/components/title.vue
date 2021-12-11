<template>
    <div class="exhibitionTitle">
        <div class="exhibition-title">
            <div class="exhibition-title-sub">
                <h1><span class="background">Exhibition of Data Visualization</span></h1>
            </div>
            <div class="exhibition-title-sub">
                <h3><span class="background">Created by <a href="http://fduvis.net">FDU-VIS</a></span></h3>
            </div>
            <div class="start-scroll">
                <h2><span class="background">Scroll</span></h2>
            </div>
            <div class="scroll-icon">
                <span class="background">
                <i class="fas fa-mouse" aria-hidden="true" style="font-size: 30px"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'exhibitionTitle',
}
</script>

<style lang="scss">
a {
  color: black;
  transition: opacity 0.25s ease-in-out;
}

a:hover {
  opacity: 0.75;
}

.exhibition-title {
  margin-block-start: 7em;
  margin-block-end: 7em;
  text-align: -webkit-center;
  padding: 5px 0;
}

.exhibition-title-sub {
  font-size: smalller;
}

.start-scroll {
  margin-block-start: inherit;
}

.exhibition-title-sub, .start-scroll, .scroll-icon {
  background-color: white;
  width: max-content;
}

h1 {
  font-size: 40px;
}

</style>