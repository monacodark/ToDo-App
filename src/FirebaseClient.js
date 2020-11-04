import axios from 'axios'

const firebaseClient = axios.create({
  baseURL: 'https://react-native-todo-app-91b80.firebaseio.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * FirebaseClient
 */
export class FirebaseClient {
  /**
   * @param {string} method
   * @param {string} url
   * @param {object} payload
   * @return {object}
   */
  static async req(method, url, payload) {
    method = method.toLowerCase()

    if (
      method !== 'get' &&
      method !== 'post' &&
      method !== 'patch' &&
      method !== 'delete'
    ) return {success: false, error: 'Unknown method'}

    try {
      const {data} = await firebaseClient[method](url, payload)

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: `Status code - 
            ${error.response ? error.response.status : error}`,
      }
    }
  }
}
