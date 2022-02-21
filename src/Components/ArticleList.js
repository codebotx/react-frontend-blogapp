import React from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';

function ArticleList(props) {

  const [token] = useCookies(['mytoken'])

   const editBtn = (bookmark) => {
     props.editBtn(bookmark)
   }

   const deleteBtn = (article) => {
        APIService.DeleteArticle(article.id, token['mytoken'])
        .then(() => props.deleteBtn(article))
        .catch(error => console.log(error))
       
   }

    return (
 
        <div>
            
         
            
        {props.bookmarks && props.bookmarks.map(bookmark => {
          return (
            <div key = {bookmark.id}>
          <h2>{bookmark.title}</h2>
          <p>{bookmark.description}</p>

          <div className = "row">
          <div className = "col-md-1">
          <button className = "btn btn-primary" onClick  = {() => editBtn(bookmark)}>Update</button>
          </div>

           <div className = "col">
          <button onClick = {() => deleteBtn(bookmark)} className = "btn btn-danger">Delete</button>
          </div>


          </div>

          <hr className = "hrclass"/>
          </div>
          )
        })}

    

    
        
        </div>
    
    )
}

export default ArticleList
