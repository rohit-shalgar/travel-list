
export function Item({ item, onDeleteItem, onToggleItem }) {
  const { description, quantity, packed } = item;
  console.log(packed);
  return (
    <li>
      <input type="checkbox" checked={packed} onChange={() => onToggleItem(item.id)} />
      <span style={packed ? { textDecoration: '' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
