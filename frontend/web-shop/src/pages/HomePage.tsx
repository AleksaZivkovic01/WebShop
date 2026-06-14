

const HomePage = () => {
  return (
    <div className="min-h-screen pt-20 bg-cover bg-top bg-no-repeat flex flex-col items-center justify-center text-center px-4 bg-[length:100%_100%]"
        style={{ backgroundImage: "url('https://img.magnific.com/premium-vector/white-wall-with-blue-shopping-cart-black-mouse-with-empty-tags-laptop-white-surface_1174726-9278.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-4xl font-bold mb-6">Welcome to WebShop!</h1>
      <p className="text-lg text-gray-700 mb-4">
        Discover a wide range of products at unbeatable prices. Shop now and enjoy exclusive deals and discounts!
      </p>
      <a href="/products" className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
        Browse Products
      </a>
    </div>
  )
}

export default HomePage