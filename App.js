import HomeScreen from './src/screens/HomeScreen';
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';

export default function App() {
  return (
    <StripeTerminalProvider
        logLevel="verbose"
        tokenProvider={()=>{"pst_test_YWNjdF8xTzBIWnRHbjZYQTlqYW9zLG5Kcm9SNDFxVUQ2SmdTbFpqc0VlajR0MVNMdUZ3U2o_00JY6Wa4sO"}}
      >
        <HomeScreen />
      </StripeTerminalProvider>
  );
}