import {Sorter} from "./Sorter";
import {NumbersCollection} from "./NumbersCollection";
import {CharactersCollection} from "./CharactersCollection";
import {LinkedList} from "./LinkedList";

const numbersCollection = new NumbersCollection([123, -42, 4, -3, 11, 2])

numbersCollection.sort()
console.log(numbersCollection.data)

const charactersCollection = new CharactersCollection('ZxYcba')

charactersCollection.sort()
console.log(charactersCollection.data)


const linkedList = new LinkedList()
linkedList.add(100)
linkedList.add(-11)
linkedList.add(-3)
linkedList.add(7)

linkedList.sort()
linkedList.print()