import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

export default async function handler(req, res) {
  try {
    const token = await getCookie('token', { req, res });
    if (!token) {
      return res.status(401).json({ user: null });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user });
  } catch (err) {
    console.error('JWT verify failed:', err.message);
    res.status(401).json({ user: null });
  }
}
