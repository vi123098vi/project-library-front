<template>
  <div class="background-container" >
    <div class="content-wrapper">
        <div ref="animatedText" class="animated-text">
            <span ref="line1" class="line"></span>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default {
  setup() {
    const line1 = ref(null);
    let isFirstRun = true;

    onMounted(() => {
      if (isFirstRun) {
      const tl = gsap.timeline({repeat: 0});


      tl.to(line1.value, {
        text: "WELCOME  TO  Library-Pro",
        duration: 5,
        ease: "power1.inOut",
        stagger: 0.1
        }).then(() => {
          isFirstRun=false;
      });

    }
    });

    return { line1 };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');
.background-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background: linear-gradient(45deg,#ff95b7 35%,#ffa1d2 100%);
  overflow: hidden;
  position: relative;
  cursor: default;
}

.content-wrapper {
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animated-text {
  font-family: "Anton", sans-serif;
  font-size: 7vw;
  font-weight: 400;
  color: whitesmoke;
  text-transform: uppercase;
  text-align: center;
  transform:scaleY(1.3);
  text-shadow:
     2px 2px 0 rgba(0,0,0,0.1),
     4px 4px 0  rgba(255,255,255,0.2);
}
</style>
