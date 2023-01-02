import { useEspStore } from '@/store/espStore';
import { useDataStore } from '@/store/dataStore';

const serviceUUID = '06cd0a01-f2af-4739-83ac-2be012508cd6';
const bleCharacteristicTX = '4a59aa02-2178-427b-926a-ff86cfb87571';
const bleCharacteristicRX = '068e8403-583a-41f2-882f-8b0a218ab77b';
let writeGATTCharacteristic = null;
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();

const onDisconnected = () => {
  console.log('Disconnect handler');
};

export async function sendSettingsToEsp() {
  // TODO: move below connected when done
  const dataStore = useDataStore();

  console.log('Sending to ESP', JSON.stringify({
    plants: dataStore.plants,
    settings: dataStore.settings,
  }));

  const espStore = useEspStore();

  if (!espStore.connected) {
    throw new Error('Not connected to ESP');
  }

  const toSend = textEncoder.encode(JSON.stringify({
    plants: dataStore.plants,
    settings: dataStore.settings,
  }));

  await writeGATTCharacteristic.writeValue(toSend);
}

const onStatusUpdate = (event) => {
  const value = textDecoder.decode(event.target.value);
  console.log(value);
};

export async function connectToESP() {
  const espStore = useEspStore();

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

    const device = await navigator.bluetooth.requestDevice(options);

    device.addEventListener('gattserverdisconnected', onDisconnected);

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(serviceUUID);
    writeGATTCharacteristic = await service.getCharacteristic(bleCharacteristicTX);
    const notificationGATTCharacteristic = await service.getCharacteristic(bleCharacteristicRX);

    notificationGATTCharacteristic.startNotifications()
      .then(() => {
      notificationGATTCharacteristic.addEventListener('characteristicvaluechanged', onStatusUpdate);
    });

    espStore.connected = true;
  } catch (e) {
    espStore.connected = false;
    console.log(e);
  }
}
