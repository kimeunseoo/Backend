/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * HTTP Interaction
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const multer = require('multer');
//const upload = multer();

const express = require('express');
const app = express();
//const svr = express();
//const app = express.Router();
app.use(express.json());
//router.use(express.json());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Portnummer
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * /
const port = 3004;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * CORS
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const cors = require('cors');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * App Use
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//svr.use(cors());
app.use(cors());
//router.use(cors());

let getUploadedFileName = "";

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './public');
	},
	filename: function (req, file, cb) {
	   let dtype = "";
	   for ( let p = 0; p < file.originalname.length; p++ )
	   {
			if ( file.originalname[p] === '.' )
				dtype = "";
			// *** //
			dtype += file.originalname[p];
	   }
	   let output = file.fieldname + '-' + Date.now() + dtype;
	   getUploadedFileName = "./public/" + output;
	  cb(null, output );
	}
  });

let upload = multer({ storage: storage })
//app.use("/public", express.static(path.join(dirname, "public")));
app.use(express.static("public"));

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Router
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const pageHome = require('./route/home.js');

app.get('/', (req, res, next) => {
	pageHome.get( req, res, next );
});
app.get('/:id', (req, res, next) => {
	pageHome.getSpec( req.params.id, req, res, next );
});
app.get('/public/:img', (req, res, next) => {
	res.sendFile(`${__dirname}/public/${req.params.img}`);
});
const pageLogin = require('./route/login.js');
app.get('/login/:user/:pass', (req, res, next) => {
	pageLogin.get( req.params.user, req.params.pass, req, res, next );
});
const pageRegister = require('./route/register.js');
app.get('/register/:fn/:ln/:em/:ps/:mn/:ct/:pn', (req, res, next) => {
	pageRegister.get( 
		req.params.fn,
		req.params.ln,
		req.params.em,
		req.params.ps,
		req.params.mn,
		req.params.ct,
		req.params.pn,
		req, res, next );
});

const pageSetup = require('./route/setup.js');
app.get('/setup/:id', (req, res, next) => {
	pageSetup.get( req.params.id, req, res, next );
});
app.get('/setup/loadgen/:uid', (req, res, next) => {
	pageSetup.getGeneral( req.params.uid, req, res, next );
});
app.get('/setup/general/:uid/:style/:langkey/:shcom/:evno/:meno/:lono', (req, res, next) => {
	pageSetup.setGeneral( 
		req.params.uid, 
		req.params.style,
		req.params.langkey,
		req.params.shcom,
		req.params.evno,
		req.params.meno,
		req.params.lono,
		req, res
	);
});
app.get('/setup/user/:id/:fn/:ln/:em/:mn/:ct/:pn/:de/:ico', (req, res, next) => {
	pageSetup.setUser( 
		req.params.id,
		req.params.fn,
		req.params.ln,
		req.params.em,
		req.params.mn,
		req.params.ct,
		req.params.pn,
		req.params.de,
		req.params.ico,
		req, res, next );
});

app.post('/setup/logo/post/:uid', upload.single("myLogo"), (req, res, next) => {
	pageSetup.setLogo( req.params.uid, getUploadedFileName, req, res );
});
app.get('/setup/logo/set/:uid/:pic', (req, res, next) => {
	pageSetup.setLogo( req.params.uid, req.params.pic, req, res );
});

const pageReminder = require('./route/reminder.js');
app.get('/reminder', (req, res, next) => {
	pageReminder.get( req, res, next );
});

const pageMessage = require('./route/message.js');
app.get('/message', (req, res, next) => {
	pageMessage.get( req, res, next );
});
app.get('/message/friendlist/:id', (req, res, next) => {
	pageMessage.getFriends( req.params.id, req, res, next );
});
app.get('/message/reminderoptions/:id', (req, res, next) => {
	pageMessage.getReminderOptions( req.params.id, req, res, next );
});
app.get('/message/share/:uid/:fid', (req, res, next) => {
	pageMessage.getShare( req.params.uid, req.params.fid, req, res, next );
});
app.get('/message/send/:uid/:fid/:msg', (req, res, next) => {
	pageMessage.getSend( req.params.uid, req.params.fid, req.params.msg, req, res, next );
});
app.get('/message/notify/:uid/:fid/:rid', (req, res, next) => {
	pageMessage.getNotifyFriend( req.params.uid, req.params.fid, req.params.rid, req, res, next );
});
app.get('/message/connect/friend/:uid/:find', (req, res, next) => {
	pageMessage.connectFriend( req.params.uid, req.params.find, req, res, next );
});

