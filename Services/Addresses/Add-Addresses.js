import { insertAddress } from '../../repositories/Addresses/Add-Addresses.js';

export async function addNewAddress(data) {

  return insertAddress(data);
}
