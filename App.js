
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

export default function App() {
  return (
    <NativeRouter style={{flex: 1}}>
      <Main/>
    </NativeRouter>
  );
}
