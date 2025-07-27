require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Order Schema
const OrderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  items: Array,
  payment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Order = mongoose.model('Order', OrderSchema);

// Get all orders (admin panel)
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
