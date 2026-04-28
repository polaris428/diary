/**
 * useGalleryLayout.ts
 * 갤러리 액자들을 '살롱 행(Salon Hang)' 스타일로 배치하는 알고리즘
 */
import type { DiaryMood } from '~/types'

export interface GalleryItem {
  id: string | number
  title?: string
  thumbnail?: string
  mood?: DiaryMood | null
  type?: 'Classic Gold' | 'Modern Black' | 'Natural Wood' | 'Floating Glass'
  canvasColor?: string
}

export interface PlacedItem extends GalleryItem {
  position: [number, number, number]
}

export const useGalleryLayout = () => {
  const FRAME_TYPES = ['Classic Gold', 'Modern Black', 'Natural Wood', 'Floating Glass'] as const

  const calculateLayout = (items: GalleryItem[]): PlacedItem[] => {
    return items.map((item, index) => {
      // 1. 그리드 기반 영역 할당 (가로 4칸 기준)
      const col = index % 4
      const row = Math.floor(index / 4)
      
      // 2. 기본 좌표 계산 (간격 조정)
      const baseX = (col - 1.5) * 3  // x축 간격
      const baseY = - (row - 0.5) * 4 + 5 // y축 간격 (바닥 위로 올림)
      
      // 3. 살롱 행 특유의 유기적인 느낌을 위한 오프셋
      const offsetX = (Math.random() - 0.5) * 1.5
      const offsetY = (Math.random() - 0.5) * 1.5
      
      // 4. 타입이 지정되지 않은 경우 랜덤 타입 부여 (mood에서 이미 지정된 경우 우선)
      const type = item.type || FRAME_TYPES[Math.floor(Math.random() * FRAME_TYPES.length)]
      
      return {
        ...item,
        type,
        position: [baseX + offsetX, baseY + offsetY, -4.8], // 벽면(-5) 바로 앞
      }
    })
  }

  return {
    calculateLayout
  }
}
