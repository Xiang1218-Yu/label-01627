<template>
  <div class="app-card network-info-card">
    <div class="app-card__title">
      <el-icon><Monitor /></el-icon>
      <span>网络访问信息</span>
    </div>
    <p class="app-card__subtitle">
      以下为手机端访问本地服务所需的网络配置信息
    </p>

    <!-- 连接步骤指引 -->
    <el-steps :active="3" finish-status="success" simple class="network-info-card__steps">
      <el-step title="同一WiFi" :icon="Connection" />
      <el-step title="生成二维码" :icon="Position" />
      <el-step title="手机扫码" :icon="Cellphone" />
    </el-steps>

    <!-- 网络信息列表 -->
    <div class="network-info-card__list">
      <div class="info-item">
        <div class="info-item__label">
          <el-icon><Connection /></el-icon>
          局域网 IP
        </div>
        <div class="info-item__value">
          <el-tag v-if="localIP" type="success" effect="dark" round>
            {{ localIP }}
          </el-tag>
          <el-tag v-else type="warning" effect="dark" round>
            未设置
          </el-tag>
        </div>
      </div>

      <!-- 手动输入 IP -->
      <div class="info-item manual-ip">
        <el-input
          v-model="manualIP"
          placeholder="请输入本机局域网 IP，如 192.168.1.100（通过 ipconfig / ifconfig 查看）"
          size="small"
          clearable
          @keyup.enter="applyManualIP"
        >
          <template #append>
            <el-button @click="applyManualIP" :disabled="!manualIP.trim()">
              应用
            </el-button>
          </template>
        </el-input>
      </div>

      <div class="info-item">
        <div class="info-item__label">
          <el-icon><Link /></el-icon>
          服务端口
        </div>
        <div class="info-item__value">
          <el-tag effect="dark" round>{{ port }}</el-tag>
        </div>
      </div>

      <div class="info-item">
        <div class="info-item__label">
          <el-icon><ChromeFilled /></el-icon>
          访问地址
        </div>
        <div class="info-item__value address-value">
          <code class="address-code">http://{{ localIP }}:{{ port }}</code>
        </div>
      </div>
    </div>

    <!-- 注意事项 -->
    <el-divider />
    <div class="network-info-card__tips">
      <h4>
        <el-icon><InfoFilled /></el-icon>
        解决手机无法访问本地服务的方法
      </h4>
      <ol>
        <li><strong>确保同一网络：</strong>手机和电脑需连接同一 WiFi / 局域网</li>
        <li><strong>关闭防火墙：</strong>Windows 防火墙可能阻止局域网访问，请临时关闭或添加端口放行规则</li>
        <li><strong>使用局域网 IP：</strong>手机不能访问 <code>localhost</code>，需在上方输入框中填写本机局域网 IP（通过 <code>ipconfig</code> / <code>ifconfig</code> 命令查看）</li>
        <li><strong>检查端口：</strong>确认服务运行在端口 {{ port }} 上且未被占用</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Connection, Position, Cellphone } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  localIP: {
    type: String,
    default: ''
  },
  port: {
    type: Number,
    default: 8081
  }
})

const emit = defineEmits(['update:localIP'])

const manualIP = ref('')

/**
 * 应用手动输入的 IP 地址
 */
function applyManualIP() {
  const ip = manualIP.value.trim()
  if (!ip) return

  // 简单校验 IPv4 格式
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!ipv4Regex.test(ip)) {
    ElMessage.warning('请输入有效的 IPv4 地址')
    return
  }

  emit('update:localIP', ip)
  showIpInput.value = false
  ElMessage.success(`已切换为手动 IP: ${ip}`)
}
</script>

<style lang="scss" scoped>
.network-info-card {
  &__steps {
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md) 0;
    background: #f8f9fa;
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: #fafafa;
    border-radius: var(--border-radius);
    border: 1px solid #f0f0f0;

    &__label {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-base);
      color: var(--text-regular);
      font-weight: 500;
      min-width: 100px;
    }

    &__value {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-xs);

      &.address-value {
        max-width: 100%;
        overflow: hidden;
      }
    }

    &.manual-ip {
      padding: var(--spacing-xs) var(--spacing-md);
    }
  }

  .address-code {
    font-family: 'Courier New', Courier, monospace;
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    background: #ecf5ff;
    padding: 2px 8px;
    border-radius: 4px;
    word-break: break-all;
  }

  &__tips {
    h4 {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-base);
      color: var(--text-primary);
      margin-bottom: var(--spacing-sm);
    }

    ol {
      padding-left: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);

      li {
        font-size: var(--font-size-sm);
        color: var(--text-regular);
        line-height: 1.8;

        code {
          font-family: 'Courier New', Courier, monospace;
          background: #f5f5f5;
          padding: 1px 6px;
          border-radius: 3px;
          font-size: var(--font-size-xs);
          color: #e6a23c;
        }
      }
    }
  }
}
</style>
