/*!

=========================================================
* Argon Dashboard PRO React Nodejs - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react-nodejs
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim
* Coded by ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from 'axios';
import { description } from 'commander';
import config from "config";

const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async (conf) => {
    const token = localStorage.getItem('token');
    conf.headers.Authorization = (token ? token : '');
    conf.headers.ContentType = 'application/json';
    return conf;
});

export const getAll = async () => (
    await instance.post('users/all')
);

export const register = async (name, email, password, userType) => (
    await instance.post('users/register', {name, email, password, userType})
);

export const confirmRegister = async id => (
    await instance.post(`users/confirm/${id}`)
);

export const forgotPassword = async email => (
    await instance.post('users/forgotpassword', {email})
);

export const confirmReset = async (id, password) => (
    await instance.post(`users/resetpass/${id}`, {password})
);

export const login = async (email, password) => (
    await instance.post('users/login', {email, password})
);

export const logout = async token => (
    await instance.post('users/logout', {token})
);

export const edit = async (userID, name, email, userType) => (
    await instance.post('users/edit', {userID, name, email, userType})
);

export const checkSession = async () => (
    await instance.post('users/checkSession')
);

// tasks

export const createTask = async (userId, title, description, color, startDate, endDate) => (
    await instance.post('tasks/add', {userId, title, description, color, startDate, endDate})
);

export const editTask = async (id, title, description, color, startDate, endDate) => (
    await instance.post('tasks/edit', {id, title, description, color, startDate, endDate})
);

export const getTasksByUser = async userId => (
    await instance.post('tasks/user', {userId})
);

export const getTaskById = async id => (
    await instance.post(`tasks/one/${id}`)
);

export const deleteTask = async id => (
    await instance.post('tasks/delete', {id})
);

// posts

export const getPosts = async () => (
    await instance.post('posts/all')
);

export const getPostsFromToday = async () => (
    await instance.post('posts/published')
);

export const getPostsById = async id => (
    await instance.post(`posts/one/${id}`)
);

export const addPost = async (title, content, categories, tags, authorName, publishedAt) => (
    await instance.post('posts/add', {title, content, categories, tags, authorName, publishedAt})
);

export const editPost = async (id, title, content, categories, tags, authorName, publishedAt) => (
    await instance.post('/posts/edit', {id, title, content, categories, tags, authorName, publishedAt})
);

export const deletePost = async id => (
    await instance.post('posts/delete', {id})
);

export const getPostByCateogory = async category => (
    await instance.post('posts/categories', {category})
);

// categories

export const getCategories = async () => (
    await instance.post('categories/all')
);

export const addCategory = async (title, description) => (
    await instance.post('categories/add', {title, description})
);

export const getCategoryById = async id => (
    await instance.post(`categories/one/${id}`)
);

export const deleteCategory = async id => (
    await instance.post('categories/delete', {id})
);

export const editCategory = async (title, description, id) => (
    await instance.post('categories/edit', {title, description, id})
);
