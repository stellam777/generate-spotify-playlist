/* eslint-disable no-warning-comments */
/* eslint-disable max-statements */
// 'use strict'
const db = require('../server/db')
const {User, Product} = require('../server/db/models')
// const {Product} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const lightingArray = [
    'This plant does well in low light.',
    'This plant does best in partial shade.',
    'This plant does best in bright direct sunlight.',
  ]

  const wateringArray = [
    'This plant needs to be watered once a week.',
    'This plant needs to be watered daily.',
    'This plant needs to be watered every 30 minutes or it will DIE!',
  ]

  const categoriesArray = ['Succulents', 'Indoor', 'Outdoor', 'Pet-Friendly']

  const imageUrlArray = [
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-pet-friendly-bundle_variant_growpot_none_360x.jpg?v=1613171147',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_variant_small_grant_mint_360x.jpg?v=1613663664',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-vertical-space-bundle_variant_growpot_none_360x.jpg?v=1613177115',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_birds-nest-fern_variant_medium_balboa_blush_360x.jpg?v=1611075329',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_kokedama-plant_variant_all_01_360x.jpg?v=1571677621',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-string-of-pearls_variant_small_bryant_blush_360x.jpg?v=1611354104',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_marimo-moss-ball_variant_small_9000961c-f701-4253-b81d-7b23ad5cb708_360x.jpg?v=1586545067',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-snake-laurentii_variant_large_pallas_white_360x.jpg?v=1606160324',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_airplants-assorted_6_360x.jpg?v=1585928827',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_peperomia-green_variant_medium_grant_cream_360x.jpg?v=1613669717',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-high-low-light-bundle_variant_grow-pot_none_360x.jpg?v=1613173936',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_housewarming_duo_variant_blush_360x.jpg?v=1606800698',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_silver-satin_variant_small_grow-pot_none_360x.jpg?v=1612558802',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_xerographica-airplant_featured_360x.jpg?v=1585544743',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_calathea-dottie_variant_small_grant_mint_360x.jpg?v=1611098512',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ultimate-shelfie-set_variant_blush_360x.jpg?v=1604605399',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-gift-bundle_variant_growpot_none_360x.jpg?v=1613398524',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_potted-succulent-assortment_variant_6_growpot_none_360x.jpg?v=1613080263',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-laurentii_variant_small_hyde_terracotta_360x.jpg?v=1612476363',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-home-office-bundle_variant_grow-pot_none_360x.jpg?v=1613399682',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-zeylanica_variant_small_balboa_cream_360x.jpg?v=1605815879',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-maiden-hair-fern-kokedama_variant_small_01_360x.jpg?v=1611684630',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-succulent-assorted_variant_small_bryant_cream_360x.jpg?v=1611352312',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-zz-plant_variant_large_grant_pale-grey_360x.jpg?v=1600813826',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_marimo-moss-ball_variant_01_360x.jpg?v=1586554497',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_silver-satin_variant_small_grow-pot_none_360x.jpg?v=1612558802',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-monstera-leaves_featured_360x.jpg?v=1583784760',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-succulent-assorted_variant_small_bryant_cream_300x.jpg?v=1611352312',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-bedroom-bundle_variant_grow-pot_none_360x.jpg?v=1613399130',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-rubber-tree_variant_large_prospect_black_360x.jpg?v=1611349471',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_birds-nest-fern_variant_medium_balboa_blush_360x.jpg?v=1611075329',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_living-moss-wall_featured_360x.jpg?v=1572540058',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_parlor-palm_variant_small_balboa_mint_360x.jpg?v=1611075573',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_potted-succulent-assortment_variant_6_growpot_none_360x.jpg?v=1613080263',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_philodendron-green_variant_medium_acadia_peach_360x.jpg?v=1612559086',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_pilea_variant_x-small_grow-pot_none_360x.jpg?v=1612462889',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_parlor-palm_variant_small_balboa_mint_360x.jpg?v=1611075573',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_variant_small_grant_mint_360x.jpg?v=1613663664',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_philodendron-green_variant_medium_acadia_peach_360x.jpg?v=1612559086',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-laurentii_gallery_medium_all_all_05_360x.jpg?v=1611075863',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-low-light-bundle_gallery_all_02_360x.jpg?v=1613172619',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-vertical-space-bundle_gallery_all_03_360x.jpg?v=1613177115',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_peperomia-obtusfolia_gallery_medium_all_all_05_d78bbda7-eb48-4d0f-8c62-12d71421f7f9_360x.jpg?v=1613669717',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_zz-plant_gallery_medium_all_all_04_360x.jpg?v=1613670666',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_gallery_all_02_360x.jpg?v=1613663664',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_parlor-palm_gallery_small_all_all_07_360x.jpg?v=1611075573',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_birds-nest-fern_gallery_medium_all_all_03_360x.jpg?v=1611075329',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_pothos-marble-queen_gallery_small_all_all_03_360x.jpg?v=1613672293',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-snake-laurentii_gallery_large_all_all_01_360x.jpg?v=1606160324',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_plant-parent-set_variant_five-plants_360x.jpg?v=1611704776',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_marimo-moss-ball_gallery_all_01_360x.jpg?v=1586545067',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_acadia_peach_360x.jpg?v=1612559235',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-high-low-light-bundle_gallery_all_02_360x.jpg?v=1613173930',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-high-low-light-bundle_gallery_all_01_360x.jpg?v=1613173936',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ficus-tineke_gallery_small_all_all_04_360x.jpg?v=1611355039',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ficus-tineke_gallery_small_all_all_01_360x.jpg?v=1611355039',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-fiddle-leaf-fig-bush_gallery_all_all_02_360x.jpg?v=1606159741',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_housewarming_duo_gallery_all_03_360x.jpg?v=1606800698',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_calathea-dottie_gallery_small_all_all_04_360x.jpg?v=1611098512',
    'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_the-gift-bundle_gallery_all_04_360x.jpg?v=1613398524',
  ]

  const productNameArray = [
    'Coffee Plant',
    'Pet-Friendly Bundle',
    'Magical Willow',
    'Carnivorous Roses',
    'Poisonous Mushrooms',
    'Vertical Space Bundle',
    'String of Pearls',
    'Fern Bundle',
    'Shrivelfig',
    'Bubotuber',
    `Devil's Snare`,
    `Gillyweed`,
    `Leaping Toadstools`,
    `Venemous Tentacula`,
    `Mandrake`,
    `Mimbulus Mimbletonia`,
    `Wolfsbane`,
    `Wiggentree`,
    `Alihotsy`,
    `Asphodel`,
    `Bouncing Bulb`,
    `Dittany`,
    `Fanged Geranium`,
    `Flitterbloom`,
    `Flutterby Bush`,
    `Sopophorous Plant`,
    `Sneezewort`,
    `Snargaluff`,
    `Umbrella Flower`,
    `Valerian`,
    `Whomping Willow`,
    `Wormwood`,
    `Puffapod`,
    `Self-fertilising shrub`,
    `Fluxweed`,
    `Honking daffodil`,
    `Knotgrass`,
    `Screechsnap`,
    `Agapanthus`,
    `Angel's Trumpet`,
    `Arnica`,
    `Borage`,
    `Cowbane`,
    `Elder Tree`,
  ]

  const productArray = []
  for (let i = 0; i < productNameArray.length; i++) {
    const name = productNameArray[i]
    const description = faker.commerce.productDescription()
    const price = faker.random.number({
      min: 10,
      max: 999,
    })
    const category = faker.helpers.shuffle(categoriesArray)[0]
    const lighting = faker.helpers.shuffle(lightingArray)[0]
    const watering = faker.helpers.shuffle(wateringArray)[0]
    const imageUrl = imageUrlArray[i]
    const inventory = faker.random.number({
      min: 0,
      max: 100,
    })
    productArray.push({
      name,
      description,
      price,
      category,
      lighting,
      watering,
      inventory,
      imageUrl,
    })
  }

  const usersArray = []
  for (let i = 0; i < 40; i++) {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const address = faker.address.streetAddress()
    const phone = faker.phone.phoneNumber()

    usersArray.push({
      email,
      password,
      firstName,
      lastName,
      address,
      phone,
    })
  }

  const users = await Promise.all(
    usersArray.map((user) => {
      return User.create(user)
    })
  )

  const products = await Promise.all(
    productArray.map((product) => {
      return Product.create(product)
    })
  )

  console.log(`seeded ${users.length} users with salted passwords`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
