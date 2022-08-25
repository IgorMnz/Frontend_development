//Создаем функцию action creator для удобства, которая просто возвращает тип action который мы хотим передать в dispatch
export const inc = () => ({type: 'INC'})
export const dec = () => ({type: 'DEC'})
export const rnd = () => ({type: 'RND', payload: Math.floor(Math.random() * 10)}) 