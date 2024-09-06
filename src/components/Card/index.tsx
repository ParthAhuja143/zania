import { useDrag, useDrop } from "react-dnd";
import ImageLoader from "../ImageLoader";
import { CardProps } from "../../interfaces";

const ItemType = "CARD";

export const Card: React.FC<CardProps> = ({
  item,
  index,
  moveCard,
  onClick,
  style,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="card"
      style={{ opacity: isDragging ? 0.5 : 1, ...style }}
      onClick={() => onClick(item.type)}>
      <ImageLoader
        className="card-img"
        src={item.src}
        alt={item.title}
        circle={false}
      />
      <h3>{item.title}</h3>
    </div>
  );
};
