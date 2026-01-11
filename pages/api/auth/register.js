import dbConnect from '@/lib/dbConnect';
import User from '../../../models/Users';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ username, password }); // In production, hash the password
  await user.save();

  res.status(201).json({ message: 'User registered' });
}
