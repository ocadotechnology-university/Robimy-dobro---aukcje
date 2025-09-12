import {styled, keyframes} from '@mui/system';

const fadeDot = keyframes`
  0% {opacity: 0;}
  30% {opacity: 1;}
  60% {opacity: 0;}
  100% {opacity: 0;}
`;

const Dot = styled('span')({
    width: 3,
    height: 3,
    margin: '0 1px',
    borderRadius: '50%',
    backgroundColor: 'green',
    opacity: 0,
    transform: 'translateY(3px)',
    animation: `${fadeDot} 1.5s infinite`,

    '&:nth-of-type(1)': {animationDelay: '0s'},
    '&:nth-of-type(2)': {animationDelay: '0.3s'},
    '&:nth-of-type(3)': {animationDelay: '0.6s'},
});

export default Dot;