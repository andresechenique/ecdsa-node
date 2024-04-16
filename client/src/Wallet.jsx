import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import {toHex} from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address  =toHex(secp256k1.getPublicKey(privateKey))
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an private key, for example: 0x23x6c5z765sd76a8a9s8" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div className="balance">Address: {address.slice(0, 10)}...</div>
    </div>
  );
}

export default Wallet;
