const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const postData = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_EXPEDITION}/cost`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            key: process.env.NEXT_PUBLIC_EXPEDITION_API_KEY,
          },

          body: new URLSearchParams({
            'origin': data.origin,
            'destination': data.destination,
            'weight': data.weight,
            'courier': data.courier
          })
        },
      );
      const response = await postData.json();
      console.log(response);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export default handler;
