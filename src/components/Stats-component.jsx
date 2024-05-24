export function Stats({ items }) {
  if (!items.length) return (
    <footer className="stats">
      <p>
        <em>Start ading items.</em>
      </p>
    </footer>
  );
  const numOfItems = items.length;
  const packed = items.filter(item => item.packed).length;
  const percPacked = Math.round(packed / numOfItems * 100);

  return <footer className="stats">
    <em>You have {packed} items packed from {numOfItems} items({percPacked}%).</em>
  </footer>;
}
