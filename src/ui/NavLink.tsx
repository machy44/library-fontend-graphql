import { Link as Clink, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  text: string;
  to: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ text, to, ...props }) => {
  return (
    <Clink as={Link} to={to} {...props}>
      <Text>{text}</Text>
    </Clink>
  );
};
