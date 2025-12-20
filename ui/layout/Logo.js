import Image from 'next/image';

const Logo = ({ logo }) => {
  return (
    <Image
      src={logo || '/assets/images/react.png'}
      alt="Kick Off"
      width={120}
      height={50}
      objectFit="contain"
      quality={100}
    />
  );
};

export default Logo;
