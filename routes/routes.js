'use strict'

import express from 'express';

// Authentication and authorization modules
import { authCheck } from './auth0/auth0';
import jwtAuthz from 'express-jwt-authz';

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
router.post('/api/info', requestInfo);

// Request links
router.post('/api/search', searchLink);

// Add new link with 2 mode: direct and temp
router.put('/api/add', addLink);

// Edit link info
router.post('/api/edit', editLink);

// Promote or demote link
router.post('/api/adjust', adjustLink);

// Delete link
router.delete('/api/delete', deleteLink);

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
router.post('api/log', (req, res) => {
  res.json('Log transfer');
});

export default router;
