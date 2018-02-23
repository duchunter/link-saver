'use strict'

import express from 'express';

// Utility modules
import jwtAuthz from 'express-jwt-authz';
import { authCheck } from '../utils/auth0';
import { sendLog } from '../utils/log';

// API modules
import requestInfo from '../controller/requestInfo';
import searchLink from '../controller/searchLink';
import addLink from '../controller/addLink';
import adjustLink from '../controller/adjustLink';
import deleteLink from '../controller/deleteLink';
import editLink from '../controller/editLink';

const scopeCheck = jwtAuthz(['admin']);
const router = express.Router();

// TODO: add authCheck and scopeCheck when ready

                    // MAIN MODULES

// Get info
router.post('/api/info', authCheck, scopeCheck, requestInfo);

// Search links
router.post('/api/search', authCheck, scopeCheck, searchLink);

// Add new link with 2 mode: direct and temp
router.put('/api/add', authCheck, scopeCheck, addLink);

// Edit link info
router.post('/api/edit', authCheck, scopeCheck, editLink);

// Promote or demote link
router.post('/api/adjust', authCheck, scopeCheck, adjustLink);

// Delete link
router.post('/api/delete', authCheck, scopeCheck, deleteLink);

                  // SUPPPORTING MODULES

// Parse web to add link
router.put('/api/parse', (req, res) => {
  res.json('Parse link');
});

// Request instant backup
router.post('/api/backup', (req, res) => {
  res.json('Manual backup');
});

// Request instant log transfer
router.post('/api/log', authCheck, scopeCheck, (req, res) => {
  sendLog().then(isSuccess => {
    if (isSuccess) {
      res.status(200).json('All logs have been sent');
    } else {
      res.status(500).json('ERROR: Cannot send logs');
    }
  });
});

export default router;
