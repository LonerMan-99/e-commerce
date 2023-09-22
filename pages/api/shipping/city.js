const handler = async (req, res) => {
  const provinceId = req.query.provinceId;

  if (req.method === 'GET') {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_EXPEDITION}/city?id=&province=${provinceId}`,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            key: process.env.NEXT_PUBLIC_EXPEDITION_API_KEY,
          },
        },
      );

      const response = await data.json();
      return res.status(200).json(response.rajaongkir.results);
    } catch (error) {}
  }
};

export default handler;
