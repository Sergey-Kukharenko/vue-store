export const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

export const objsArray = objs => Object.values(objs).filter(item => [].push(item))

export const duplicateAndSumQuantity = arr => Object.values(arr.reduce((acc, {quantity, ...r}) => {
    const key = Object.entries(r).join('-');
    acc[key] = (acc[key] || {...r, quantity: 0});
    return (acc[key].quantity += quantity, acc);
}, {}))

export const objsArrayCreateProp = (objs, key = 'ownerId') => {
    const newKey = Object.keys(objs)
    return Object.values(objs).filter((item, idx) => {
        Object.assign(item, {[key]: newKey[idx]});
        return [].push(item)
    })
}

export const getNameKey = arr => Object.keys(arr).find(item => item)

export const fillArray = (arr, newArr) => Object.values(arr).map(obj => obj.map(item => newArr.push(item)))