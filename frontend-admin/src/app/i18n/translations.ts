export interface Translations {
  common: {
    copy: string;
    copied: string;
    success: string;
    warning: string;
    error: string;
    loading: string;
    confirm: string;
    cancel: string;
  };
  header: {
    title: string;
    description: string;
  };
  home: {
    inputPlaceholder: string;
    generateButton: string;
    generating: string;
    sampleText1: string;
    sampleText2: string;
    sampleText3: string;
    quickSamples: string;
    clear: string;
  };
  qrPreview: {
    title: string;
    noQrCode: string;
    download: string;
    copyLink: string;
    linkCopied: string;
  };
  networkInfo: {
    title: string;
    ipPlaceholder: string;
    portPlaceholder: string;
    apply: string;
    applied: string;
    tip: string;
    howToCheck: string;
    step1: string;
    step2: string;
    step3: string;
    ipLabel: string;
    portLabel: string;
    addressLabel: string;
    notSet: string;
  };
  display: {
    title: string;
    scanTime: string;
    copyText: string;
    noContent: string;
    backToHome: string;
    scannedContent: string;
    scanFromPc: string;
  };
  settings: {
    language: string;
    themeColor: string;
    customColor: string;
    presetColors: string;
  };
  footer: {
    copyright: string;
  };
  messages: {
    enterTextFirst: string;
    enterIpFirst: string;
    textTooLong: string;
    qrGenerated: string;
    qrGenerateFailed: string;
  };
}

