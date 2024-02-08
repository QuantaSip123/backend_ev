
const express = require("express");
const app = express();
const { Pool } = require("pg");
const wellknown = require('wellknown');
const geolib = require('geolib');
const cors = require('cors');



const dbConfig = {
    user: "tcgs_ap",
    host: "geoserver.quantasip.com",
    database: "qg_verse",
    password: "FwC&bc$2#tj4%#ZQ",
    port: 5432, // Default PostgreSQL port
  };
  const pool = new Pool(dbConfig);

  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database.");
      client.query("SELECT NOW()", (err, result) => {
        release();
        if (err) {
          console.error("Error running query:", err);
        } else {
          console.log("Current timestamp:", result.rows[0].now);
        }
      });
    }
  });


 






// Enable CORS
app.use(cors());

// API endpoint to fetch data based on category
app.get('/pump/coordinates', async (req, res) => {
  // const category = req.query.category; // Get the category from query parameter
  const category = "Refill Station";
  const distance = 50; // Distance in km
  const client = await pool.connect();
  try {
    

    // Query to fetch coordinates based on category and within specified distance
    const query = `
    SELECT name, latitude, longitude
    FROM "highway"."distinct_g_id_data"
    WHERE category = $1
      `;

    const result = await client.query(query, [category]);

    res.json(result.rows); // Return the fetched data as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Release the client back to the pool
    client && client.release();
  }
});

app.get('/parking/coordinates', async (req, res) => {
  // const category = req.query.category; // Get the category from query parameter
  const category = "Transport";
  const distance = 50; // Distance in km
  const client = await pool.connect();
  try {
    

    // Query to fetch coordinates based on category and within specified distance
    const query = `
    SELECT name, latitude, longitude
    FROM "highway"."distinct_g_id_data"
    WHERE category = $1
      `;

    const result = await client.query(query, [category]);

    res.json(result.rows); // Return the fetched data as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Release the client back to the pool
    client && client.release();
  }
});

app.get('/transport/coordinates', async (req, res) => {
  // const category = req.query.category; // Get the category from query parameter
  const category = "Transport";
  const distance = 50; // Distance in km
  const client = await pool.connect();
  try {
    

    // Query to fetch coordinates based on category and within specified distance
    const query = `
    SELECT name, latitude, longitude
    FROM "highway"."distinct_g_id_data"
    WHERE category = $1
      `;

    const result = await client.query(query, [category]);

    res.json(result.rows); // Return the fetched data as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Release the client back to the pool
    client && client.release();
  }
});

app.get('/electric-substation/coordinates', async (req, res) => {
  // const category = req.query.category; // Get the category from query parameter
  const category = "Sub Station";
  const distance = 50; // Distance in km
  const client = await pool.connect();
  try {
    

    // Query to fetch coordinates based on category and within specified distance
    const query = `
    SELECT name, latitude, longitude
    FROM "highway"."toll"
    WHERE category = $1
      `;

    const result = await client.query(query, [category]);

    res.json(result.rows); // Return the fetched data as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Release the client back to the pool
    client && client.release();
  }
});

app.get('/toll-plaza/coordinates', async (req, res) => {
  // const category = req.query.category; // Get the category from query parameter
  const category = "Toll Plaza";
  const distance = 50; // Distance in km
  const client = await pool.connect();
  try {
    

    // Query to fetch coordinates based on category and within specified distance
    const query = `
    SELECT name, latitude, longitude
    FROM "highway"."toll"
    WHERE category = $1
      `;

    const result = await client.query(query, [category]);

    console.log(result);
    res.json(result.rows); // Return the fetched data as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Release the client back to the pool
    client && client.release();
  }
});


 
  
  
  
  
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
  
  