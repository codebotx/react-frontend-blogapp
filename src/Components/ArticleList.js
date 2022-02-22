import React from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';

function ArticleList(props) {

  const [token] = useCookies(['mytoken'])

  const editBtn = (bookmark) => {
    props.editBtn(bookmark)
  }

  const deleteBtn = (bookmark) => {
    APIService.DeleteArticle(bookmark.id, token['mytoken'])
      .then(() => props.deleteBtn(bookmark))
      .catch(error => console.log(error))

  }

  return (

    <div>

      {props.bookmarks && props.bookmarks.map(bookmark => {
        return (<>


          <div className="card border-dark mb-3 text-center py-4 px-4 px-md-5 d-flex align-items-center justify-content-center h-100" style={{ minHeight: '30vh'  }} >         
            <div className="card-body text-dark w-100" style={{ maxWidth: '400px' }}>
              <h5 className="card-title" key={bookmark.id}>{bookmark.title}</h5>
              <p className="card-text">{bookmark.description}</p>
            </div>
          </div>

          <div className="d-flex justify-content-center py-2"> <button className="btn btn-primary" onClick={() => editBtn(bookmark)}>Update</button></div>
          <button onClick={() => deleteBtn(bookmark)} className="btn btn-danger">Delete</button>
          <hr className="hrclass" />

        </>)
      })}

    </div>

  )
}

export default ArticleList
