<template>
  <el-dialog v-model="visible" title="书籍详情">
    <el-image :src="book.cover" fit="cover" class="detail-cover"></el-image>
    <h3>{{ book.title }}</h3>
    <p>作者: {{ book.author }}</p>
    <p>ISBN: {{ book.isbn }}</p>
    <p>简介: {{ book.description }}</p>
    <el-button type="success" @click="borrowBook">借阅</el-button>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { fetchBookById } from "@/api/book";

const props = defineProps({ bookId: Number });
const visible = ref(false);
const book = ref({});

watch(() => props.bookId, async (id) => {
  if (id) {
    const res = await fetchBookById(id);
    book.value = res.data;
    visible.value = true;
  }
});

const borrowBook = () => {
  console.log("借阅书籍:", book.value.title);
};
</script>

<style scoped>
.detail-cover {
  width: 100%;
  max-height: 300px;
}
</style>
