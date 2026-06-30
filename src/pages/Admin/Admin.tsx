import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  link?: string;
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('home');
  const [link, setLink] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading...</div>;

  if (!user) return null;

  // Save (create/update)
  const saveProduct = async () => {
    if (editingId) {
      await supabase
        .from('products')
        .update({
          title,
          price,
          image,
          category,
          link,
        })
        .eq('id', editingId);

      setEditingId(null);
    } else {
      await supabase.from('products').insert([
        {
          title,
          price,
          image,
          category,
          link,
        },
      ]);
    }

    setTitle('');
    setPrice('');
    setImage('');
    setCategory('home');
    setLink('');

    fetchProducts();
  };

  // Delete
  const deleteProduct = async (id: number) => {
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  // Edit
  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setLink(product.link || '');
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      {/* Form */}
      <input
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        placeholder="Affiliate Link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="home">Home</option>
        <option value="clothing">Clothing</option>
        <option value="beauty">Beauty</option>
      </select>

      <button onClick={saveProduct}>
        {editingId ? 'Update Product' : 'Add Product'}
      </button>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h2>All Products</h2>

      <div className="admin-grid">
        {products.map((p) => (
          <div className="admin-card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.price}</p>

            <div className="admin-actions">
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}