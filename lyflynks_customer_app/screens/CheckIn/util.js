export function getHoursAndMinutes(val = '') {
    const [hrs, mins, pm] = val.split(',');
    return [+hrs || 0, +mins || 0, pm == 'true' ? true : false];
}