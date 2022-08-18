"use strict";
// const addO = (a: number, b: number): number => {
//     return a + b
// }
//
// addO(10, 1)
// class HoldNumber {
//     data: number = 0
// }
//
// class HoldString {
//     data: string = '0'
// }
//
// const holdNumber = new HoldNumber()
// holdNumber.data = 333
//
// const holdString = new HoldString()
// holdString.data = "fsdfsdf"
// class HoldAnything<TypeOfData> {
//     data: TypeOfData
// }
//
// const holdNumber = new HoldAnything<number>()
// holdNumber.data = 111
//
// const holdString = new HoldAnything<string>()
// holdString.data = "fsdfssd"
// Composition misconception
// const rectangular = (state) => {
//     return {
//         area: () => {
//             return state.height * state.width
//         }
//     }
// }
//
// const openable = (state) => {
//     return {
//         toggleOpen: () => {
//             state.open = !state.open
//         }
//     }
// }
//
// const buildRectangleWindow = (state) => {
//     return Object.assign(state, rectangular(state), openable(state))
// }
//
// const rectabgleWindow = buildRectangleWindow({
//     height: 30,
//     width: 20,
//     open: false
// })
