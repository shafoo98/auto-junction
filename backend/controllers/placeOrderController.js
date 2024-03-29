// This file holds all the controllers that are related to orders

import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import sendOrderMail from '../utils/sendMail.js'
import { createInvoice } from '../utils/createInvoice.js'
import Mailgen from 'mailgen'

// @desc Create a new order
// @route GET /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    createInvoice(createdOrder, 'invoice.pdf')

    let orderData = createdOrder.orderItems.map((orderItem) => {
      return {
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
      }
    })

    let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Auto Junction',
        link: 'https://www.auto-junction-store.com',
        logo: 'https://www.auto-junction-store.com/uploads/AJ-Logo.png',
        logoHeight: '50px',
      },
    })

    let response = {
      body: {
        intro: [
          'Your Order has been placed and is currently under processing.',
          `Order Summary: `,
          `Id: ${createdOrder._id}`,
        ],
        table: [
          {
            data: orderData,
          },
        ],
        outro: [
          `Your total for the order is ${createdOrder.totalPrice} BDT`,
          `Payment Method: ${createdOrder.paymentMethod}`,
          `Please find attached an invoice for your order`,
          'Thanks for shopping with Auto Junction',
        ],
      },
    }

    let htmlMail = MailGenerator.generate(response)
    let plainTextMail = MailGenerator.generatePlaintext(response)

    sendOrderMail({
      from: process.env.COMPANY_EMAIL,
      to: `${req.user.email}`,
      subject: `Your order: ${order._id} has been placed and confirmed`,
      html: htmlMail,
      plainTextMail: plainTextMail,
      attachments: [
        { filename: `invoice-${order._id}.pdf`, path: 'invoice.pdf' },
      ],
    })
    sendOrderMail({
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: `An order: ${order._id} has been placed and confirmed`,
      text:
        `The order was placed by the customer with the email ${req.user.email}` +
        `\n Please look at the orders table in profile page with the order no.${order._id} and contact with the customer if needed \n`,
    })

    res.status(201).json(createdOrder)
  }
})

// @desc Get order by ID
// @route GET /api/orders:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email phoneNumber'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get logged in users order
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc Update order to paid
// @route GET api/orders/:id/pay
// @access Private/Admin

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to delivered
// @route GET api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Private/Admin

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    await order.remove()
    res.json({ message: 'Order deleted' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  deleteOrder,
}
