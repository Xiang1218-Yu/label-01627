<template>
  <div class="display-view">
    <!-- 顶部装饰条 -->
    <div class="display-view__header">
      <div class="header-inner">
        <el-icon class="header-icon"><ChatDotRound /></el-icon>
        <span>内容展示</span>
      </div>
    </div>

    <!-- 内容卡片 -->
    <main class="display-view__main">
      <!-- 有内容时展示 -->
      <div v-if="displayText" class="content-card">
        <div class="content-card__badge">
          <el-icon><Document /></el-icon>
          <span>扫码内容</span>
        </div>

        <div class="content-card__body">
          <p
            v-for="(line, index) in textLines"
            :key="index"
            class="content-line"
            :class="{ 'empty-line': !line.trim() }"
          >
            {{ line || '\u00A0' }}
          </p>
        </div>

        <div class="content-card__footer">
          <div class="timestamp">
            <el-icon><Clock /></el-icon>
            <span>{{ currentTime }}</span>
          </div>
          <el-button
            type="primary"
            size="small"
            plain
            round
            @click="copyText"
          >
            <el-icon><CopyDocument /></el-icon>
            复制文字
          </el-button>
        </div>
      </div>

      <!-- 无内容时 -->
      <div v-else class="empty-state">
        <el-icon class="empty-state__icon"><WarningFilled /></el-icon>
        <h3>暂无展示内容</h3>
        <p>请从电脑端生成二维码后，使用手机扫码访问</p>
      </div>
    </main>

    <!-- 底部信息 -->
    <footer class="display-view__footer">
      <p>由二维码生成器提供 · 纯前端实现</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()

// ========== 响应式数据 ==========
const displayText = ref('')
const currentTime = ref('')
let timerHandle = null

// ========== 计算属性 ==========
// 将文本按换行符拆分为数组，便于逐行渲染
const textLines = computed(() => {
  return displayText.value.split('\n')
})

// ========== 生命周期 ==========
onMounted(() => {
  // 从 URL query 参数中解析文本
  // 注意：Vue Router 已自动对 route.query.text 做了 decodeURIComponent，
  // 此处不能再次 decode，否则含 % 的文本会抛错
  const text = route.query.text
  if (text) {
    displayText.value = text
  } else {
    // 兜底：Hash 模式下 window.location.search 为空，
    // 需从 window.location.hash 中手动解析 query 参数
    const hash = window.location.hash || ''
    const queryIndex = hash.indexOf('?')
    if (queryIndex !== -1) {
      const queryString = hash.substring(queryIndex)
      const params = new URLSearchParams(queryString)
      const fallbackText = params.get('text')
      if (fallbackText) {
        displayText.value = fallbackText
      }
    }
  }

  // 更新时间（保留引用以便卸载时清理）
  updateTime()
  timerHandle = setInterval(updateTime, 1000)
})

// 清理定时器，防止内存泄漏
onUnmounted(() => {
  if (timerHandle) {
    clearInterval(timerHandle)
    timerHandle = null
  }
})

// ========== 方法 ==========
function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

async function copyText() {
  try {
    await navigator.clipboard.writeText(displayText.value)
    ElMessage.success('文字已复制')
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = displayText.value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    ElMessage.success('文字已复制')
  }
}
</script>

<style lang="scss" scoped>
.display-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #eef2ff 0%, #f0f2f5 40%, #f5f5f5 100%);

  &__header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: var(--spacing-lg) var(--spacing-md);
    text-align: center;

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      color: #fff;
      font-size: var(--font-size-lg);
      font-weight: 600;
    }

    .header-icon {
      font-size: 24px;
    }
  }

  &__main {
    flex: 1;
    padding: var(--spacing-lg) var(--spacing-md);
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
  }

  &__footer {
    text-align: center;
    padding: var(--spacing-md);
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
  }
}

// 内容卡片
.content-card {
  background: #fff;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  animation: slideUp 0.4s ease-out;

  &__badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: var(--spacing-sm) var(--spacing-lg);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: var(--font-size-sm);
    font-weight: 500;
  }

  &__body {
    padding: var(--spacing-lg);
    min-height: 120px;
    line-height: 2;

    .content-line {
      font-size: var(--font-size-md);
      color: var(--text-primary);
      word-break: break-word;

      &.empty-line {
        height: 0.8em;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-lg);
    border-top: 1px solid #f0f0f0;
    background: #fafafa;

    .timestamp {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: var(--font-size-xs);
      color: var(--text-secondary);
    }
  }
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px var(--spacing-lg);
  text-align: center;

  &__icon {
    font-size: 64px;
    color: #dcdfe6;
    margin-bottom: var(--spacing-md);
  }

  h3 {
    font-size: var(--font-size-lg);
    color: var(--text-regular);
    margin-bottom: var(--spacing-xs);
  }

  p {
    font-size: var(--font-size-base);
    color: var(--text-secondary);
  }
}

// 入场动画
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
