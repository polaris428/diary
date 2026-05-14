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
      
      // 화면의 세로(vh)를 기준으로 모든 크기를 계산하여 절대 겹치지 않도록 방어
      // 높이가 고정(vh)되면, aspect-ratio(3/4)에 의해 가로 길이도 vh 비율로 고정됨.
      const frameHeightVH = 35; // 액자 높이 35vh (화면의 35%)
      
      // 위쪽 행(row 0)은 10vh에서 시작, 아래쪽 행(row 1)은 50vh에서 시작
      // -> Row 0은 10~45vh 차지, Row 1은 50~85vh 차지. (5vh 간격 보장)
      // 하단 네비게이션 바를 위한 여백 15vh (85~100vh) 보장.
      const baseTop = row === 0 ? 10 : 50; 
      
      // 액자 가로폭은 35vh * (3/4) = 26.25vh. 컬럼 간격은 32vh로 주어 가로로도 절대 겹치지 않음.
      const baseLeftVH = col * 32; 
      const startPaddingVW = 10; // 첫 시작 여백 10vw
      
      const type = item.type || FRAME_TYPES[Math.floor(Math.random() * FRAME_TYPES.length)];
      
      return {
        ...item,
        type,
        style: {
          left: `calc(${startPaddingVW}vw + ${baseLeftVH}vh)`,
          top: `${baseTop}vh`,
          height: `${frameHeightVH}vh`,
          width: 'auto', // 높이에 맞춰 자동 비율 조정
          aspectRatio: '3/4',
          transform: `none`, // transform 제거하여 기준점 충돌 방지
          zIndex: 1,
        }
      } as PlacedItem
    })

    const totalColumns = Math.ceil(items.length / itemsPerColumn);
    // 전체 너비 = 컬럼 수 * 32vh + 좌우 여백(20vw)
    const wallWidth = `calc(${totalColumns * 32}vh + 20vw)`;

    return {
      items: placedItems,
      wallWidth
    }
  }

  return {
    calculateLayout
  }
}
