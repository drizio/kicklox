export const fetchApi = async (url: string, options: {[key: string]: any} = {}) => {
    try {
        const response = await fetch(url, options)
        /*if(!response.ok){
            throw Error('An error occured !88!')
        }*/
        return response.json()
    } catch (error) {
        console.log(error, 'error')
        throw error
    }
}
