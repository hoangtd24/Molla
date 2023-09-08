import { WishlistItemProps } from "../components/wishlistItem/Wishlist";

export const includeWislist = (
  wishlists: WishlistItemProps[],
  productId: string
): boolean => {
  if (!wishlists) {
    return false;
  }
  const existingWishlist = wishlists.find(
    (wishlist) => wishlist.product.id === productId
  );
  if (!existingWishlist) {
    return false;
  }
  return true;
};
