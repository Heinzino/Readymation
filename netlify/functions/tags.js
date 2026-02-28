exports.handler = async () => {
    const API_KEY = process.env.SMARTLEAD_API_KEY;
    const BASE = 'https://server.smartlead.ai/api/v1';

    try {
        const accResp = await fetch(`${BASE}/email-accounts/?api_key=${API_KEY}&offset=0&limit=100`);
        const accounts = await accResp.json();
        const emails = accounts.map(a => a.from_email);

        const tagResp = await fetch(`${BASE}/email-accounts/tag-list?api_key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_ids: emails })
        });
        const tagData = await tagResp.json();

        if (!tagData.success) {
            return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch tags' }) };
        }

        const tagMap = {};
        for (const account of tagData.data) {
            for (const tag of account.tags || []) {
                if (!tagMap[tag.tag_id]) {
                    tagMap[tag.tag_id] = { tag_id: tag.tag_id, tag_name: tag.tag_name, count: 0 };
                }
                tagMap[tag.tag_id].count++;
            }
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.values(tagMap).sort((a, b) => a.tag_name.localeCompare(b.tag_name)))
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch tags' }) };
    }
};
