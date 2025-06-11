
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, email, subject, message } = req.body;

  const payload = {
    from: {
      email: "hello@mailersend.com",
      name: "MailerSend Contact"
    },
    to: [
      {
        email: "ah076145@gmail.com",
        name: name
      }
    ],
    subject: subject,
    text: message,
    html: `<b>${message}</b>`,
    personalization: [
      {
        email: "ah076145@gmail.com",
        data: {
          company: "Syed Portfolio"
        }
      }
    ]
  };

  const response = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (response.status === 202) {
    return res.status(200).json({ message: "Message sent!" });
  } else {
    const error = await response.text();
    return res.status(500).json({ error });
  }
}
