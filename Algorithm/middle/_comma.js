function _comma(number) {
    let negative = number < 0 ? '-' : '';
    number = Math.abs(parseInt(number, 10));

    let str = number.toString();
    let result = [];

    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        result.push(str[i]);
        count++;
        if (count % 3 === 0 && i !== 0) {
            result.push(',');
        }
    }

    return negative + result.reverse().join('');
}
