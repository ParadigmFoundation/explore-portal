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

export const getConcentrated = (text) => {
  if(text.length > 12)
    return text.slice(0,10)+'...'+text.slice(-10);
  else
    return text;
}

export const getConcentratedAddr = (text) => {
  if (text.length > 10)
      return text.slice(0,6)+'...'+text.slice(-4);
  else
      return text;
}

