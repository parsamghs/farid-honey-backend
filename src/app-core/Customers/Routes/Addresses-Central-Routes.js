import express from 'express';
const router = express.Router();

import addAddress from './Addresses/Add-Adress.js';
import getaddress from './Addresses/Get-Addresses.js';
import editAddress from './Addresses/Edit-Address.js';
import deleteAddress from './Addresses/Delete-Address.js';

router.use('/add-address', addAddress);

router.use('/my-addresses', getaddress);

router.use('/edit-address', editAddress);

router.use('/delete-address', deleteAddress);

export default router;
