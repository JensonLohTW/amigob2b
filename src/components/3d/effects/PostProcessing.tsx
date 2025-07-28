'use client'

import { EffectComposer, Bloom, SSAO, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'

interface PostProcessingProps {
  quality: 'high' | 'medium' | 'low'
  enabled?: boolean
}

export function EnhancedPostProcessing({ quality, enabled = true }: PostProcessingProps) {
  if (!enabled) return null

  const getEffectSettings = () => {
    switch (quality) {
      case 'high':
        return {
          bloomIntensity: 0.4,
          bloomRadius: 0.8,
          bloomThreshold: 0.9,
          ssaoSamples: 32,
          ssaoRadius: 0.1,
          ssaoIntensity: 1.0,
          enableSSAO: true,
        }
      case 'medium':
        return {
          bloomIntensity: 0.3,
          bloomRadius: 0.6,
          bloomThreshold: 0.95,
          ssaoSamples: 16,
          ssaoRadius: 0.08,
          ssaoIntensity: 0.8,
          enableSSAO: true,
        }
      case 'low':
        return {
          bloomIntensity: 0.2,
          bloomRadius: 0.4,
          bloomThreshold: 1.0,
          ssaoSamples: 8,
          ssaoRadius: 0.05,
          ssaoIntensity: 0.5,
          enableSSAO: false,
        }
    }
  }

  const settings = getEffectSettings()

  return (
    <EffectComposer>
      {/* Bloom 效果 - 發光效果 */}
      <Bloom
        intensity={settings.bloomIntensity}
        radius={settings.bloomRadius}
        luminanceThreshold={settings.bloomThreshold}
        luminanceSmoothing={0.025}
        blendFunction={BlendFunction.ADD}
      />
      
      {/* SSAO 效果 - 環境光遮蔽 */}
      {settings.enableSSAO && (
        <SSAO
          samples={settings.ssaoSamples}
          radius={settings.ssaoRadius}
          intensity={settings.ssaoIntensity}
          bias={0.005}
          blendFunction={BlendFunction.MULTIPLY}
        />
      )}
      
      {/* 色調映射 */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  )
}

// 簡化版後處理（用於低性能設備）
export function BasicPostProcessing() {
  return (
    <EffectComposer>
      <ToneMapping mode={ToneMappingMode.LINEAR} />
    </EffectComposer>
  )
}
