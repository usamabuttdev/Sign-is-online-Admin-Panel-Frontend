import { _mock } from 'src/_mock';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/store/slices/userSlice';

export function useMockedUser() {
  // Use the useSelector hook to select the user from the Redux store
  const user = useSelector(selectUser);

  // Return the user fetched from the Redux store
  return { user };
}
