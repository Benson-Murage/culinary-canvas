import { Toaster, toast } from 'sonner';
import { Calendar, Clock, MapPin, Phone, User, Users, Mail, MessageSquare, Star, Share2, Heart } from 'lucide-react';
import { useState, useRef } from 'react';

// --- MOCK DATA ---
const menuItems = [
  { id: 1, name: 'Jollof Rice & Chicken', description: 'A classic West African dish of rice cooked in a rich tomato-based sauce, served with succulent grilled chicken.', price: '$18.50', category: 'main', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/menu-jollof-rice-h9xsd8r-1764236973250.webp' },
  { id: 2, name: 'Vegetable Samosas', description: 'Crispy fried pastries filled with spiced potatoes, peas, and carrots. A perfect starter.', price: '$9.00', category: 'starter', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/menu-samosas-0cgxfg1-1764236981858.webp' },
  { id: 3, name: 'Bunny Chow', description: 'A South African street food classic. A hollowed-out loaf of bread filled with a flavorful curry.', price: '$22.00', category: 'main', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/menu-bunny-chow-7mkr4y1-1764236989127.webp' },
  { id: 4, name: 'Grilled Tilapia', description: 'Whole tilapia fish marinated in traditional spices and grilled to perfection. Served with banku.', price: '$25.00', category: 'main', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/menu-grilled-tilapia-jwq2g8b-1764236996448.webp' },
  { id: 5, name: 'Zobo Drink', description: 'A refreshing Nigerian beverage made from dried Roselle plant flowers.', price: '$5.00', category: 'drink', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/menu-zobo-drink-mgnsojq-1764237002719.webp' },
];

const chefs = [
    { name: 'Chef Tunde Bello', role: 'Executive Chef', bio: 'With over 20 years of experience, Chef Tunde brings a passion for traditional African cuisine and modern culinary techniques. His philosophy is simple: fresh, local ingredients make the best food.', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/chef-tunde-db7aenj-1764237010461.webp' },
    { name: 'Chef Amara Diop', role: 'Pastry Chef', bio: 'Chef Amara is a rising star in the pastry world. Her creations are inspired by the sweet flavors of Africa, from baobab cheesecakes to hibiscus-infused macarons. She believes every dessert tells a story.', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/chef-amara-016yc9g-1764237017330.webp' },
];

const reviews = [
    { name: 'Aisha B.', rating: 5, text: 'The Jollof Rice was the best I have ever had! The atmosphere is cozy and the staff are incredibly welcoming. A true taste of home.' },
    { name: 'David K.', rating: 4, text: 'Great place for a date night. We loved the grilled tilapia. The only downside was a bit of a wait, but it was worth it.' },
    { name: 'Folake O.', rating: 5, text: 'I celebrated my birthday here and it was magical. The Bunny Chow is a must-try! They even surprised me with a complimentary dessert.' },
];

const specialOffers = [
    { title: 'Taste of West Africa', description: '3-course tasting menu for two, available Mon-Wed.', price: '$50' },
    { title: 'Happy Hour', description: '50% off all cocktails and starters, daily from 4pm-6pm.', price: '' },
    { title: 'Sunday Brunch', description: 'All-you-can-eat African-inspired brunch buffet.', price: '$35/person' },
];

// --- COMPONENTS ---

const NavLink = ({ href, children }) => (
  <a href={href} className="text-white hover:text-orange-300 transition-colors duration-300 text-lg font-medium">
    {children}
  </a>
);

const Header = ({ onLinkClick }) => (
    <header className="bg-stone-900/80 backdrop-blur-sm p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg">
        <h1 className="text-4xl font-bold text-white tracking-wider" style={{ fontFamily: '"Playfair Display", serif' }}>Jollof Kitchen</h1>
        <nav className="hidden md:flex gap-8">
            <NavLink href="#menu" onClick={(e) => onLinkClick(e, '#menu')}>Menu</NavLink>
            <NavLink href="#chefs" onClick={(e) => onLinkClick(e, '#chefs')}>Our Chefs</NavLink>
            <NavLink href="#reserve" onClick={(e) => onLinkClick(e, '#reserve')}>Reservations</NavLink>
            <NavLink href="#contact" onClick={(e) => onLinkClick(e, '#contact')}>Contact</NavLink>
        </nav>
    </header>
);

const Hero = () => (
  <section className="relative h-screen">
    <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9c4b00cb-9ef2-485a-b4cf-80b290c2ba6d/jollof-kitchen-hero-zzosuxk-1764236965215.webp" alt="Jollof Kitchen Hero" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white p-4">
      <h2 className="text-6xl md:text-8xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Experience Authentic African Cuisine</h2>
      <p className="text-xl md:text-2xl max-w-3xl mb-8">From the heart of Africa to your plate. A culinary journey you will never forget.</p>
      <a href="#menu" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 transform hover:scale-105">Explore Our Menu</a>
    </div>
  </section>
);

const MenuItemCard = ({ item }) => (
    <div className="bg-stone-800 rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative h-56">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <div className="flex gap-4">
                    <button onClick={() => toast.success(`Added ${item.name} to favorites!`)} className="p-3 bg-white/20 rounded-full hover:bg-white/40"><Heart className="w-6 h-6 text-white" /></button>
                    <button onClick={() => navigator.clipboard.writeText(`Check out ${item.name} at Jollof Kitchen!`)} className="p-3 bg-white/20 rounded-full hover:bg-white/40"><Share2 className="w-6 h-6 text-white" /></button>
                </div>
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-semibold text-orange-300 mb-2">{item.name}</h3>
            <p className="text-stone-300 mb-4 h-20">{item.description}</p>
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-white">{item.price}</p>
                <button onClick={() => toast.success(`Added ${item.name} to your order.`)} className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-300">Order Now</button>
            </div>
        </div>
    </div>
);

const MenuSection = ({ targetRef }) => {
    const [filter, setFilter] = useState('all');

    const filteredMenu = menuItems.filter(item => filter === 'all' || item.category === filter);

    const handleFilter = (category) => {
        setFilter(category);
        toast.info(`Showing ${category} items.`);
    }

    return (
        <section id="menu" ref={targetRef} className="py-20 bg-stone-900">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center text-white mb-12">Our Menu</h2>
                <div className="flex justify-center gap-4 mb-12">
                    <button onClick={() => handleFilter('all')} className={`px-6 py-2 rounded-full font-semibold ${filter === 'all' ? 'bg-orange-600 text-white' : 'bg-stone-700 text-stone-300'}`}>All</button>
                    <button onClick={() => handleFilter('starter')} className={`px-6 py-2 rounded-full font-semibold ${filter === 'starter' ? 'bg-orange-600 text-white' : 'bg-stone-700 text-stone-300'}`}>Starters</button>
                    <button onClick={() => handleFilter('main')} className={`px-6 py-2 rounded-full font-semibold ${filter === 'main' ? 'bg-orange-600 text-white' : 'bg-stone-700 text-stone-300'}`}>Mains</button>
                    <button onClick={() => handleFilter('drink')} className={`px-6 py-2 rounded-full font-semibold ${filter === 'drink' ? 'bg-orange-600 text-white' : 'bg-stone-700 text-stone-300'}`}>Drinks</button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredMenu.map(item => <MenuItemCard key={item.id} item={item} />)}
                </div>
            </div>
        </section>
    );
}

const ChefCard = ({ chef }) => (
    <div className="bg-stone-800 rounded-lg overflow-hidden shadow-lg text-center p-6">
        <img src={chef.image} alt={chef.name} className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-orange-400 object-cover" />
        <h3 className="text-3xl font-bold text-orange-300">{chef.name}</h3>
        <p className="text-xl text-stone-300 mb-4">{chef.role}</p>
        <p className="text-stone-400">{chef.bio}</p>
    </div>
);

const ChefsSection = ({ targetRef }) => (
    <section id="chefs" ref={targetRef} className="py-20 bg-stone-900">
        <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center text-white mb-12">Meet Our Chefs</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {chefs.map(chef => <ChefCard key={chef.name} chef={chef} />)}
            </div>
        </div>
    </section>
);

const ReservationForm = ({ targetRef }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        toast.promise(
            new Promise(resolve => setTimeout(() => resolve({ name }), 2000)),
            {
                loading: 'Submitting your reservation...', 
                success: (data) => `Thank you, ${data.name}! Your reservation has been received.`,
                error: 'Something went wrong. Please try again.'
            }
        );
        e.target.reset();
    }

    return (
        <section id="reserve" ref={targetRef} className="py-20 bg-stone-800">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center text-white mb-12">Make a Reservation</h2>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="text" name="name" placeholder="Your Name" className="w-full bg-stone-700 text-white p-4 pl-12 rounded-lg border border-stone-600 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="email" name="email" placeholder="Your Email" className="w-full bg-stone-700 text-white p-4 pl-12 rounded-lg border border-stone-600 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                    </div>
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="number" name="guests" placeholder="Number of Guests" min="1" className="w-full bg-stone-700 text-white p-4 pl-12 rounded-lg border border-stone-600 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="date" name="date" className="w-full bg-stone-700 text-white p-4 pl-12 rounded-lg border border-stone-600 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                    </div>
                     <div className="relative md:col-span-2">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="time" name="time" className="w-full bg-stone-700 text-white p-4 pl-12 rounded-lg border border-stone-600 focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform duration-300 transform hover:scale-105">Book a Table</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

const ContactSection = ({ targetRef }) => (
    <footer id="contact" ref={targetRef} className="py-20 bg-stone-900 text-stone-300">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Contact Us</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                <div className="flex items-center gap-4">
                    <MapPin className="w-8 h-8 text-orange-400" />
                    <span>123 Ubuntu Lane, Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="w-8 h-8 text-orange-400" />
                    <span>+233 12 345 6789</span>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="w-8 h-8 text-orange-400" />
                    <span>reserve@jollofkitchen.com</span>
                </div>
            </div>
            <div className="mt-12 border-t border-stone-700 pt-8">
                <p>&copy; 2025 Jollof Kitchen. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
)

export default function App() {
    const menuRef = useRef(null);
    const chefsRef = useRef(null);
    const reserveRef = useRef(null);
    const contactRef = useRef(null);

    const scrollTo = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        if (targetId === '#menu') scrollTo(menuRef);
        if (targetId === '#chefs') scrollTo(chefsRef);
        if (targetId === '#reserve') scrollTo(reserveRef);
        if (targetId === '#contact') scrollTo(contactRef);
    }

    return (
        <div className="bg-stone-900">
            <Toaster richColors position="top-right" />
            <Header onLinkClick={handleLinkClick} />
            <main>
                <Hero />
                <MenuSection targetRef={menuRef} />
                <ChefsSection targetRef={chefsRef} />
                <ReservationForm targetRef={reserveRef} />
                <ContactSection targetRef={contactRef} />
            </main>
        </div>
    );
}
