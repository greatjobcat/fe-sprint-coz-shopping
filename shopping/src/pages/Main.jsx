import Item from "../Item";

export default function Main({
  products,
  isBookmarked,
  onBookmarkToggle,
  bookmarkedProducts,
}) {

  const firstFourProducts = products.slice(0, 4);
  const firstFourBookmarkedProducts = bookmarkedProducts.slice(0, 4);

  return (
    <div className="main">
      <div className="container">
        <div className="main-title">상품 리스트</div>
        <div className="main-container">
          {firstFourProducts.map((product) => (
            <Item
              key={product.id}
              item={product}
              type={product.type}
              isBookmarked={isBookmarked}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="main-title">북마크 리스트</div>
        <div className="main-container">
          {firstFourBookmarkedProducts.map((product) => (
            <Item
              key={product.id}
              item={product}
              type={product.type}
              isBookmarked={isBookmarked}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