export const translations: Record<string, Translations> = {
  zh: {
    common: {
      copy: '复制',
      copied: '已复制',
      success: '成功',
      warning: '警告',
      error: '错误',
      loading: '加载中',
      confirm: '确定',
      cancel: '取消'
    },
    header: {
      title: '二维码生成器',
      description: '输入文字 → 生成二维码 → 手机扫码查看内容'
    },
    home: {
      inputPlaceholder: '请输入要生成二维码的文字内容...',
      generateButton: '生成二维码',
      generating: '生成中...',
      sampleText1: '你好，世界！\n这是一个二维码测试。',
      sampleText2: '欢迎使用二维码生成器\n纯前端实现，无需后端服务',
      sampleText3: 'https://github.com\n访问我的 GitHub 主页',
      quickSamples: '快捷示例',
      clear: '清空'
    },
    qrPreview: {
      title: '二维码预览',
      noQrCode: '暂无二维码，请先输入文字并点击生成',
      download: '下载图片',
      copyLink: '复制链接',
      linkCopied: '链接已复制到剪贴板'
    },
    networkInfo: {
      title: '网络访问信息',
      ipPlaceholder: '请输入本机局域网 IP 地址',
      portPlaceholder: '端口号',
      apply: '应用',
      applied: 'IP 地址已更新',
      tip: '电脑和手机需连接同一 WiFi 网络',
      howToCheck: '如何查看 IP？Windows: ipconfig / Mac: ifconfig',
      step1: '同一WiFi',
      step2: '生成二维码',
      step3: '手机扫码',
      ipLabel: '局域网 IP',
      portLabel: '服务端口',
      addressLabel: '访问地址',
      notSet: '未设置'
    },
    display: {
      title: '扫码内容展示',
      scanTime: '扫描时间',
      copyText: '复制文字',
      noContent: '暂无展示内容',
      backToHome: '返回首页',
      scannedContent: '扫码内容',
      scanFromPc: '请从电脑端生成二维码后，使用手机扫码访问'
    },
    settings: {
      language: '语言',
      themeColor: '主题颜色',
      customColor: '自定义颜色',
      presetColors: '预设颜色'
    },
    footer: {
      copyright: 'QR Code Generator © 2026 — 纯前端实现，无需后端服务'
    },
    messages: {
      enterTextFirst: '请先输入文字内容',
      enterIpFirst: '请先在下方网络信息卡片中输入本机局域网 IP',
      textTooLong: '文字内容过长（编码后 {length} 字符），二维码可能难以扫描，建议精简文字',
      qrGenerated: '二维码生成成功！请用手机扫描',
      qrGenerateFailed: '二维码生成失败，请检查输入内容或尝试减少文字量'
    }
  },
  en: {
    common: {
      copy: 'Copy',
      copied: 'Copied',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      loading: 'Loading',
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    header: {
      title: 'QR Code Generator',
      description: 'Enter text → Generate QR code → Scan with phone to view content'
    },
    home: {
      inputPlaceholder: 'Enter text to generate QR code...',
      generateButton: 'Generate QR Code',
      generating: 'Generating...',
      sampleText1: 'Hello, World!\nThis is a QR code test.',
      sampleText2: 'Welcome to QR Code Generator\nPure frontend implementation, no backend required',
      sampleText3: 'https://github.com\nVisit my GitHub homepage',
      quickSamples: 'Quick Samples',
      clear: 'Clear'
    },
    qrPreview: {
      title: 'QR Code Preview',
      noQrCode: 'No QR code yet, please enter text and click generate',
      download: 'Download Image',
      copyLink: 'Copy Link',
      linkCopied: 'Link copied to clipboard'
    },
    networkInfo: {
      title: 'Network Access Information',
      ipPlaceholder: 'Enter your local network IP address',
      portPlaceholder: 'Port',
      apply: 'Apply',
      applied: 'IP address updated',
      tip: 'Computer and phone must be connected to the same WiFi network',
      howToCheck: 'How to check IP? Windows: ipconfig / Mac: ifconfig',
      step1: 'Same WiFi',
      step2: 'Generate QR Code',
      step3: 'Scan with Phone',
      ipLabel: 'Local IP',
      portLabel: 'Service Port',
      addressLabel: 'Access Address',
      notSet: 'Not Set'
    },
    display: {
      title: 'Scanned Content Display',
      scanTime: 'Scan Time',
      copyText: 'Copy Text',
      noContent: 'No content',
      backToHome: 'Back to Home',
      scannedContent: 'Scanned Content',
      scanFromPc: 'Please generate QR code from PC and scan with phone'
    },
    settings: {
      language: 'Language',
      themeColor: 'Theme Color',
      customColor: 'Custom Color',
      presetColors: 'Preset Colors'
    },
    footer: {
      copyright: 'QR Code Generator © 2026 — Pure frontend, no backend service required'
    },
    messages: {
      enterTextFirst: 'Please enter text content first',
      enterIpFirst: 'Please enter your local network IP in the network information card below',
      textTooLong: 'Text too long ({length} characters after encoding), QR code may be difficult to scan, please simplify the text',
      qrGenerated: 'QR code generated successfully! Please scan with your phone',
      qrGenerateFailed: 'QR code generation failed, please check your input or try reducing the text length'
    }
  },
  ja: {
    common: {
      copy: 'コピー',
      copied: 'コピーしました',
      success: '成功',
      warning: '警告',
      error: 'エラー',
      loading: '読み込み中',
      confirm: '確認',
      cancel: 'キャンセル'
    },
    header: {
      title: 'QRコードジェネレーター',
      description: 'テキストを入力 → QRコードを生成 → スマホでスキャンして内容を表示'
    },
    home: {
      inputPlaceholder: 'QRコードを生成するテキストを入力してください...',
      generateButton: 'QRコードを生成',
      generating: '生成中...',
      sampleText1: 'こんにちは、世界！\nこれはQRコードのテストです。',
      sampleText2: 'QRコードジェネレーターへようこそ\n純フロントエンド実装、バックエンド不要',
      sampleText3: 'https://github.com\nGitHubホームページを訪問',
      quickSamples: 'クイックサンプル',
      clear: 'クリア'
    },
    qrPreview: {
      title: 'QRコードプレビュー',
      noQrCode: 'QRコードがありません。テキストを入力して生成をクリックしてください',
      download: '画像をダウンロード',
      copyLink: 'リンクをコピー',
      linkCopied: 'リンクをクリップボードにコピーしました'
    },
    networkInfo: {
      title: 'ネットワークアクセス情報',
      ipPlaceholder: 'ローカルネットワークのIPアドレスを入力してください',
      portPlaceholder: 'ポート番号',
      apply: '適用',
      applied: 'IPアドレスを更新しました',
      tip: 'パソコンとスマホは同じWiFiネットワークに接続する必要があります',
      howToCheck: 'IPの確認方法？Windows: ipconfig / Mac: ifconfig',
      step1: '同じWiFi',
      step2: 'QRコード生成',
      step3: 'スマホでスキャン',
      ipLabel: 'ローカルIP',
      portLabel: 'サービスポート',
      addressLabel: 'アクセスアドレス',
      notSet: '未設定'
    },
    display: {
      title: 'スキャン内容表示',
      scanTime: 'スキャン時間',
      copyText: 'テキストをコピー',
      noContent: 'コンテンツがありません',
      backToHome: 'ホームに戻る',
      scannedContent: 'スキャンした内容',
      scanFromPc: 'パソコンからQRコードを生成し、スマホでスキャンしてください'
    },
    settings: {
      language: '言語',
      themeColor: 'テーマカラー',
      customColor: 'カスタムカラー',
      presetColors: 'プリセットカラー'
    },
    footer: {
      copyright: 'QR Code Generator © 2026 — 純フロントエンド、バックエンドサービス不要'
    },
    messages: {
      enterTextFirst: '最初にテキストコンテンツを入力してください',
      enterIpFirst: '下のネットワーク情報カードにローカルネットワークIPを入力してください',
      textTooLong: 'テキストが長すぎます（エンコード後 {length} 文字）。QRコードがスキャンしにくい場合がありますので、テキストを簡略化してください',
      qrGenerated: 'QRコードの生成に成功しました！スマホでスキャンしてください',
      qrGenerateFailed: 'QRコードの生成に失敗しました。入力内容を確認するか、テキストの長さを減らしてみてください'
    }
  },
  ko: {
    common: {
      copy: '복사',
      copied: '복사됨',
      success: '성공',
      warning: '경고',
      error: '오류',
      loading: '로딩 중',
      confirm: '확인',
      cancel: '취소'
    },
    header: {
      title: 'QR 코드 생성기',
      description: '텍스트 입력 → QR 코드 생성 → 휴대폰으로 스캔하여 내용 확인'
    },
    home: {
      inputPlaceholder: 'QR 코드를 생성할 텍스트를 입력하세요...',
      generateButton: 'QR 코드 생성',
      generating: '생성 중...',
      sampleText1: '안녕하세요, 세계!\n이것은 QR 코드 테스트입니다.',
      sampleText2: 'QR 코드 생성기에 오신 것을 환영합니다\n순수 프론트엔드 구현, 백엔드 불필요',
      sampleText3: 'https://github.com\nGitHub 홈페이지 방문',
      quickSamples: '빠른 샘플',
      clear: '지우기'
    },
    qrPreview: {
      title: 'QR 코드 미리보기',
      noQrCode: '아직 QR 코드가 없습니다. 텍스트를 입력하고 생성을 클릭하세요',
      download: '이미지 다운로드',
      copyLink: '링크 복사',
      linkCopied: '링크가 클립보드에 복사되었습니다'
    },
    networkInfo: {
      title: '네트워크 액세스 정보',
      ipPlaceholder: '로컬 네트워크 IP 주소를 입력하세요',
      portPlaceholder: '포트 번호',
      apply: '적용',
      applied: 'IP 주소가 업데이트되었습니다',
      tip: '컴퓨터와 휴대폰은 동일한 WiFi 네트워크에 연결되어야 합니다',
      howToCheck: 'IP 확인 방법? Windows: ipconfig / Mac: ifconfig',
      step1: '같은 WiFi',
      step2: 'QR 코드 생성',
      step3: '휴대폰으로 스캔',
      ipLabel: '로컬 IP',
      portLabel: '서비스 포트',
      addressLabel: '액세스 주소',
      notSet: '설정되지 않음'
    },
    display: {
      title: '스캔한 내용 표시',
      scanTime: '스캔 시간',
      copyText: '텍스트 복사',
      noContent: '내용 없음',
      backToHome: '홈으로 돌아가기',
      scannedContent: '스캔한 내용',
      scanFromPc: 'PC에서 QR 코드를 생성하고 휴대폰으로 스캔하세요'
    },
    settings: {
      language: '언어',
      themeColor: '테마 색상',
      customColor: '사용자 정의 색상',
      presetColors: '미리 설정된 색상'
    },
    footer: {
      copyright: 'QR Code Generator © 2026 — 순수 프론트엔드, 백엔드 서비스 불필요'
    },
    messages: {
      enterTextFirst: '먼저 텍스트 내용을 입력하세요',
      enterIpFirst: '아래 네트워크 정보 카드에 로컬 네트워크 IP를 입력하세요',
      textTooLong: '텍스트가 너무 깁니다(인코딩 후 {length} 자). QR 코드 스캔이 어려울 수 있으니 텍스트를 간소화하세요',
      qrGenerated: 'QR 코드가 성공적으로 생성되었습니다! 휴대폰으로 스캔하세요',
      qrGenerateFailed: 'QR 코드 생성에 실패했습니다. 입력 내용을 확인하거나 텍스트 길이를 줄여보세요'
    }
  }
};
