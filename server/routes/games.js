const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const Sport = require('../models/sport');
const { ERROR_MESSAGE, SUCCESS } = require('../utils/constants');
const { replaceCommaWithDot } = require('../utils/utils');

router.post('/add', (req, res, next) => {
  const newGame = new Game({
    teamAId: req.body.teamAId,
    teamBId: req.body.teamBId,
    teamAScore: parseInt(req.body.teamAScore),
    teamBScore: parseInt(req.body.teamBScore),
    teamAOdd: replaceCommaWithDot('' + req.body.teamAOdd),
    teamBOdd: replaceCommaWithDot('' + req.body.teamBOdd),
    date: req.body.date,
    winner: req.body.winner,
    type: req.body.type,
  });

  // FIXME: error 11000
  newGame.save((err) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      res.json({ success: true, message: SUCCESS, game: newGame });
    }
  });
});

router.put('/edit', (req, res, next) => {
  Game.findByIdAndUpdate(
    req.body._id,
    { $set: req.body },
    { new: true },
    (err) => {
      if (err) {
        res.json({ success: false, message: ERROR_MESSAGE, err });
      } else {
        res.json({ success: true, message: SUCCESS });
      }
    }
  );
});

router.delete('/remove/:id', (req, res, next) => {
  Game.findByIdAndDelete(req.params.id, (err, game) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else {
      if (!game) res.json({ success: false, message: `GAME NOT FOUND` });
      else res.json({ success: true, message: `GAME ADDED` });
    }
  });
});

router.get('/all/:sport', (req, res, next) => {
  const sport = req.params.sport;

  Sport.findOne({ name: sport }, (err, sport_type) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    }
    if (!sport_type) {
      res.json({ success: false, message: `TYPE NOT FOUND` });
    } else {
      // get all games by sport
      Game.find({ type: sport_type._id }, (err, games) => {
        if (err) {
          res.json({ success: false, message: ERROR_MESSAGE, err });
        }
        if (!games) {
          res.json({ success: false, message: `GAMES NOT FOUND` });
        } else {
          res.json({ success: true, message: `GAMES FOUND`, games });
        }
      })
        .sort('-createdAt')
        .populate('teamAId')
        .populate('teamBId')
        .populate('type');
    }
  });
});

router.get('/all', (req, res, next) => {
  Game.find({}, (err, games) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (games.length === 0) {
      res.json({ success: false, message: `GAME NOT FOUND`, games });
    } else {
      res.json({ success: true, message: SUCCESS, games });
    }
  })
    .sort('-createdAt')
    .populate('teamAId')
    .populate('teamBId')
    .populate('type');
});

router.get('/:sportId/:page', (req, res, next) => {
  let sportId = req.params.sportId;
  let limit = 3;
  let page = req.params.page;

  Game.find(
    { type: sportId },
    null,
    { limit: limit, skip: (page - 1) * limit },
    (err, games) => {
      if (err) {
        res.json({ success: false, message: ERROR_MESSAGE, err });
      }
      if (!games) {
        res.json({ success: false, message: `JOGOS NÃO ENCONTRADOS` });
      } else {
        res.json({ success: true, message: `GAMES FOUND`, games });
      }
    }
  )
    .sort('-createdAt')
    .populate('teamAId')
    .populate('teamBId');
});

router.get('/:id', (req, res, next) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) {
      res.json({ success: false, message: ERROR_MESSAGE, err });
    } else if (!game) {
      res.json({ success: false, message: `GAME NOT FOUND` });
    } else {
      res.json({ success: true, message: SUCCESS, team: game });
    }
  });
});
module.exports = router;
