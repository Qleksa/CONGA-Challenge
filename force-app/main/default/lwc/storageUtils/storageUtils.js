const addToLocalStorage  = (itemToAddTo, valueToAdd, limit)  => {
    let item = localStorage.getItem(itemToAddTo);
    if (item !== 'null') {
        item = JSON.parse(item);
        if (limit !== undefined) {
            if (item.length === 3)
                return;
        }
        if (!item.includes(valueToAdd))
            item.push(valueToAdd)
        localStorage.setItem(itemToAddTo, JSON.stringify(item));
    } else {
        localStorage.setItem(itemToAddTo, JSON.stringify([valueToAdd]));
    }
}

const removeFromLocalStorage = (itemToRemoveFrom, valueToRemove) => {
    let item = localStorage.getItem(itemToRemoveFrom);
    if (item !== 'null') {
        item = JSON.parse(item);
        item = item.filter(product => product !== valueToRemove);
        localStorage.setItem(itemToRemoveFrom, JSON.stringify(item));
    }
}

export { addToLocalStorage, removeFromLocalStorage }