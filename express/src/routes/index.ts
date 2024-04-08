import { currentUser } from '@sitechtimes/shared'
import { validateRequest } from '@sitechtimes/shared'
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
router.get('auth/signin', 
[body('email')
    .isEmail()
    .withMessage('Email must be valid'),
body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], validateRequest, authSignIn)

import {authSignOut} from '../middleware/auth/signout'
router.get('auth/signout', authSignOut)

import {authSignUp} from '../middleware/auth/signup'
router.get('auth/signup',
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
router.get('auth/verify/:token', authVerify)