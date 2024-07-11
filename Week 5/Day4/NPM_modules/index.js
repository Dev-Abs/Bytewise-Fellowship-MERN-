console.log('testing! why')

const { format } = require('date-fns');
console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss.SSSxxx'))


const { v4: uuidv4 } = require('uuid');
console.log(uuidv4());