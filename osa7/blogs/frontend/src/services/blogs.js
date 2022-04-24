import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getOne = async (id) => {
    const res = await axios.get(baseUrl + id)
    return res.data
}
const addBlog = async (blog, user) => {
    const res = await axios.post(baseUrl, blog, {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    })
    return res.data
}

const addComment = async (id, comment) => {
    const res = await axios.post(baseUrl + id + '/comments', comment)
    console.log(res)
    return res.data
}

const updateBlog = async (blog, user) => {
    const res = await axios.put(baseUrl + blog.id, blog, {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    })

    return res.data
}
const removeBlog = async (blog, user) => {
    const res = await axios.delete(baseUrl + blog.id, {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    })
    return res
}

export default { getAll, addBlog, updateBlog, removeBlog, getOne, addComment }
