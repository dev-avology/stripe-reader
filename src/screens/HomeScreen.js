import { useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';

const HomeScreen = () => {
  const { initialize } = useStripeTerminal();
  useEffect(() => {
    initialize({
      logLevel: 'verbose',
    });
  }, [initialize]);

  const { discoverReaders, connectBluetoothReader, discoveredReaders } =
    useStripeTerminal({
      didUpdateDiscoveredReaders: (readers) => {
        // After the SDK discovers a reader, your app can connect to it.
        // Here, we're automatically connecting to the first discovered reader.
        console.log(readers);
        console.log('connecting to the first found reader.');
        handleConnectBluetoothReader(readers[0].id);
      },
    });

  const handleDiscoverReaders = async () => {
    // The list of discovered readers is reported in the `didUpdateDiscoveredReaders` method
    // within the `useStripeTerminal` hook.
    const { error } = await discoverReaders({
      discoveryMethod: 'bluetoothScan',
      simulated: true,
    });

    if (error) {
      alert(
        `Discover readers error: ${error.message}`
      );
    }
  };

  const handleConnectBluetoothReader = async (id) => {
    console.log(id);
    const { reader, error } = await connectBluetoothReader({
      readerId: discoveredReaders[0].id,
      // Since the simulated reader is not associated with a real location, we recommend
      // specifying its existing mock location.
      locationId: discoveredReaders[0].locationId,
    });

    
    if (error) {
      console.log('connectBluetoothReader error', error);
      alert('Unbale to connect to reader.');
      return;
    }else{
      alert('Reader connected successfully.');
    }

  };

  const connectReader = () => {
    console.log('scanning for readers');
    handleDiscoverReaders();
  }

  return (
    <View style={styles.container}>
      <Button title="Connect Reader" onPress={connectReader}>
        <Text>Connect Reader</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;