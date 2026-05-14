/**
 * useGalleryLayout.ts
 * 2D 커스텀 월(Custom Wall) 확장을 위한 살롱 행(Salon Hang) 상대 좌표 배치 알고리즘
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
  style: {
    top: string
    left: string
    width: string
    height: string
    transform: string
    zIndex: number
  }
}

export const useGalleryLayout = () => {
  const FRAME_TYPES = ['Classic Gold', 'Modern Black', 'Natural Wood', 'Floating Glass'] as const

  const calculateLayout = (items: GalleryItem[]): PlacedItem[] => {
    return items.map((item, index) => {
      // 1. 그리드 기반 영역 할당 (가로 3칸 기준)
      const columns = 3;
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      // 2. 기본 좌표 계산 (퍼센트 기반)
      const baseLeft = (col / columns) * 100 + 5; // 약간의 여백
      const baseTop = row * 40 + 5; // 한 행당 40vh 정도 차지한다고 가정
      
      // 3. 살롱 행 특유의 유기적인 느낌을 위한 오프셋 및 스케일
      const offsetLeft = (Math.random() - 0.5) * 10; // -5% ~ 5%
      const offsetTop = (Math.random() - 0.5) * 10; // -5% ~ 5%
      const rotation = (Math.random() - 0.5) * 4; // -2도 ~ 2도 회전
      const scale = 0.8 + Math.random() * 0.4; // 0.8 ~ 1.2 크기 변형
      
      // 4. 프레임 타입 지정
      const type = item.type || FRAME_TYPES[Math.floor(Math.random() * FRAME_TYPES.length)];
      
      return {
        ...item,
        type,
        style: {
          left: `${baseLeft + offsetLeft}%`,
          top: `${baseTop + offsetTop}vh`,
          width: '24%', // 기본 너비 비율
          height: 'auto',
          aspectRatio: '3/4', // 일반적인 액자 비율
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          zIndex: Math.floor(Math.random() * 10),
        }
      }
    })
  }

  return {
    calculateLayout
  }
}
