import { toast } from 'react-toastify';
import { Button } from './ui/button';

export const Test = () => {
  return (
    <h1 className="text-2xl text-green-800">
      <Button onClick={() => toast('Hello toast')}> Toast</Button>
    </h1>
  );
};
