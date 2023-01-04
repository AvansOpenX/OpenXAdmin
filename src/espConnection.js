import { useEspStore } from '@/store/espStore';
import { useDataStore } from '@/store/dataStore';

const serviceUUID = '06cd0a01-f2af-4739-83ac-2be012508cd6';
const settingsCharacteristicUUID = '4a59aa02-2178-427b-926a-ff86cfb87571';
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
let settingsCharacteristic = null;
let device = null;

const onDisconnected = () => {
  // const espStore = useEspStore();
  // espStore.connected = false;
};

async function readSettings() {
  const espStore = useEspStore();
  const dataStore = useDataStore();
  // Throw error if no BLE device is connected
  if (!espStore.connected) throw new Error('Not connected to ESP');
  // Retrieve the values from the BLE device
  let rawValue = await settingsCharacteristic.readValue();
  const value = textDecoder.decode(rawValue);
  // Parse the values and save them in the data store
  dataStore.settings = JSON.parse(value);
};

export async function writeSettings() {
  const espStore = useEspStore();
  // Throw error if no BLE device is connected
  if (!espStore.connected) throw new Error('Not connected to ESP');
  // Grab and format the values to be sent
  const dataStore = useDataStore();
  let value = JSON.stringify(dataStore.settings);
  value = textEncoder.encode(value);
  // Send the values to the BLE device
  settingsCharacteristic.writeValue(value)
  .catch(e => {
    console.log(e);
  });
}

export async function connectDevice() {
  const espStore = useEspStore();
  // Throw an error if the browser does not support bluetooth
  if (!navigator.bluetooth) {
    espStore.supported = false;
    return;
  }

  try {
    const options = {
      optionalServices: [serviceUUID],
      filters: [
        { name: 'OpenX-ETP-Inst' },
      ],
    };
    // Connect to the BLE device and set the disconnect event listener
    device = await navigator.bluetooth.requestDevice(options);
    device.addEventListener('gattserverdisconnected', onDisconnected);
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(serviceUUID);
    // Grab the 'settings' characteristic from the BLE device
    settingsCharacteristic = await service.getCharacteristic(settingsCharacteristicUUID);
    espStore.connected = true;
    readSettings();
  } catch (e) {
    espStore.connected = false;
    console.log(e);
  }
}

export function disconnectDevice() {
  const espStore = useEspStore();
  // Exit if the device is already disconnected
  if (!espStore.connected) return;
  device.gatt.disconnect();
  espStore.connected = false;
}
