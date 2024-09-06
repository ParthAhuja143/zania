export interface CardType {
    type: string;
    title: string;
    position: number;
    src: string;
  }
  
  export interface CardProps {
    item: CardType;
    index: number;
    moveCard: (fromIndex: number, toIndex: number) => void;
    onClick: (type: string) => void;
    style: React.CSSProperties;
  }
  