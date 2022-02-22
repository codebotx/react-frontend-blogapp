import './App.css';
import { useState, useEffect } from 'react'
import ArticleList from './Components/ArticleList';
import Form from './Components/Form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function App() {


  const [bookmarks, setBookmarks] = useState([])
  const [editBookmark, setEditBookmark] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let history = useNavigate()



  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/bookmarks/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token 0d6b7ad32a16517f28aebaac42246d27bd4dca74`
      }
    })
      .then(resp => resp.json())
      .then(resp => setBookmarks(resp))
      .catch(error => console.log(error))

  }, [])


  useEffect(() => {

    if (!token['mytoken']) {

      history('/')
      //window.location.href = '/'

    }
  }, [token, history])

  const editBtn = (bookmark) => {
    setEditBookmark(bookmark)

  }

  const updatedInformation = (bookmark) => {
    const new_bookmark = bookmarks.map(mybookmark => {
      if (mybookmark.id === bookmark.id) {
        return bookmark;
      }
      else {
        return mybookmark;
      }
    })

    setBookmarks(new_bookmark)

  }

  const bookmarkForm = () => {
    setEditBookmark({ title: '', description: '' })

  }

  const insertedInformation = (bookmark) => {
    const new_bookmarks = [...bookmarks, bookmark]
    setBookmarks(new_bookmarks)

  }

  const deleteBtn = (bookmark) => {
    const new_bookmarks = bookmarks.filter(mybookmark => {
      if (mybookmark.id === bookmark.id) {
        return false
      }
      return true;
    })

    setBookmarks(new_bookmarks)

  }

  const logoutBtn = () => {
    removeToken(['mytoken'])

  }

  return (<>


    <div className="App">

      <div className="row">
        <h1>Blog.SIT</h1>
        <div className="col">
          <div className="col py-2">
            <button onClick={bookmarkForm} className="btn btn-primary">Insert blog</button>
          </div>
        </div>
		</div>
      <div className="row">

        <div className="col py-2">
          <button onClick={logoutBtn} className="btn btn-primary">Logout</button>
        </div>

      </div>




      <ArticleList bookmarks={bookmarks}
        editBtn={editBtn} deleteBtn={deleteBtn} />
       {/* <Form bookmark={editBookmark} /> */}

      {editBookmark ? <Form bookmark={editBookmark} updatedInformation={updatedInformation} insertedInformation={insertedInformation} /> : null}





    </div>


  </>
  );
}

export default App;
