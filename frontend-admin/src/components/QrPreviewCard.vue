<template>
  <div class="app-card qr-preview-card">
    <div class="app-card__title">
      <el-icon><Cellphone /></el-icon>
      <span>二维码预览</span>
    </div>

    <!-- 空状态 -->
    <div v-if="!qrDataUrl" class="qr-preview-card__empty">
      <el-icon class="empty-icon"><PictureFilled /></el-icon>
      <p>输入文字并点击"生成二维码"</p>
      <p class="sub-text">手机扫描二维码即可在网页中查看文字</p>
    </div>

    <!-- 二维码展示 -->
    <div v-else class="qr-preview-card__content">
      <div class="qr-image-wrapper">
        <img :src="qrDataUrl" alt="二维码" class="qr-image" />
        <div class="scan-hint">
          <el-icon><Iphone /></el-icon>
          <span>请用手机扫描</span>
        </div>
      </div>

      <div class="qr-preview-card__info">
        <el-alert
          type="success"
          :closable="false"
          show-icon
        >
          <template #title>
            二维码已生成，请确保手机与电脑在同一局域网下
          </template>
        </el-alert>
      </div>

      <div class="qr-preview-card__actions">
        <el-button type="primary" plain @click="handleDownload">
          <el-icon><Download /></el-icon>
          下载二维码
        </el-button>
        <el-button plain @click="handleCopy">
          <el-icon><CopyDocument /></el-icon>
          复制链接
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const props = defineProps({
  qrDataUrl: {
    type: String,
    default: ''
  },
  displayUrl: {
    type: String,
    default: ''
  }
})

/**
 * 下载二维码图片
 */
function handleDownload() {
  if (!props.qrDataUrl) return

  const link = document.createElement('a')
  link.download = `qrcode_${Date.now()}.png`
  link.href = props.qrDataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  ElMessage.success('二维码图片已开始下载')
}

/**
 * 复制访问链接到剪贴板
 */
async function handleCopy() {
  if (!props.displayUrl) return

  try {
    await navigator.clipboard.writeText(props.displayUrl)
    ElMessage.success('链接已复制到剪贴板')
  } catch {
    // 降级方案：使用 textarea 复制
    const textarea = document.createElement('textarea')
    textarea.value = props.displayUrl
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    ElMessage.success('链接已复制到剪贴板')
  }
}
</script>

<style lang="scss" scoped>
.qr-preview-card {
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 48px var(--spacing-lg);
    color: var(--text-placeholder);

    .empty-icon {
      font-size: 64px;
      margin-bottom: var(--spacing-md);
      opacity: 0.4;
    }

    p {
      font-size: var(--font-size-base);
      margin-bottom: var(--spacing-xs);
    }

    .sub-text {
      font-size: var(--font-size-sm);
      opacity: 0.7;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: var(--spacing-lg);
  }

  .qr-image-wrapper {
    position: relative;
    background: #fff;
    padding: var(--spacing-lg);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    border: 2px solid #f0f0f0;

    .qr-image {
      display: block;
      width: 220px;
      height: 220px;
      image-rendering: pixelated;
    }

    .scan-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      margin-top: var(--spacing-sm);
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }
  }

  &__info {
    width: 100%;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);

    .el-button {
      border-radius: var(--border-radius);
    }
  }
}
</style>
