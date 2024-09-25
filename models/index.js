const Restaurant = require('./Restaurant')
const Item = require('./Item')
const Menu = require('./Menu')

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Menu.hasMany(Item)
Item.belongsTo(Menu)

module.exports = {Restaurant, Item, Menu};