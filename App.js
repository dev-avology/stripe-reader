import HomeScreen from './src/screens/HomeScreen';
import axios from "axios";
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';

export default function App() {
  //get connection token for stripe reader
  const fetchTokenProvider = async () => {
    try {
      const response = await axios.get(
        `https://phplaravel-1180784-4531756.cloudwaysapps.com/api/stripe-reader-connection-token`,
        {}
      );

      if( response?.data?.secret ){
        console.log(`Connection token is: ${response.data.secret.secret}`);
        return response.data.secret.secret;
      }else{
        alert('Unable to receive connection token from the server.');
      }
    } catch (error) {
      alert('Unable to receive connection token from the server.');
    }
  };

  return (
    <StripeTerminalProvider
        logLevel="verbose"
        tokenProvider={fetchTokenProvider}
      >
        <HomeScreen />
      </StripeTerminalProvider>
  );
}