import connectDB from '../../lib/mongodb';
import Pendaftar from '../../models/Pendaftar';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  try {
    await connectDB();
    
    const { nama, whatsapp } = req.body;
    
    // Cek apakah nomor WhatsApp sudah terdaftar
    const existingUser = await Pendaftar.findOne({ whatsapp });
    if (existingUser) {
      return res.status(400).json({ message: 'Nomor WhatsApp sudah terdaftar' });
    }

    // Simpan data pendaftar baru
    const pendaftar = await Pendaftar.create({ nama, whatsapp });
    
    res.status(201).json({ success: true, data: pendaftar });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
} 