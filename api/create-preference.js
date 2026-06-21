module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { items } = req.body;

  try {
    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: items,
        back_urls: {
          success: 'https://grupomakora.com',
          failure: 'https://grupomakora.com',
          pending: 'https://grupomakora.com'
        },
        auto_return: 'approved'
      })
    });

    const data = await mpRes.json();
    res.status(200).json({ url: data.init_point });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
};