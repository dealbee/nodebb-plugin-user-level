'use strict';

const controllers = require('./lib/controllers');
const helper = require.main.require('./src/controllers/helpers');
const db = require.main.require('./src/database');
const user = require.main.require('./src/user');
const plugin = {};

plugin.init = function (params, callback) {
	const router = params.router;
	const hostMiddleware = params.middleware;
	// const hostControllers = params.controllers;

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/user-level', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/user-level', controllers.renderAdminPage);
	router.post('/user-level/level',
		// checkRegisterMiddleware,
		getLevel)
	router.post('/user-level/level-list',
		// checkRegisterMiddleware,
		getLevelList)
	callback();
};

plugin.addAdminNavigation = function (header, callback) {
	header.plugins.push({
		route: '/plugins/user-level',
		icon: 'fa-tint',
		name: 'User level',
	});

	callback(null, header);
};
var checkRegisterMiddleware = function (req, res, next) {
	console.log(req);
	if (!req.loggedIn) {
		return helper.notAllowed(req, res);
	}
	else {
		next();
	}
}
var getLevel = async function (req, res) {
	var levelList = await db.client.collection('objects').find({ _key: /settings:user-level:sorted-list:level-list:/ }).toArray();
	levelList.map(e => e['min-reputation'] = parseInt(e['min-reputation']))
	levelList.sort((a, b) => {
		return b['min-reputation'] - a['min-reputation']
	})
	levelList.map((e, i) => {
		e['level-index'] = levelList.length - i;
		e['next-level'] = levelList[i - 1]
		return e;
	})
	var reputation = await user.getUserField(req.body.uid, ['reputation'])
	var level = levelList.find(e => {
		return e['min-reputation'] <= reputation
	})
	level.reputation = reputation
	if (!level) {
		return res.status(200).send(
			{
				"level-name": "No level defined",
				"min-reputation": -1
			})
	}
	return res.status(200).send(level);
}
var getLevelList = async function (req, res) {
	var levelList = await db.client.collection('objects').find({ _key: /settings:user-level:sorted-list:level-list:/ }).toArray();
	levelList.map(e => e['min-reputation'] = parseInt(e['min-reputation']))
	// console.log(levelList)
	levelList.sort((a, b) => {
		return b['min-reputation'] - a['min-reputation']
	})
	levelList.map((e, i) => {
		e['level-index'] = levelList.length - i;
		e['next-level'] = levelList[i - 1]
		return e;
	})
	var users = await user.getUsersData(req.body.uid)
	var reputation = [];
	users.forEach(e => {
		reputation.push(e.reputation)
	})
	// console.log(reputation)
	var levelReturn = [];
	reputation.forEach(e => {
		levelReturn.push(
			levelList.find(i => {
				return i['min-reputation'] <= e
			}))
	})
	var result = levelReturn.map((e, i) => {
		e = { ...e, ...users[i] };
		return e;
	})
	return res.status(200).send(result);
}
module.exports = plugin;
