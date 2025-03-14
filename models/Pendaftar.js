import mongoose from 'mongoose';

const PendaftarSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Pendaftar || mongoose.model('Pendaftar', PendaftarSchema); 