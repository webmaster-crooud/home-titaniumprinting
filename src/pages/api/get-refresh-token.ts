import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        res.status(200).json({ refreshToken });
    } else {
        res.status(401).json({ error: 'No refresh token found' });
    }
}
