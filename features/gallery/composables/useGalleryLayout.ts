/**
 * useGalleryLayout.ts
 * 2D 커스텀 월(Custom Wall) 가로 스크롤(Horizontal Scroll) 살롱 행 배치 알고리즘
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

  const calculateLayout = (items: GalleryItem[]) => {
    // 2열(위/아래) 구조로 가로로 길게 배치
    const itemsPerColumn = 2;

    const placedItems = items.map((item, index) => {
      const col = Math.floor(index / itemsPerColumn);
      const row = index % itemsPerColumn;
      
      // 반듯한 격자(Grid) 스타일로 배치 (오프셋 제거)
      const baseLeft = col * 30 + 8; // 컬럼당 30vw 간격 (기존 25vw에서 확대하여 여유 확보)
      const baseTop = row === 0 ? 12 : 58; // 위쪽 행 12vh, 아래쪽 행 58vh (간격 넓힘)
      
      const type = item.type || FRAME_TYPES[Math.floor(Math.random() * FRAME_TYPES.length)];
      
      return {
        ...item,
        type,
        style: {
          left: `calc(${baseLeft}vw)`,
          top: `calc(${baseTop}vh)`,
          width: 'max(110px, 14vw)', // 크기를 살짝 더 줄임
          height: 'auto',
          maxHeight: '38vh', // 세로로 너무 길어지지 않게 제한
          aspectRatio: '3/4',
          transform: `scale(1) rotate(0deg)`,
          zIndex: 1,
        }
      } as PlacedItem
    })

    const totalColumns = Math.ceil(items.length / itemsPerColumn);
    // 컬럼 수에 비례하여 벽의 전체 너비 계산 (마지막 여백 포함)
    const wallWidth = `calc(${totalColumns * 30 + 40}vw)`;

    return {
      items: placedItems,
      wallWidth
    }
  }

  return {
    calculateLayout
  }
}
