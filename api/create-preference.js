const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    const { items } = req.body;
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items,
        back_urls: {
          success: 'https://pillz4marix.github.io/Makora',
          failure: 'https://pillz4marix.github.io/Makora',
          pending: 'https://pillz4marix.github.io/Makora'
        },
        auto_return: 'approved'
      }
    });
    res.status(200).json({ init_point: result.init_point });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
};
