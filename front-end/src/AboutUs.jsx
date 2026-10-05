import { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'

/**
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const AboutUs = () => {
    const [title, setTitle] = useState('')
    const [imageurl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')

    const fetchInfo = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const title = response.data.title
        setTitle(title)
        const imageurl = response.data.imageurl
        setImageUrl(imageurl)
        const description = response.data.description
        setDescription(description)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
    }

    useEffect(() => {
        // fetch information for about us page
        fetchInfo()
    }, [])

    return (
        <>
        <h1>{title}</h1>
        {error && <p>{error}</p>}
        {!loaded && <img src={loadingIcon} alt="loading" />}
        {imageurl && <img src={imageurl} alt="image" />}
        <p>{description}</p>
        
        </>
    )
}

// make this component available to be imported into any other file
export default AboutUs