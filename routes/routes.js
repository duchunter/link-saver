'use strict'

import express from 'express';
import { authCheck } from './auth0/auth0';
import jwtAuthz from 'express-jwt-authz';

const scopeCheck = jwtAuthz(['admin']);
const router = express.Router();

// TODO: add authCheck and scopeCheck when ready

// Add new link
router.put('/api/add', (req, res) => {
  res.json('Add new link');
});

// Update link
router.post('/api/update', (req, res) => {
  res.json('Update link');
});

// Delete link
router.delete('/api/delete', (req, res) => {
  res.json('Delete link');
});

// Parse web to add link
router.put('/api/parse', (req, res) => {
  res.json('Parse link');
});

// Request a specific number of link, looks like Google
router.get('/api/page/:num', (req, res) => {
  res.json(`Page ${req.params.num}`);
});

// Request links using search engine :v
router.post('/api/search', (req, res) => {
  res.json('Search');
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
