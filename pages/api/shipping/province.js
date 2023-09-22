const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_EXPEDITION}/province?id=`,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            key: process.env.NEXT_PUBLIC_EXPEDITION_API_KEY,
          },
        },
      );

      const response = await data.json();
      return res.status(200).json(response.rajaongkir);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default handler
