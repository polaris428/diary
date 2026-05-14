/**
 * useGalleryLayout.ts
 * 2D 커스텀 월 가로 스크롤 살롱 행 배치 알고리즘
 * 향후 커스텀 패턴 확장을 위해 패턴 정의를 분리했습니다.
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

// 향후 커스텀 패턴 구성을 위한 인터페이스
export interface FramePattern {
  h: number; // height (vh)
  t: number; // top (vh)
  x: number; // block 내 가로 오프셋 (vh)
}

export interface GalleryPattern {
  name: string;
  blockWidthVH: number;
  frames: FramePattern[];
}

// 기본 제공되는 '살롱 행' 패턴 (세로 공간을 충분히 활용하도록 밸런스 조정)
export const DEFAULT_PATTERN: GalleryPattern = {
  name: 'Default Salon',
  blockWidthVH: 110, // 블록 간 간격 확대
  frames: [
    { h: 45, t: 18, x: 0 },   // [0] 큰 액자 (좌측 중앙)
    { h: 28, t: 12, x: 42 },  // [1] 작은 액자 (우측 상단)
    { h: 28, t: 45, x: 42 },  // [2] 작은 액자 (우측 하단)
    { h: 36, t: 28, x: 74 },  // [3] 중간 액자 (조금 더 우측 중앙)
  ]
}

export const useGalleryLayout = () => {
  const FRAME_TYPES = ['Classic Gold', 'Modern Black', 'Natural Wood', 'Floating Glass'] as const

  const calculateLayout = (items: GalleryItem[], patternConfig: GalleryPattern = DEFAULT_PATTERN) => {
    // 시작 여백 (타이틀 제거 후, 적당한 여백으로 조정)
    const startPaddingVW = 15; 
    
    const placedItems = items.map((item, index) => {
      const blockIndex = Math.floor(index / patternConfig.frames.length);
      const patternIndex = index % patternConfig.frames.length;
      const pattern = patternConfig.frames[patternIndex];
      
      // 해당 액자의 절대 가로 위치 = 블록 시작점 + 패턴 내 오프셋
      const baseLeftVH = blockIndex * patternConfig.blockWidthVH + pattern.x;
      
      const type = item.type || FRAME_TYPES[Math.floor(Math.random() * FRAME_TYPES.length)];
      
      return {
        ...item,
        type,
        style: {
          left: `calc(${startPaddingVW}vw + ${baseLeftVH}vh)`,
          top: `${pattern.t}vh`,
          height: `${pattern.h}vh`,
          width: 'auto', 
          aspectRatio: '3/4',
          transform: `none`, 
          zIndex: 1,
        }
      } as PlacedItem
    })

    // 전체 너비 계산
    const totalBlocks = Math.ceil(items.length / patternConfig.frames.length);
    const wallWidth = `calc(${totalBlocks * patternConfig.blockWidthVH}vh + 30vw)`;

    return {
      items: placedItems,
      wallWidth
    }
  }

  return {
    calculateLayout
  }
}
