//Если эспортируем по дефолту то у нас будет вот такой объект:
// {
//     default: function logger() {
//         console.log('Hello world!')
//     }
// }

export default function logger () {
    console.log('Hello world!')
}

export function secondLog() {
    console.log('2nd')
}