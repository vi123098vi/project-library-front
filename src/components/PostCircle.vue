<template>
  <div class="post-circle">
    <swiper
      :modules="[Autoplay, Navigation, Pagination]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="post-swiper"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" alt="轮播图片" class="slide-image" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

defineProps({
  images: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.post-circle {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.post-swiper {
  width: 100%;
  height: 400px;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
