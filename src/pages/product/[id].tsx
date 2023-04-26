import { stripe } from '@/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'

import { useShoppingCart } from 'use-shopping-cart';
import { toast } from "react-toastify";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  // async function handleBuyProduct() {
  //   try {
  //     setIsCreatingCheckoutSession(true)

  //     const response = await axios.post('/api/checkoutSession', {
  //       priceId: product.defaultPriceId
  //     })

  //     const { checkoutUrl } = response.data;

  //     window.location.href = checkoutUrl
  //   } catch (err) {
  //     // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
  //     setIsCreatingCheckoutSession(false)

  //     alert('Falha ao redirecionar ao checkout!')
  //   }
  // }

  const { addItem, cartDetails } = useShoppingCart();

  const itemsInCart = [] as any[];

  for (const id in cartDetails) {
    const item = cartDetails[id];
    itemsInCart.push(item)
  }

  function handlerAddProduct(product: any) {
    const existProduct = itemsInCart.filter((item) => item.id === product.id);
    
    if (existProduct.length > 0) {
      return toast.warning("Já existe esse produto no carrinho!")
    }
    
    addItem(product);
    
    toast.success("Produto adicionado na sacola!")
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' priority />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={() => handlerAddProduct(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}