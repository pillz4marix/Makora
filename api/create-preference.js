const { MercadoPagoConfig, Preference } = require('mercadopago');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN 
  });

  const { items } = req.body;

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items,
        back_urls: {
          success: 'https://grupomakora.com',
          failure: 'https://grupomakora.com',
          pending: 'https://grupomakora.com'
        },
        auto_return: 'approved'
      }
    });
    res.status(200).json({ url: result.init_point });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
};