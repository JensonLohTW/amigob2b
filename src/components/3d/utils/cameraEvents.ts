// 相機事件系統 - 用於 Canvas 外部和內部的通信

interface CameraPreset {
  position: [number, number, number]
  target: [number, number, number]
  name: string
  icon: string
}

class CameraEventManager {
  private listeners: { [key: string]: Function[] } = {}

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
  }

  emit(event: string, data?: any) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach(callback => callback(data))
  }

  clear() {
    this.listeners = {}
  }
}

// 全局事件管理器實例
export const cameraEvents = new CameraEventManager()

// 相機預設配置
export const CAMERA_PRESETS: CameraPreset[] = [
  { position: [4, 2, 6], target: [0, 0, 0], name: '全景視角', icon: '🌐' },
  { position: [2, 1, 2], target: [0, 0.5, 0], name: '正面視角', icon: '👁️' },
  { position: [-2, 1, 2], target: [0, 0.5, 0], name: '側面視角', icon: '↔️' },
  { position: [0, 4, 0], target: [0, 0, 0], name: '俯視視角', icon: '⬇️' },
]

// 事件類型
export const CAMERA_EVENTS = {
  SWITCH_PRESET: 'switchPreset',
  PRESET_CHANGED: 'presetChanged',
  ANIMATION_START: 'animationStart',
  ANIMATION_END: 'animationEnd',
} as const

export type { CameraPreset }
