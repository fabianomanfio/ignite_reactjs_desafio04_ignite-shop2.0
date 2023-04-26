import { useShoppingCart } from 'use-shopping-cart';
import { ContentCartContainer, ImageCartContainer, ProductCartContainer } from './styles';
import Image from 'next/image';

interface ProductProps {
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
}

export function ContentCart({product}: ProductProps) {
  const { removeItem } = useShoppingCart();

  return (
    <ContentCartContainer>
      <ImageCartContainer>
        <Image src={product.image} width={90} height={90} alt="" />
      </ImageCartContainer>
      <ProductCartContainer>
        <span>{product.name}</span>
        <strong>{product.price}</strong>
        <button onClick={() => removeItem(product.id)}>Remover</button>
      </ProductCartContainer>
    </ContentCartContainer>
  );
}