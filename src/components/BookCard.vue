<template>
  <div
      class="book-card"
      :class="{'borrowed': book.status === '借出'}"
  >

    <div class="card-header">
      <span class="book-id">#{{ book.id }}</span>
      <span
          class="status-badge"
          :class="book.status === '在库' ? 'available' : 'borrowed'"
      >
        {{ book.status }}
      </span>
    </div>

    <div class="card-body">
      <h3 class="book-title">{{ book.title }}</h3>
      <p class="book-author">📝 {{ book.author }}</p>
    </div>

    <div class="card-footer">

      <button
          class="sakura-btn detail-btn"
          @click="$emit('view-details', book)"
      >
        <i class="el-icon-notebook-2"></i>
        详情
      </button>

      <button
          class="sakura-btn borrow-btn"
          :disabled="book.borrow_quantity >= book.stock_quantity || book.status ==='pending'"
          @click="$emit('borrow-book', book)"
      >
        <i class="el-icon-reading"></i>
        {{ book.status === 'pending' ? '借阅中' : (book.borrow_quantity < book.stock_quantity ? '立即借阅' : '已借出') }}
      </button>

    </div>
  </div>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: '加载中...',
      author: '未知作者',
      status: '在库',
      stock_quantity:1,
      borrow_quantity:0,
    })
  }
});
</script>

<style scoped lang="scss">
.book-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(208, 74, 108, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  &.borrowed {
    opacity: 0.7;
    background: #fff0f5;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .book-id {
    color: #ff99cc;
    font-size: 0.9rem;
  }

  .status-badge {
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;

    &.available {
      background: #e8f5e9;
      color: #4caf50;
    }

    &.borrowed {
      background: #ffebee;
      color: #ef5350;
    }
  }
}

.card-body {
  margin-bottom: 1.5rem;

  .book-title {
    color: #d04a6c;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  .book-author {
    color: #ff758f;
    font-size: 0.95rem;
  }
}

.card-footer {
  display: flex;
  gap: 10px;

  .sakura-btn {
    flex: 1;
    padding: 8px 15px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    i {
      font-size: 1.1rem;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .detail-btn {
    background: #fff0f6;
    color: #ff758f;

    &:hover {
      background: #ffe6ee;
    }
  }

  .borrow-btn {
    background: linear-gradient(45deg, #ff99cc, #ff758f);
    color: white;

    &:hover:not(:disabled) {
      box-shadow: 0 3px 10px rgba(255, 117, 143, 0.3);
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .book-id {
    font-weight: bold;
    color: #555;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: bold;
    &.available {
      background-color: #d1f7c4;
      color: #2b7a0b;
    }
    &.borrowed {
      background-color: #f9c2d1;
      color: #a94442;
    }
  }
}

.card-body {
  margin-bottom: 1.5rem;
  .book-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .book-author {
    color: #777;
    font-size: 0.95rem;
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  .sakura-btn {
    background: #ff85a2;
    border: none;
    color: white;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: background 0.3s;

    &:hover {
      background: #ff6689;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .book-id {
    font-weight: bold;
    color: #555;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: bold;
    &.available {
      background-color: #d1f7c4;
      color: #2b7a0b;
    }
    &.borrowed {
      background-color: #f9c2d1;
      color: #a94442;
    }
  }
}

.card-body {
  margin-bottom: 1.5rem;
  .book-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .book-author {
    color: #777;
    font-size: 0.95rem;
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  .sakura-btn {
    background: #ff85a2;
    border: none;
    color: white;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: background 0.3s;

    &:hover {
      background: #ff6689;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}

</style>