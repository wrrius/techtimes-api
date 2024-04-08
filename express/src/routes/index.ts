import express from 'express'
const router = express.Router()

import { articlesHomepage } from '../middleware/articles/homepage'
router.get('/articles/homepage', articlesHomepage)

import { articlesIndex } from '../middleware/articles'
router.get('/articles', articlesIndex)

import { articlesShow } from '../middleware/articles/show'
router.get('/articles/:slug', articlesShow)

import { authCurrentUser } from '../middleware/auth/current-user'
router.get('/auth/current-user', authCurrentUser)