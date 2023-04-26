import * as Dialog from '@radix-ui/react-dialog';
import { ButtonContainer, CountItensCart, ModalClose, ModalContent, ModalDescription, ModalOverlay, ModalTitle, TotalContainer } from './styles';
import { Handbag, X } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';
import axios from 'axios';
import { ContentCart } from './ContentCart';

export function Cart() {
  const itemsInCart = [] as any[];

  const { cartDetails, clearCart } = useShoppingCart();

  for (const id in cartDetails) {
    const item = cartDetails[id];
    itemsInCart.push(item);
  }

  const price = itemsInCart.map((itens) => {
    return itens.price;
  });

  let total = 0;
  let formatPrice;
  for (const prices of price) {
    formatPrice = prices.toString().replace("R$", "").replace(",", ".");
    total = total + Number(formatPrice);
  }

  const formatTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(total);

  async function handleBuyProduct() {
    try {
      const response = await axios.post("/api/checkoutSession", {
        products: itemsInCart,
      });

      const { checkoutUrl } = response.data;

      clearCart();

      window.location.href = checkoutUrl;
    } catch (err) {
      // conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      alert("Falha ao redirecionar para o checkout!");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonContainer>
          <Handbag size={24} weight="bold" color="#8D8D99" />
          {itemsInCart.length > 0 && (
            <CountItensCart>{itemsInCart.length}</CountItensCart>
          )}
        </ButtonContainer>
      </Dialog.Trigger>
      <Dialog.Portal>
        <ModalOverlay />
        <ModalContent>
          <ModalTitle>Sacola de Compras</ModalTitle>
          <ModalClose asChild>
            <X size={24} color="#8D8D99" weight="bold" />
          </ModalClose>
          <ModalDescription>
            {itemsInCart.map((itens) => {
              return (
                <ContentCart
                  key={itens.id}
                  product={{
                    id: itens.id,
                    image: itens.imageUrl,
                    name: itens.name,
                    price: itens.price,
                  }}
                />
              );
            })}

            <TotalContainer>
              <div>
                <p>Quantidade</p>
                <span>{itemsInCart.length} itens</span>
              </div>

              <div>
                <strong>Valor total</strong>
                <h2>{formatTotal}</h2>
              </div>

              <button onClick={handleBuyProduct}>Finalizar compra</button>
            </TotalContainer>
          </ModalDescription>
        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>    
  )
}