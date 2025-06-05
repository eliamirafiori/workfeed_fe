// pages/endpoint/[...endpoint].js
export default async function handler(req, res) {
  const { route } = req.query; // This will give you an array of the dynamic route segments

  // Join the route array into a valid URL path (e.g., '/health' or '/api/health')
  const apiPath = route ? `/${route.join("/")}` : "/"; // handle dynamic path forwarding

  // Construct the external API URL by combining the base API URL with the dynamic path
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`;

  console.log("Forwarding request to:", apiUrl); // Log the full URL you're requesting

  try {
    const response = await fetch(apiUrl, {
      method: req.method, // Forward the same HTTP method (GET, POST, etc.)
      headers: {
        Accept: "application/json",
        // Optionally, forward other headers if needed
        ...(req.headers["authorization"] && {
          Authorization: req.headers["authorization"],
        }), // Forward Authorization if it exists
      },
      body: req.method === "POST" || req.method === "PUT" ? req.body : null, // Handle request body for POST/PUT requests
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${apiUrl}: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data); // Send the fetched data back to the client
  } catch (error) {
    console.error("Error fetching from external API:", error);
    res.status(500).json({ error: "Error fetching from external API" });
  }
}
