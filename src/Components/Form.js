import React, { useState, useEffect } from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';


function Form(props) {
    const [token] = useCookies(['mytoken'])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setTitle(props.bookmark.title)
        setDescription(props.bookmark.description)

    }, [props.bookmark])


    const updateArticle = () => {
        APIService.UpdateArticle(props.bookmark.id, { title, description }, token['mytoken'])
            .then(resp => props.updatedInformation(resp))


    }

    const insertArticle = () => {
        APIService.InsertArticle({ title, description }, token['mytoken'])
            .then(resp => props.insertedInformation(resp))
    }

    return (
        <div>
            {props.bookmark ? (

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Please enter the title"
                        value={title} onChange={e => setTitle(e.target.value)}


                    />

                    <label htmlFor="description" className="form-label">Description</label>

                    <textarea className="form-control" id="description" placeholder="Please enter the description here" rows="5"
                        value={description} onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    <br />

                    {
                        props.bookmark.id ? <button onClick={updateArticle} className="btn btn-success">Update Blog</button>
                            : <button onClick={insertArticle} className="btn btn-success">Insert Blog</button>


                    }


                </div>


            ) : null}
        </div>
    )
}
export default Form