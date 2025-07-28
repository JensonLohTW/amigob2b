// 臨時型別宣告：如需更嚴謹型別，請安裝 @types/three 或自行補完

declare module '@react-three/fiber' {
  export const Canvas: any
  export const useFrame: any
  export const useThree: any
  const others: any
  export default others
}

declare module '@react-three/drei' {
  export const OrbitControls: any
  export const Stage: any
  export const PerformanceMonitor: any
  export const Environment: any
  export const ContactShadows: any
  export const Float: any
  export const Text: any
  export function useGLTF(path: string): any
  export namespace useGLTF {
    function preload(path: string): void
  }
  export const Html: any
  export const useProgress: any
  const others: any
  export default others
}

declare module '@react-three/postprocessing' {
  export const EffectComposer: any
  export const Bloom: any
  export const SSAO: any
  export const ToneMapping: any
  const others: any
  export default others
}

declare module 'postprocessing' {
  export enum ToneMappingMode {
    LINEAR = 'LINEAR',
    REINHARD = 'REINHARD',
    REINHARD2 = 'REINHARD2',
    REINHARD2_ADAPTIVE = 'REINHARD2_ADAPTIVE',
    UNCHARTED2 = 'UNCHARTED2',
    ACES_FILMIC = 'ACES_FILMIC'
  }

  export enum BlendFunction {
    SKIP = 'SKIP',
    ADD = 'ADD',
    ALPHA = 'ALPHA',
    AVERAGE = 'AVERAGE',
    COLOR_BURN = 'COLOR_BURN',
    COLOR_DODGE = 'COLOR_DODGE',
    DARKEN = 'DARKEN',
    DIFFERENCE = 'DIFFERENCE',
    EXCLUSION = 'EXCLUSION',
    LIGHTEN = 'LIGHTEN',
    MULTIPLY = 'MULTIPLY',
    DIVIDE = 'DIVIDE',
    NEGATION = 'NEGATION',
    NORMAL = 'NORMAL',
    OVERLAY = 'OVERLAY',
    REFLECT = 'REFLECT',
    SCREEN = 'SCREEN',
    SOFT_LIGHT = 'SOFT_LIGHT',
    SUBTRACT = 'SUBTRACT'
  }
}