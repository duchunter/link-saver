'use strict'

import express from 'express';
import { authCheck } from './auth0/auth0';
import jwtAuthz from 'express-jwt-authz';
import requestInfo from '../controller/requestInfo';
import requestLink from '../controller/requestLink';
import addLink from '../controller/addLink';

const scopeCheck = jwtAuthz(['admin']);
const router = express.Router();

// TODO: add authCheck and scopeCheck when ready

                    // MAIN MODULES

// Get info
router.get('/api/info/:item', requestInfo);

// Request links
router.post('/api/search', requestLink);

// Add new link with 2 mode: direct and temp
router.put('/api/add', addLink);

// Update link
router.post('/api/update', (req, res) => {
  res.json('Update link');
});

// Promote link from Temp to Main
router.post('/api/promote', (req, res) => {
  res.json('Promote');
});

// Demote link
router.post('/api/demote', (req, res) => {
  res.json('Demote');
});

// Delete link
router.delete('/api/delete', (req, res) => {
  res.json('Delete link');
});

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
