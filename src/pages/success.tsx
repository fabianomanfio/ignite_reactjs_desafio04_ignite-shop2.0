import { stripe } from '@/lib/stripe';
import { ImageContainer, SuccessContainer, LinkButton, SectionContainer } from '@/styles/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
  productImages: string[];
}

export default function Success({ customerName, product, productImages }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada| Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <SectionContainer>
          {productImages.map((image, index) =>{
            return (
            <ImageContainer key={index}>
              <Image src={image} width={140} height={140} alt='' />
            </ImageContainer>
            )
          })}
        </SectionContainer>

        <p>
          Uhuu <strong>{customerName}</strong>, sua compra de {" "}<strong>{productImages.length}</strong> camisetas já está a caminho da sua casa.
        </p>

        <LinkButton href="/">
          Voltar ao catálogo
        </LinkButton>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name;
  // const product = session.line_items?.data[0].price?.product as Stripe.Product;
  const productImages = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product;
    return product.images[0];
  })

  return {
    props: {
      customerName,
      productImages,
    }
  }
}