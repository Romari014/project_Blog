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
            const response = await fetch(request);
            return await response.json()
        } catch(err) {
            console.error(err); 
        }
    }
}

export const apiService = new ApiService('https://project-blog-49723-default-rtdb.europe-west1.firebasedatabase.app')