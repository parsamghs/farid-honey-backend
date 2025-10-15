import { getAddressesByUserId } from '../../Models/Addresses/Get-Addresses.js';
import { formatNumber, formatNumbersintext } from '../../../../Helpers/Number-formatter.js';

export async function getUserAddressesService(userId) {
  const addresses = await getAddressesByUserId(userId);

  const formatted = addresses.map(addr => ({
    ...addr,
    id: addr.id.toString(),
    plate: formatNumber(addr.plate, false),
    unit: formatNumber(addr.unit, false),
    postal_code: formatNumber(addr.postal_code, false),
    phone_number: formatNumbersintext(addr.phone_number),
    address: formatNumbersintext(addr.address)
  }));

  return formatted;
}
