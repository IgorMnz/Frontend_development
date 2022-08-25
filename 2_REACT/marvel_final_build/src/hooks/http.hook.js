import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        //Перед запросом устанавливаем загрузку в true
        setProcess('loading')

        //Пытаемся сделать запрос на сервер, проверяем respone, и если он не ok то переходим к catch
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            //После ответа от сервера когда данные загрузились устанавливаем загрузку в false


            //После всего request нам вернет данные data
            return data;

        } catch(e) {
            //Когда пришла ошибка наша загрузка прекратилась и в стейт error запишется сообщение об ошибке и потом выкидываем ошибку

            setProcess('error')
            throw e;
        }

    }, [])

    //Дополнительно создаем функцию которая будет чистить наши ошибки (например когда мы получаем несуществующего персонажа по id которого нет у в базе, у нас в компоненте randomChar вылетает ошибка после которой мы не можем переключить на следующего персонажа, для этого и создаем эту функцию)
    const clearError = useCallback(() => {

        setProcess('loading')
    }, []);

    //Далее из нашего кастомного хука useHttp возвращаем свойства и методы
    return {request, clearError, process, setProcess}
}