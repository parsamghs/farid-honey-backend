import { insertAddress } from '../../Models/Addresses/Add-Addresses.js';

export async function addNewAddress(data) {

  return insertAddress(data);
}
