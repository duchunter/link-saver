'use strict'

import express from 'express';

// Utility modules
import jwtAuthz from 'express-jwt-authz';
import { authCheck } from '../utils/auth0';
import sendLog from '../utils/sendLog';

// API modules
import requestInfo from '../controller/basic/requestInfo';
import searchLink from '../controller/basic/searchLink';
import addLink from '../controller/basic/addLink';
import adjustLink from '../controller/basic/adjustLink';
import deleteLink from '../controller/basic/deleteLink';
import editLink from '../controller/basic/editLink';

// Chatbot route
import handlerBot from '../controller/chatbot/index';

const scopeCheck = jwtAuthz(['admin']);
const router = express.Router();

// TODO: add authCheck and scopeCheck when ready

                    // MAIN MODULES

// Get info
router.post('/api/info', authCheck, requestInfo);

// Search links
router.post('/api/search', authCheck, searchLink);

// Add new link with 2 mode: direct and temp
router.put('/api/add', authCheck, scopeCheck, addLink);

// Edit link info
router.post('/api/edit', authCheck, scopeCheck, editLink);

// Promote or demote link
router.post('/api/adjust', authCheck, scopeCheck, adjustLink);

// Delete link
router.post('/api/delete', authCheck, scopeCheck, deleteLink);

                  // CHAT BOT

// Handling incomming message
router.post('/api/webhook', handlerBot);

                  // SUPPPORTING MODULES

// Parse web to add link
router.put('/api/parse', (req, res) => {
  res.json('Parse link');
});

// TODO: Request instant backup
router.post('/api/backup', (req, res) => {
  res.json('Manual backup');
});

// Request instant log transfer
router.post('/api/log', authCheck, scopeCheck, (req, res) => {
  sendLog(req.headers.authorization).then(isSuccess => {
    if (isSuccess) {
      res.status(200).json('All logs have been sent');
    } else {
      res.status(500).json('ERROR: Cannot send logs');
    }
  });
});

export default router;
