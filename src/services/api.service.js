class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            })
            return useRequest(request)
        } catch(err) {
            console.error(err); 
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch(err) {
            console.error(err);
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request);
    return await response.json()
}

export const apiService = new ApiService('https://project-blog-49723-default-rtdb.europe-west1.firebasedatabase.app')