const pageNotification = require('./route/notification.js');
app.get('/notification/show/:part/:uid', (req, res, next) => {
	pageNotification.get( req.params.part, req.params.uid, req, res, next );
});
app.get('/notification/list/:uid', (req, res, next) => {
	pageNotification.getList( req.params.uid, req, res, next );
});
app.get('/notification/save/:uid/:ontype/:onday/:onweek/:onregion/:ontitle/:onmessage', (req, res, next) => {
	pageNotification.set( 
	req.params.uid,
	req.params.ontype,
	req.params.onday,
	req.params.onweek,
	req.params.onregion,
	req.params.ontitle,
	req.params.onmessage,
	req, res, next );
});
app.get('/notification/remove/entry/:id', (req, res, next) => {
	pageNotification.remove( req.params.id, req, res, next );
});
app.get('/notification/notify/get/:uid', (req, res, next) => {
	pageNotification.getNotify( req.params.uid, req, res, next );
});
app.get('/notification/notify/set/:uid/:onevent/:onmessage/:onlocation', (req, res, next) => {
	pageNotification.setNotify( 
	req.params.uid, 
	req.params.onevent,
	req.params.onmessage,
	req.params.onlocation,
	req, res, next );
});

const pageEvent = require('./route/event.js');
app.post('/event/create/:uid', upload.single("myImage"), (req, res, next) => {
	pageEvent.new( req.params.uid, req.body, getUploadedFileName, req, res );
});
app.get('/event/readin/:uid', (req, res, next) => {
	pageEvent.get( req.params.uid, req, res );
});
app.get('/event/joined/:uid', (req, res, next) => {
	pageEvent.getJoinedEvents( req.params.uid, req, res );
});
app.get('/event/joinedFriends/:eid', (req, res, next) => {
	pageEvent.getJoinedFriends( req.params.eid, req, res );
});
app.get('/event/origin/:eid', (req, res, next) => {
	pageEvent.getEventAvatar( req.params.eid, req, res );
});

const pageSearch = require('./route/search.js');
app.get('/search/result/:keyword/:lat/:long/:distance/:category/:spdate', (req, res, next) => {
	pageSearch.get( 
	req.params.keyword, 
	req.params.lat, 
	req.params.long, 
	req.params.distance, 
	req.params.category, 
	req.params.spdate, 
	req, res, next );
});
app.get('/search/detail/:eid', (req, res, next) => {
	pageSearch.detail( req.params.eid, req, res );
});
app.get('/search/join/:eid/:uid/:text/:info', (req, res, next) => {
	pageSearch.join( 
	req.params.eid, 
	req.params.uid, 
	req.params.text, 
	req.params.info, 
	req, res );
});
app.get('/search/disjoin/:eid/:uid', (req, res, next) => {
	pageSearch.disjoin( 
	req.params.eid, 
	req.params.uid, 
	req, res );
});
app.get('/search/delete/:eid', (req, res, next) => {
	pageSearch.delete( req.params.eid, req, res );
});
app.get('/search/category/:cid', (req, res, next) => {
	pageSearch.getCategory( req.params.cid, req, res );
});

const pageMap = require('./route/map.js');
app.get('/map/data/:eid', (req, res, next) => {
	pageMap.get( 
	req.params.eid, 
	req, res, next );
});
app.get('/map/data', (req, res, next) => {
	pageMap.getAll( req, res, next );
});
app.get('/map/specific/:keyword/:lat/:long/:distance/:category/:spdate', (req, res, next) => {
	pageMap.getSpecificAll( 
	req.params.keyword, 
	req.params.lat, 
	req.params.long, 
	req.params.distance, 
	req.params.category, 
	req.params.spdate, 
	req, res, next );
});

const pageComment = require('./route/comment.js');
app.get('/comment/get/:eid', (req, res, next) => {
	pageComment.get( 
	req.params.eid, 
	req, res, next );
});
app.get('/comment/set/:uid/:eid/:ondate/:comment', (req, res, next) => {
	pageComment.set( 
	req.params.uid, 
	req.params.eid, 
	req.params.ondate, 
	req.params.comment, 
	req, res, next );
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Server-Verbindung aufbauen
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
