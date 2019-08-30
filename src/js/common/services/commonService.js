export const formatMoney = (v) => {
    
    return v? Number(v).toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 2}): '0';
}

export const formatMoneyPlus = (v) => {
    let p = '';
    if(v >= 0) p = '+';
    return p+v.toLocaleString(undefined,{minimumFractionDigits: 0, maximumFractionDigits: 2});

}
export const formatNumber = (v) => {
    return Number(v).toLocaleString(undefined,{minimumFractionDigits: 0, maximumFractionDigits: 6});
}

export const formatNumberPlus = (v) => {
    let p = '';
    if(v >= 0) p = '+';
    return p+Number(v).toLocaleString(undefined,{minimumFractionDigits: 0, maximumFractionDigits: 0});
}

export const getConcentrated = (text, b64toHex) => {
    if (b64toHex) {
        text = Buffer.from(text, "base64").toString("hex");
    }
    if(text.length > 12)
      return text.slice(0,10)+'...'+text.slice(-10);
    else
      return text;
  }

export const getConcentratedAddr = (text) => {
    if (text.length > 12)
        return text.slice(0,6)+'...'+text.slice(-4);
    else
        return text;
}

export const isValid0xOrder = (input) => {
    let parsed;
    const addrRegEx = /^0x[0-9a-f]{40}$/;
    const uintRegEx = /^\d*$/;
    const sigRegEx = /^0x[a-z0-9]{132}/; 
    const assetDataRegEx = /^0x[a-z0-9]{72}$/;
    const keys = [
        { name: "exchangeAddress", regEx: addrRegEx },
        { name: "senderAddress", regEx: addrRegEx },
        { name: "makerAddress", regEx: addrRegEx },
        { name: "takerAddress", regEx: addrRegEx },
        { name: "makerAssetData", regEx: assetDataRegEx },
        { name: "takerAssetData", regEx: assetDataRegEx },
        { name: "feeRecipientAddress", regEx: addrRegEx },
        { name: "makerAssetAmount", regEx: uintRegEx },
        { name: "takerAssetAmount", regEx: uintRegEx },
        { name: "makerFee", regEx: uintRegEx },
        { name: "takerFee", regEx: uintRegEx },
        { name: "expirationTimeSeconds", regEx: uintRegEx },
        { name: "salt", regEx: uintRegEx },
        { name: "signature", regEx: sigRegEx }
    ];
    try {
        parsed = JSON.parse(input);
        const orderKeys = Object.keys(parsed);
        if (orderKeys.length !== keys.length) return false;
        for (let i = 0; i < keys.length; i++) {
            const { name, regEx } = keys[i];
            if (!regEx.test(parsed[name])) {
                return false;
            }
        }
    } catch (_) {
        return false;
    }
    return true;
}

export const zrxFormatter = (signedZeroExOrder) => {
    const makerAsset = signedZeroExOrder.makerAssetData.substr(2).match(/.{1,64}/g);
    const takerAsset = signedZeroExOrder.takerAssetData.substr(2).match(/.{1,64}/g);
    const signature = signedZeroExOrder.signature.substr(2).match(/.{1,64}/g);
    signedZeroExOrder.makerAssetData0 = `0x${makerAsset[0]}`;
    signedZeroExOrder.makerAssetData1 = `0x${makerAsset[1]}`;
    signedZeroExOrder.takerAssetData0 = `0x${takerAsset[0]}`;
    signedZeroExOrder.takerAssetData1 = `0x${takerAsset[1]}`; 
    signedZeroExOrder.signature0 = `0x${signature[0]}`;
    signedZeroExOrder.signature1 = `0x${signature[1]}`;
    signedZeroExOrder.signature2 = `0x${signature[2]}`;
    return signedZeroExOrder;
  };