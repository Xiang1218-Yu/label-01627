<template>
  <div class="app-card text-input-card">
    <div class="app-card__title">
      <el-icon><Edit /></el-icon>
      <span>输入文字内容</span>
    </div>
    <p class="app-card__subtitle">
      请在下方输入要生成二维码的文字内容，手机扫码后即可在网页中查看
    </p>

    <el-input
      v-model="localText"
      type="textarea"
      :rows="6"
      :maxlength="1000"
      show-word-limit
      placeholder="请输入要展示的文字内容，例如：公告通知、产品介绍、活动信息等..."
      resize="vertical"
      class="text-input-card__textarea"
      @input="handleInput"
    />

    <div class="text-input-card__actions">
      <el-button
        type="primary"
        size="large"
        :loading="loading"
        :disabled="!localText.trim()"
        @click="handleGenerate"
      >
        <el-icon v-if="!loading"><Position /></el-icon>
        {{ loading ? '生成中...' : '生成二维码' }}
      </el-button>

      <el-button
        size="large"
        @click="handleClear"
        :disabled="!localText"
      >
        <el-icon><Delete /></el-icon>
        清空内容
      </el-button>
    </div>

    <!-- 快捷示例 -->
    <div class="text-input-card__examples">
      <span class="examples-label">快捷示例：</span>
      <el-tag
        v-for="example in examples"
        :key="example.label"
        class="example-tag"
        effect="plain"
        round
        @click="applyExample(example.text)"
      >
        {{ example.label }}
      </el-tag>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'generate'])

const localText = ref(props.modelValue)

// 快捷示例数据
const examples = [
  { label: '公告通知', text: '【重要通知】\n\n尊敬的各位同事：\n\n公司将于2026年2月10日（周二）下午14:00在三楼会议室召开年度总结大会，请各部门负责人准时参加。\n\n请提前准备好部门年度工作总结和新年度计划。\n\n—— 行政部' },
  { label: '产品介绍', text: '【智能家居控制中心 Pro】\n\n一款革命性的智能家居产品：\n\n✅ 支持语音控制全屋设备\n✅ AI 智能场景推荐\n✅ 兼容 1000+ 品牌设备\n✅ 远程手机 APP 操控\n\n售价：¥599\n官网：www.example.com' },
  { label: '活动邀请', text: '🎉 邀请函\n\n诚邀您参加「2026春季技术分享会」\n\n📅 时间：2026年3月15日 09:00-17:00\n📍 地点：科技园区 A 座报告厅\n🎯 主题：前端工程化与AI辅助开发\n\n议程亮点：\n• Vue 3 深度实践分享\n• AI Copilot 提效秘籍\n• 微前端架构落地经验\n\n期待您的到来！' }
]

// 监听父组件传值变化
watch(() => props.modelValue, (val) => {
  localText.value = val
})

function handleInput(val) {
  emit('update:modelValue', val)
}

function handleGenerate() {
  if (localText.value.trim()) {
    emit('generate')
  }
}

function handleClear() {
  localText.value = ''
  emit('update:modelValue', '')
}

function applyExample(text) {
  localText.value = text
  emit('update:modelValue', text)
}
</script>

<style lang="scss" scoped>
.text-input-card {
  &__textarea {
    margin-bottom: var(--spacing-md);
    flex: 1;
    display: flex;
    flex-direction: column;

    :deep(.el-textarea) {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    :deep(.el-textarea__inner) {
      flex: 1;
      font-size: var(--font-size-base);
      line-height: 1.8;
      padding: var(--spacing-md);
      border-radius: var(--border-radius);
      transition: border-color 0.3s, box-shadow 0.3s;

      &:focus {
        box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.15);
      }
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);

    .el-button {
      border-radius: var(--border-radius);
      font-weight: 500;
    }
  }

  &__examples {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    padding-top: var(--spacing-md);
    border-top: 1px dashed var(--border-color);

    .examples-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .example-tag {
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: var(--color-primary);
        border-color: var(--color-primary);
        transform: translateY(-1px);
      }
    }
  }
}
</style>
