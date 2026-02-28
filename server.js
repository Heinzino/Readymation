require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.SMARTLEAD_API_KEY;
const BASE = 'https://server.smartlead.ai/api/v1';

app.use(express.static(path.join(__dirname)));

// Proxy: get all email accounts
app.get('/api/email-accounts', async (req, res) => {
    try {
        const resp = await fetch(`${BASE}/email-accounts/?api_key=${API_KEY}&offset=0&limit=100`);
        const data = await resp.json();
        // Only return what the frontend needs
        const slim = data.map(a => ({ id: a.id, from_email: a.from_email, from_name: a.from_name, message_per_day: a.message_per_day }));
        res.json(slim);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch email accounts' });
    }
});

// Proxy: get tags for all accounts
app.get('/api/tags', async (req, res) => {
    try {
        // Step 1: get all email addresses
        const accResp = await fetch(`${BASE}/email-accounts/?api_key=${API_KEY}&offset=0&limit=100`);
        const accounts = await accResp.json();
        const emails = accounts.map(a => a.from_email);

        // Step 2: get tag mappings
        const tagResp = await fetch(`${BASE}/email-accounts/tag-list?api_key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_ids: emails })
        });
        const tagData = await tagResp.json();

        if (!tagData.success) {
            return res.status(500).json({ error: 'Failed to fetch tags' });
        }

        // Build tag summary: { tag_id, tag_name, count, account_ids }
        const tagMap = {};
        for (const account of tagData.data) {
            for (const tag of account.tags || []) {
                if (!tagMap[tag.tag_id]) {
                    tagMap[tag.tag_id] = { tag_id: tag.tag_id, tag_name: tag.tag_name, count: 0 };
                }
                tagMap[tag.tag_id].count++;
            }
        }

        res.json(Object.values(tagMap).sort((a, b) => a.tag_name.localeCompare(b.tag_name)));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
