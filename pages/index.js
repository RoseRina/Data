import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validasi nomor WhatsApp
    const whatsappRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!whatsappRegex.test(formData.whatsapp)) {
      setMessage('Nomor WhatsApp tidak valid');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/daftar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Terjadi kesalahan');
      }

      setMessage('Pendaftaran berhasil!');
      setFormData({ nama: '', whatsapp: '' });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center">Formulir Pendaftaran</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    {isLoading ? 'Memproses...' : 'Daftar'}
                  </button>
                </form>
                {message && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    message === 'Pendaftaran berhasil!' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}