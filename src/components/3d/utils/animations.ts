import * as THREE from 'three'

// 全局重用的對象，避免在動畫循環中創建新對象
export const tempVector3 = new THREE.Vector3()
export const tempQuaternion = new THREE.Quaternion()
export const tempEuler = new THREE.Euler()
export const tempMatrix4 = new THREE.Matrix4()

// 動畫緩動函數
export const easing = {
  linear: (t: number) => t,
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: (t: number) => t * (2 - t),
  easeIn: (t: number) => t * t,
  bounce: (t: number) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
    }
  }
}

// 平滑插值動畫類
export class SmoothAnimation {
  private startValue: number
  private endValue: number
  private duration: number
  private startTime: number
  private easingFunction: (t: number) => number

  constructor(
    startValue: number,
    endValue: number,
    duration: number,
    easingFn: (t: number) => number = easing.easeInOut
  ) {
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.startTime = performance.now()
    this.easingFunction = easingFn
  }

  update(): { value: number; isComplete: boolean } {
    const elapsed = performance.now() - this.startTime
    const progress = Math.min(elapsed / this.duration, 1)
    const easedProgress = this.easingFunction(progress)
    
    const value = this.startValue + (this.endValue - this.startValue) * easedProgress
    const isComplete = progress >= 1

    return { value, isComplete }
  }

  reset(newEndValue?: number) {
    this.startValue = this.endValue
    this.endValue = newEndValue ?? this.endValue
    this.startTime = performance.now()
  }
}

// Vector3 動畫類
export class Vector3Animation {
  private startVector: THREE.Vector3
  private endVector: THREE.Vector3
  private duration: number
  private startTime: number
  private easingFunction: (t: number) => number

  constructor(
    startVector: THREE.Vector3,
    endVector: THREE.Vector3,
    duration: number,
    easingFn: (t: number) => number = easing.easeInOut
  ) {
    this.startVector = startVector.clone()
    this.endVector = endVector.clone()
    this.duration = duration
    this.startTime = performance.now()
    this.easingFunction = easingFn
  }

  update(target: THREE.Vector3): boolean {
    const elapsed = performance.now() - this.startTime
    const progress = Math.min(elapsed / this.duration, 1)
    const easedProgress = this.easingFunction(progress)
    
    target.lerpVectors(this.startVector, this.endVector, easedProgress)
    
    return progress >= 1
  }
}

// 彈簧動畫系統
export class SpringAnimation {
  private value: number
  private target: number
  private velocity: number
  private stiffness: number
  private damping: number

  constructor(initialValue: number, stiffness = 0.1, damping = 0.8) {
    this.value = initialValue
    this.target = initialValue
    this.velocity = 0
    this.stiffness = stiffness
    this.damping = damping
  }

  setTarget(target: number) {
    this.target = target
  }

  update(deltaTime: number): number {
    const force = (this.target - this.value) * this.stiffness
    this.velocity += force * deltaTime
    this.velocity *= this.damping
    this.value += this.velocity * deltaTime
    
    return this.value
  }

  getValue(): number {
    return this.value
  }

  isAtRest(threshold = 0.001): boolean {
    return Math.abs(this.velocity) < threshold && Math.abs(this.target - this.value) < threshold
  }
}

// 浮動動畫輔助函數
export function createFloatingAnimation(
  amplitude: number = 0.1,
  frequency: number = 0.5,
  offset: number = 0
) {
  return (time: number) => Math.sin(time * frequency + offset) * amplitude
}

// 旋轉動畫輔助函數
export function createRotationAnimation(
  axis: 'x' | 'y' | 'z',
  speed: number = 1,
  amplitude: number = Math.PI * 2
) {
  return (time: number, target: THREE.Euler) => {
    target[axis] = Math.sin(time * speed) * amplitude
  }
}

// 脈衝動畫輔助函數
export function createPulseAnimation(
  minScale: number = 0.8,
  maxScale: number = 1.2,
  frequency: number = 1
) {
  return (time: number) => {
    const pulse = (Math.sin(time * frequency) + 1) / 2
    return minScale + (maxScale - minScale) * pulse
  }
}
