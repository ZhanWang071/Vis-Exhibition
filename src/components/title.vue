<template>
    <div class="exhibitionTitle">
            <div class="exhibition-title-sub">
                <h1><span class="background">数之美<br>可视化线上科普周</span></h1>
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

.exhibitionTitle {
  width: 100%;
  height: 100%;
  margin-top: 5%;
  margin-bottom: 10%;
  text-align: -webkit-center;
}

.exhibition-title-sub {
  margin-top: 5%;
  margin-bottom: 10%;
}

h1 {
  font-size: 10vh;
}

h2 {
  font-size: 5vh;
}

h3 {
  font-size: 3vh;
}

.scroll-icon {
  margin-bottom: 10%;  
}


</style>