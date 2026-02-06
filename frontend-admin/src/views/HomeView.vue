<template>
  <div class="home-view">
    <!-- 页面头部 -->
    <header class="page-header">
      <h1 class="page-header__title">二维码生成器</h1>
      <p class="page-header__desc">输入文字 → 生成二维码 → 手机扫码查看内容</p>
    </header>

    <!-- 主内容区 -->
    <main class="home-view__content container">
      <el-row :gutter="24">
        <!-- 左侧：文字输入 -->
        <el-col :xs="24" :sm="24" :md="14" :lg="14">
          <TextInputCard
            v-model="inputText"
            :loading="generating"
            @generate="generateQrCode"
          />
        </el-col>

        <!-- 右侧：二维码预览 -->
        <el-col :xs="24" :sm="24" :md="10" :lg="10">
          <QrPreviewCard
            :qr-data-url="qrDataUrl"
            :display-url="displayUrl"
          />
        </el-col>
      </el-row>

      <!-- 底部：网络信息 -->
      <div class="home-view__network">
        <NetworkInfoCard
          :local-i-p="localIP"
          :port="serverPort"
          @update:local-i-p="handleIPUpdate"
        />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="home-view__footer">
      <p>QR Code Generator &copy; 2026 — 纯前端实现，无需后端服务</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'
import { ElMessage } from 'element-plus'
import TextInputCard from '@/components/TextInputCard.vue'
import QrPreviewCard from '@/components/QrPreviewCard.vue'
import NetworkInfoCard from '@/components/NetworkInfoCard.vue'
import { buildDisplayUrl, getEncodedUrlLength, QR_MAX_RECOMMENDED_LENGTH } from '@/utils/network.js'

// ========== 响应式数据 ==========
const inputText = ref('')
const qrDataUrl = ref('')
const displayUrl = ref('')
const generating = ref(false)
const localIP = ref('')
const serverPort = ref(8081)

// ========== 生命周期 ==========
onMounted(() => {
  // 从当前页面 URL 获取实际端口号
  const currentPort = window.location.port
  if (currentPort) {
    serverPort.value = parseInt(currentPort, 10)
  }
})

// ========== 方法 ==========

/**
 * 生成二维码
 * 将输入文字编码为 URL，生成对应二维码
 */
async function generateQrCode() {
  const text = inputText.value.trim()
  if (!text) {
    ElMessage.warning('请先输入文字内容')
    return
  }

  // 检查 IP 是否有效（不能是占位文本）
  const ip = localIP.value
  if (!ip) {
    ElMessage.warning('请先在下方网络信息卡片中输入本机局域网 IP')
    return
  }
  const urlLength = getEncodedUrlLength(ip, serverPort.value, text)
  if (urlLength > QR_MAX_RECOMMENDED_LENGTH) {
    ElMessage.warning(`文字内容过长（编码后 ${urlLength} 字符），二维码可能难以扫描，建议精简文字`)
    console.warn(`[QR] URL 长度 ${urlLength} 超过推荐上限 ${QR_MAX_RECOMMENDED_LENGTH}`)
  }

  generating.value = true

  try {
    // 构建手机端展示页面的 URL
    const url = buildDisplayUrl(ip, serverPort.value, text)
    displayUrl.value = url
    console.info('[QR] 生成二维码 URL:', url)

    // 生成二维码图片 (DataURL 格式)
    const dataUrl = await QRCode.toDataURL(url, {
      width: 440,
      margin: 2,
      color: {
        dark: '#303133',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    })

    qrDataUrl.value = dataUrl
    ElMessage.success('二维码生成成功！请用手机扫描')
  } catch (err) {
    console.error('[QR] 二维码生成失败:', err)
    ElMessage.error('二维码生成失败，请检查输入内容或尝试减少文字量')
  } finally {
    generating.value = false
  }
}

/**
 * 更新 IP 地址（手动输入时触发）
 */
function handleIPUpdate(ip) {
  localIP.value = ip
  // 如果已有二维码，重新生成
  if (qrDataUrl.value && inputText.value.trim()) {
    generateQrCode()
  }
}
</script>

<style lang="scss" scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-page);

  &__content {
    flex: 1;
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);

    .el-row {
      align-items: stretch;
    }

    .el-col {
      margin-bottom: var(--spacing-lg);
      display: flex;

      > .app-card {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }

  &__network {
    margin-top: var(--spacing-xs);
  }

  &__footer {
    text-align: center;
    padding: var(--spacing-lg);
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    border-top: 1px solid var(--border-color);
    background: var(--bg-card);
  }
}
</style>
