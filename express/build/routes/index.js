"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@sitechtimes/shared");
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const homepage_1 = require("../middleware/articles/homepage");
router.get('/articles/homepage', homepage_1.articlesHomepage);
const articles_1 = require("../middleware/articles");
router.get('/articles', articles_1.articlesIndex);
const show_1 = require("../middleware/articles/show");
router.get('/articles/:slug', show_1.articlesShow);
const current_user_1 = require("../middleware/auth/current-user");
router.get('/auth/current-user', shared_1.currentUser, current_user_1.authCurrentUser);
const signin_1 = require("../middleware/auth/signin");
router.post('/auth/signin', [(0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Email must be valid'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], shared_1.validateRequest, signin_1.authSignIn);
const signout_1 = require("../middleware/auth/signout");
router.post('/auth/signout', signout_1.authSignOut);
const signup_1 = require("../middleware/auth/signup");
router.get('/auth/signup', [
    (0, express_validator_1.body)('name')
        .notEmpty().withMessage("Name can't be empty"),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Email must be valid')
        .matches("^[\\w.+\\-]+@schools\\.nyc\\.gov$")
        .withMessage('Email must be a staten island tech email'),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be between 8 and 16 characters')
], shared_1.validateRequest, signup_1.authSignUp);
const verify_1 = require("../middleware/auth/verify");
router.get('/auth/verify/:token', verify_1.authVerify);
const delete_1 = require("../middleware/users/delete");
router.delete('/users/:id', shared_1.requireAuth, delete_1.usersDelete);
const index_1 = require("../middleware/users/index");
router.get('/users/', shared_1.requireAuth, (0, shared_1.roles)(['admin']), index_1.usersIndex);
const show_2 = require("../middleware/users/show");
router.get('/users/:id', shared_1.requireAuth, show_2.usersShow);
const update_1 = require("../middleware/users/update");
router.put('/users/:id', shared_1.requireAuth, update_1.usersUpdate);
const categories_1 = require("../middleware/cms/categories");
router.get('/cms/categories', categories_1.cmsCategories);
const delete_2 = require("../middleware/cms/delete");
router.delete('/cms/:id/', shared_1.requireAuth, delete_2.cmsDelete);
const index_2 = require("../middleware/cms/index");
router.get('/cms/', shared_1.requireAuth, index_2.cmsIndex);
const new_1 = require("../middleware/cms/new");
router.post('/cms/', shared_1.requireAuth, new_1.cmsNew);
const publish_1 = require("../middleware/cms/publish");
router.post('/cms/:id/publish', shared_1.requireAuth, (0, shared_1.roles)(['admin']), publish_1.cmsPublish);
const ready_1 = require("../middleware/cms/ready");
router.get('/cms/ready/', shared_1.requireAuth, (0, shared_1.roles)(['admin']), ready_1.cmsReady);
const review_1 = require("../middleware/cms/review");
router.get('/cms/review', shared_1.requireAuth, (0, shared_1.roles)(['editor', 'admin']), review_1.cmsReview);
const show_3 = require("../middleware/cms/show");
router.get('/cms/:id', shared_1.requireAuth, show_3.cmsShow);
const update_2 = require("../middleware/cms/update");
router.put('/cms/:id/', shared_1.requireAuth, update_2.cmsUpdate);
