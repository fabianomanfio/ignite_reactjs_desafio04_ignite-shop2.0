import { styled } from '..';
import Link from 'next/link';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4
  }
});

export const SectionContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "4rem",
});


export const ImageContainer = styled('div', {
  // width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
  borderRadius: '50%',
  padding: '0.25rem',
  margin: "0 -26px",
  marginTop: '4rem',

  position: "relative",
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const LinkButton = styled(Link, {
  display: 'block',
  marginTop: '5rem',
  fontSize: '$lg',
  color: '$green500',
  textDecoration: 'none',
  fontWeight: 'bold',

  '&:hover': {
    color: '$green300',
  }
})