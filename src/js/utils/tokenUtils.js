import Web3 from 'web3';

module.exports = {
  fromWei: (value) => {
    if (value === undefined) return 0;
    if (typeof value !== 'string') {
      value = value.toString();
    }

    return Web3.utils.fromWei(value);
  },
};
