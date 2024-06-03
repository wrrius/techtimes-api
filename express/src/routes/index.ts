import { currentUser, requireAuth, validateRequest, roles } from '@sitechtimes/shared'
import {body} from 'express-validator'

import express from 'express'
const router = express.Router()

import { articlesHomepage } from '../middleware/articles/homepage'
router.get('/articles/homepage', articlesHomepage)

import { articlesIndex } from '../middleware/articles'
router.get('/articles', articlesIndex)

import { articlesShow } from '../middleware/articles/show'
router.get('/articles/:slug', articlesShow)

import { authCurrentUser } from '../middleware/auth/current-user'
router.get('/auth/current-user', currentUser, authCurrentUser)

import { authSignIn } from '../middleware/auth/signin'
router.post('/auth/signin', 
[body('email')
    .isEmail()
    .withMessage('Email must be valid'),
body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], validateRequest, authSignIn)

import {authSignOut} from '../middleware/auth/signout'
router.post('/auth/signout', authSignOut)

import {authSignUp} from '../middleware/auth/signup'
router.get('/auth/signup',
[
    body('name')
        .notEmpty().withMessage("Name can't be empty"),
    body('email')
        .isEmail().withMessage('Email must be valid')
        .matches("^[\\w.+\\-]+@schools\\.nyc\\.gov$")
        .withMessage('Email must be a staten island tech email'),
    body('password')
        .trim()
        .isLength({min: 8, max: 16})
        .withMessage('Password must be between 8 and 16 characters')
], validateRequest, authSignUp)

import {authVerify} from '../middleware/auth/verify'
router.get('/auth/verify/:token', authVerify)

import {usersDelete} from '../middleware/users/delete'
router.delete('/users/:id', requireAuth, usersDelete)

import {usersIndex} from '../middleware/users/index'
router.get('/users/', requireAuth, roles(['admin']), usersIndex)

import {usersShow} from '../middleware/users/show'
router.get('/users/:id', requireAuth, usersShow)

import {usersUpdate} from '../middleware/users/update'
router.put('/users/:id', requireAuth, usersUpdate)

import { cmsCategories } from '../middleware/cms/categories'
router.get('/cms/categories', cmsCategories)

import { cmsDelete } from '../middleware/cms/delete'
router.delete('/cms/:id/', requireAuth, cmsDelete)

import { cmsIndex } from '../middleware/cms/index'
router.get('/cms/', requireAuth, cmsIndex)

import { cmsNew } from '../middleware/cms/new'
router.post('/cms/', requireAuth, cmsNew)

import { cmsPublish } from '../middleware/cms/publish'
router.post('/cms/:id/publish', requireAuth, roles(['admin']), cmsPublish)

import { cmsReady } from '../middleware/cms/ready'
router.get('/cms/ready/', requireAuth, roles(['admin']), cmsReady)

import { cmsReview } from '../middleware/cms/review'
router.get('/cms/review', requireAuth, roles(['editor', 'admin']), cmsReview)

import { cmsShow } from '../middleware/cms/show'
router.get('/cms/:id', requireAuth, cmsShow)

import { cmsUpdate } from '../middleware/cms/update'
router.put('/cms/:id/', requireAuth, cmsUpdate)

export {router}