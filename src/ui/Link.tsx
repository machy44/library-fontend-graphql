import { Link as RouterLink } from 'react-router-dom';
import { Text } from './Text';

interface NavLinkProps {
  text: string;
  to: string;
}

export const Link: React.FC<NavLinkProps> = ({ text, to, ...props }) => {
  return (
    <RouterLink to={to} {...props} className="hover:text-sky-500 dark:hover:text-sky-400">
      <Text>{text}</Text>
    </RouterLink>
  );
};
