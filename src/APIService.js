export default class APIService {

    static UpdateArticle(bookmark_id, body, token) {

        return fetch(`http://127.0.0.1:8000/api/bookmarks/${bookmark_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)

        }).then(resp => resp.json())


    }

    static InsertArticle(body, token) {

        return fetch('http://127.0.0.1:8000/api/bookmarks/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)

        }).then(resp => resp.json())

    }

    static DeleteArticle(bookmark_id, token) {

        return fetch(`http://127.0.0.1:8000/api/bookmarks/${bookmark_id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }

        })

    }

    static LoginUser(body) {

        return fetch('http://127.0.0.1:8000/auth/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(body)

        }).then(resp => resp.json())

    }


    static RegisterUser(body) {

        return fetch('http://127.0.0.1:8000/api/users/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(body)

        }).then(resp => resp.json())

    }


}