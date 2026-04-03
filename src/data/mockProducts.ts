import type { Product, ProductCategory } from '../types/product';

export const CATEGORIES: ProductCategory[] = ['Juice', 'Coffee', 'Milk Tea', 'Soft Drink'];

export const mockProducts: Product[] = [
  /* ── Juice ── */
  {
    id: 'juice-001',
    name: 'Fresh Orange Sunrise',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
    category: 'Juice',
    shortDescription: 'Cold-pressed orange juice with a hint of ginger.',
    longDescription:
      'Start your morning right with our signature Fresh Orange Sunrise. Made from hand-picked Valencia oranges, cold-pressed to preserve every drop of nutrition. A subtle hint of ginger adds a warming kick that complements the citrus perfectly. Rich in Vitamin C and antioxidants, this refreshing juice is your daily dose of sunshine in a glass.',
    rating: 4.8,
    stock: 25,
  },
  {
    id: 'juice-002',
    name: 'Tropical Mango Blast',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop',
    category: 'Juice',
    shortDescription: 'Sweet mango blended with passion fruit.',
    longDescription:
      'Escape to the tropics with our Mango Blast. We blend ripe Alphonso mangoes with tangy passion fruit and a splash of coconut water to create a smooth, velvety drink that transports you straight to a sun-drenched beach. No added sugar — just pure, natural sweetness from the finest tropical fruits.',
    rating: 4.6,
    stock: 18,
  },
  {
    id: 'juice-003',
    name: 'Green Detox Elixir',
    price: 6.29,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=400&fit=crop',
    category: 'Juice',
    shortDescription: 'Kale, spinach, apple & lemon cleanse blend.',
    longDescription:
      'Our Green Detox Elixir is the ultimate wellness drink. A carefully balanced blend of organic kale, baby spinach, Granny Smith apples, and freshly squeezed lemon juice. Enhanced with a touch of fresh mint and chia seeds for added fiber. Perfect for a post-workout refresh or a midday energy recharge.',
    rating: 4.5,
    stock: 12,
  },

  /* ── Coffee ── */
  {
    id: 'coffee-001',
    name: 'Iced Caramel Latte',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    category: 'Coffee',
    shortDescription: 'Smooth espresso with caramel drizzle over ice.',
    longDescription:
      'Our bestselling Iced Caramel Latte combines double-shot espresso made from single-origin Colombian beans with velvety steamed milk, poured over hand-cut ice cubes. Finished with a generous drizzle of house-made salted caramel sauce and a whisper of vanilla. Indulgent, refreshing, and the perfect afternoon pick-me-up.',
    rating: 4.9,
    stock: 30,
  },
  {
    id: 'coffee-002',
    name: 'Mocha Velvet Dream',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
    category: 'Coffee',
    shortDescription: 'Rich chocolate meets premium espresso.',
    longDescription:
      'For the chocolate lover who needs their caffeine fix. Our Mocha Velvet Dream layers premium Belgian dark chocolate with freshly pulled espresso and creamy whole milk. Topped with micro-foam and a dusting of cocoa powder. Available hot or iced — pure decadence either way.',
    rating: 4.7,
    stock: 22,
  },
  {
    id: 'coffee-003',
    name: 'Cold Brew Classic',
    price: 4.79,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=400&fit=crop',
    category: 'Coffee',
    shortDescription: '24-hour steeped smooth cold brew.',
    longDescription:
      'Patience makes perfect. Our Cold Brew Classic is steeped for a full 24 hours using coarsely ground Ethiopian Yirgacheffe beans. The slow extraction produces an incredibly smooth, low-acid coffee with natural chocolate and berry notes. Served undiluted over ice for maximum flavor impact.',
    rating: 4.8,
    stock: 28,
  },

  /* ── Milk Tea ── */
  {
    id: 'milktea-001',
    name: 'Classic Boba Milk Tea',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&h=400&fit=crop',
    category: 'Milk Tea',
    shortDescription: 'Traditional black milk tea with chewy tapioca pearls.',
    longDescription:
      'The one that started it all. Our Classic Boba Milk Tea uses premium Assam black tea leaves, steeped to perfection and blended with fresh whole milk. Sweetened to just the right level and loaded with our hand-cooked tapioca pearls that are chewy, bouncy, and irresistibly addictive. Customize your sugar and ice level.',
    rating: 4.9,
    stock: 35,
  },
  {
    id: 'milktea-002',
    name: 'Taro Purple Dream',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1627224536186-f8a12c7fed5a?w=400&h=400&fit=crop',
    category: 'Milk Tea',
    shortDescription: 'Creamy taro-flavored milk tea with a purple hue.',
    longDescription:
      'A visual and culinary delight. Our Taro Purple Dream is made from real taro root, slow-cooked and blended into a creamy, naturally purple base. Mixed with jasmine-infused milk tea and topped with coconut cream. The earthy, slightly nutty flavor of taro makes this a unique and unforgettable experience.',
    rating: 4.6,
    stock: 20,
  },
  {
    id: 'milktea-003',
    name: 'Matcha Oat Latte',
    price: 6.29,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop',
    category: 'Milk Tea',
    shortDescription: 'Ceremonial-grade matcha with oat milk.',
    longDescription:
      'Zen in a cup. We whisk ceremonial-grade Uji matcha from Kyoto with creamy, barista-edition oat milk for a plant-based indulgence. The result is a vibrant green latte with a smooth, umami-rich flavor and a gentle caffeine lift. No artificial colors or flavors — just pure matcha goodness.',
    rating: 4.7,
    stock: 15,
  },

  /* ── Soft Drink ── */
  {
    id: 'soda-001',
    name: 'Sparkling Lychee Rose',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=400&fit=crop',
    category: 'Soft Drink',
    shortDescription: 'Fizzy lychee with delicate rose essence.',
    longDescription:
      'A sparkling masterpiece. Fresh lychee puree meets fine carbonation and a whisper of Bulgarian rose water. Light, fragrant, and impossibly refreshing. Garnished with a dried rose petal and served in a chilled glass. The perfect palate cleanser or a sophisticated alternative to traditional sodas.',
    rating: 4.4,
    stock: 40,
  },
  {
    id: 'soda-002',
    name: 'Citrus Yuzu Fizz',
    price: 4.29,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=400&fit=crop',
    category: 'Soft Drink',
    shortDescription: 'Japanese yuzu citrus sparkling drink.',
    longDescription:
      'Discover the exquisite flavor of Japanese yuzu in a bright, effervescent drink. We combine freshly extracted yuzu juice with sparkling mineral water and a touch of honey. The result is a tangy, aromatic, and wonderfully complex citrus experience that you won\'t find anywhere else. A true taste of Japan.',
    rating: 4.5,
    stock: 32,
  },
  {
    id: 'soda-003',
    name: 'Berry Elderflower Spritz',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&h=400&fit=crop',
    category: 'Soft Drink',
    shortDescription: 'Mixed berries with elderflower sparkle.',
    longDescription:
      'Summer in a glass. Our Berry Elderflower Spritz combines freshly muddled blueberries, raspberries, and blackberries with premium elderflower cordial and fine sparkling water. The floral sweetness of elderflower perfectly balances the tangy berries. Served with crushed ice and a sprig of fresh mint.',
    rating: 4.6,
    stock: 26,
  },
];
